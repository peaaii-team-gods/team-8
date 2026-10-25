import gzip
import hashlib
import io
import urllib.parse

import pytest

from discovery import DiscoveryError, discover


class FakeResponse:
    def __init__(self, status, headers, body):
        self.status, self.headers, self.body = status, headers, io.BytesIO(body)

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        self.body.close()

    def read(self, size=-1):
        return self.body.read(size)

    def getcode(self):
        return self.status


class FakeSite:
    def __init__(self, routes):
        self.routes, self.requests, self.online = routes, [], True
        self.domain = "fixture.test"

    def open(self, request, timeout=30):
        path = urllib.parse.urlparse(request.full_url).path
        self.requests.append(path)
        if not self.online:
            raise OSError("offline test fixture")
        status, headers, body = self.routes.get(path, (404, {}, b"missing"))
        return FakeResponse(status, headers, body)


def test_hits_matching_location_and_gzip(tmp_path):
    payload = b'{"hospital":"fixture"}'
    listing = b"Location: North Campus\nmrf-url: /north.json\n\nLocation: South Campus\nmrf-url: /south.json\n"
    site = FakeSite({"/cms-hpt.txt": (200, {"Content-Encoding": "gzip"}, gzip.compress(listing)), "/north.json": (200, {}, payload)})
    result = discover(site.domain, "nOrTh campus", cache_dir=tmp_path, opener=site)
    assert result["data"] == payload
    assert result["label"] == "downloaded"
    assert result["sha256"] == hashlib.sha256(payload).hexdigest()
    assert result["trace"] == [
        {"url": f"https://{site.domain}/cms-hpt.txt", "status": 200, "bytes": len(listing)},
        {"url": f"https://{site.domain}/north.json", "status": 200, "bytes": len(payload)},
    ]


def test_falls_back_to_json_link_on_source_page(tmp_path):
    site = FakeSite({
        "/cms-hpt.txt": (200, {}, b"Location: Campus\nsource-page-url: /prices.html\n"),
        "/prices.html": (200, {}, b'<a href="/latest.json">download</a>'),
        "/latest.json": (200, {}, b'{"ok":true}'),
    })
    result = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    assert result["data"] == b'{"ok":true}'
    assert [item["url"].rsplit("/", 1)[-1] for item in result["trace"]] == ["cms-hpt.txt", "prices.html", "latest.json"]


def test_rejects_zip_archives(tmp_path):
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"Location: Campus\nmrf-url: /file.zip\n")})
    with pytest.raises(DiscoveryError, match="unsupported_archive"):
        discover(site.domain, "campus", cache_dir=tmp_path, opener=site)


def test_rejects_download_over_cap(tmp_path):
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"Location: Campus\nmrf-url: /file.json\n"), "/file.json": (200, {}, b"123456789")})
    with pytest.raises(DiscoveryError, match="size_limit"):
        discover(site.domain, "campus", cache_dir=tmp_path, max_bytes=8, opener=site)


def test_rejects_no_location_match(tmp_path):
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"Location: North\nmrf-url: /n.json\n")})
    with pytest.raises(DiscoveryError, match="no_location_match"):
        discover(site.domain, "South", cache_dir=tmp_path, opener=site)


def test_network_failure_uses_sha_cache_with_cached_label(tmp_path):
    payload = b'{"cached":true}'
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"Location: Campus\nmrf-url: /file.json\n"), "/file.json": (200, {}, payload)})
    first = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    site.online = False
    second = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    assert second["data"] == payload
    assert second["sha256"] == first["sha256"]
    assert second["label"] == "cached"
    assert second["trace"][-1]["status"] == "error"
    assert (tmp_path / f"{first['sha256']}.mrf").read_bytes() == payload
