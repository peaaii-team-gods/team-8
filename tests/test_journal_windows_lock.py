"""Exercise real Windows target-file locks, without replacing os.replace."""
from contextlib import contextmanager
import ctypes
from ctypes import wintypes
import json
import logging
import os
import sys
import threading
import time

import pytest

from resources import Journal


pytestmark = pytest.mark.skipif(os.name != "nt", reason="Real Windows file-sharing locks")
PRIVATE_MARKER = "synthetic-private-journal-content"


@contextmanager
def held_target(path, release_after=None):
    """A separate thread opens the real target without FILE_SHARE_DELETE."""
    kernel = ctypes.WinDLL("kernel32", use_last_error=True)
    kernel.CreateFileW.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD,
                                  ctypes.c_void_p, wintypes.DWORD, wintypes.DWORD,
                                  wintypes.HANDLE]
    kernel.CreateFileW.restype = wintypes.HANDLE
    kernel.CloseHandle.argtypes = [wintypes.HANDLE]
    kernel.CloseHandle.restype = wintypes.BOOL
    ready, start, release, released = (threading.Event() for _ in range(4))
    failures = []

    def hold():
        handle = kernel.CreateFileW(str(path), 0x80000000, 0x1 | 0x2,
                                    None, 3, 0x80, None)
        if handle == wintypes.HANDLE(-1).value:
            failures.append(ctypes.WinError(ctypes.get_last_error()))
            ready.set()
            return
        try:
            ready.set()
            if not start.wait(5):
                raise AssertionError("Save never started")
            release.wait(5 if release_after is None else release_after)
        except BaseException as error:
            failures.append(error)
        finally:
            if not kernel.CloseHandle(handle):
                failures.append(ctypes.WinError(ctypes.get_last_error()))
            released.set()

    thread = threading.Thread(target=hold, daemon=True)
    thread.start()
    try:
        assert ready.wait(5), "Target lock was not acquired"
        assert not failures, failures
        yield start, released
    finally:
        start.set()
        release.set()
        thread.join(5)
        assert not thread.is_alive(), "Target lock thread did not exit"
        assert not failures, failures


def journal_at(path):
    return Journal(path, api_base="https://api.example.test",
                   issuer="https://identity.example.test", user_id="synthetic-user",
                   model="local-test")


def retry_warning(caplog, journal, attempts):
    warnings = [record for record in caplog.records if record.name == "resources"]
    assert len(warnings) == 1
    assert warnings[0].levelno == logging.WARNING
    assert warnings[0].args == (str(journal.path), attempts)
    assert PRIVATE_MARKER not in caplog.text


def test_save_recovers_when_real_target_lock_releases_after_150ms(tmp_path, caplog):
    with journal_at(tmp_path) as journal:
        journal.data["stages"] = {"private": PRIVATE_MARKER}
        with held_target(journal.path, release_after=0.150) as (start, released):
            started = time.monotonic()
            start.set()
            journal.save()
            elapsed = time.monotonic() - started
            assert released.is_set()
        assert 0.120 <= elapsed < 2
        assert json.loads(journal.path.read_text(encoding="utf-8")) == journal.data
        warning = [record for record in caplog.records if record.name == "resources"]
        assert len(warning) == 1
        attempts = warning[0].args[1]
        assert 3 <= attempts <= 5
        retry_warning(caplog, journal, attempts)
        caplog.clear()
        journal.save()
        assert not caplog.records, "An uncontended save must not warn"


def test_save_reraises_original_error_when_real_target_lock_outlasts_budget(tmp_path, caplog):
    with journal_at(tmp_path) as journal:
        original = journal.path.read_bytes()
        journal.data["stages"] = {"private": PRIVATE_MARKER}
        errors = []

        def trace_save(frame, event, argument):
            if frame.f_code is Journal.save.__code__:
                if event == "exception" and isinstance(argument[1], PermissionError):
                    errors.append(argument[1])
                return trace_save
            return None

        with held_target(journal.path) as (start, released):
            previous_trace = sys.gettrace()
            started = time.monotonic()
            start.set()
            try:
                sys.settrace(trace_save)
                with pytest.raises(PermissionError) as caught:
                    journal.save()
            finally:
                sys.settrace(previous_trace)
            elapsed = time.monotonic() - started
            assert not released.is_set(), "Save must stop while the target stays locked"
            assert caught.value is errors[0]
            assert len({id(error) for error in errors}) == 5
            assert caught.value.winerror in (5, 32)
            assert 0.650 <= elapsed < 2
            assert journal.path.read_bytes() == original
            retry_warning(caplog, journal, 5)
        assert journal.path.read_bytes() == original
