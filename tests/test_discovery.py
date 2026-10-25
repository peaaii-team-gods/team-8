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
    listing = b"location-name: North Campus\nmrf-url: /north.json\n\nlocation-name: South Campus\nmrf-url: /south.json\n"
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
        "/cms-hpt.txt": (200, {}, b"location-name: Campus\nsource-page-url: /prices.html\n"),
        "/prices.html": (200, {}, b'<a href="/latest.json">download</a>'),
        "/latest.json": (200, {}, b'{"ok":true}'),
    })
    result = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    assert result["data"] == b'{"ok":true}'
    assert [item["url"].rsplit("/", 1)[-1] for item in result["trace"]] == ["cms-hpt.txt", "prices.html", "latest.json"]


def test_resolves_relative_json_link_from_source_page(tmp_path):
    payload = b'{"ok":true}'
    site = FakeSite({
        "/cms-hpt.txt": (200, {}, b"location-name: Campus\nsource-page-url: /prices/index.html\n"),
        "/prices/index.html": (200, {}, b'<a href="latest.json">download</a>'),
        "/prices/latest.json": (200, {}, payload),
    })
    result = discover(site.domain, "CAMPUS", cache_dir=tmp_path, opener=site)
    assert result["data"] == payload
    assert result["source_url"] == "https://fixture.test/prices/latest.json"
    assert site.requests == ["/cms-hpt.txt", "/prices/index.html", "/prices/latest.json"]


def test_rejects_zip_archives(tmp_path):
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"location-name: Campus\nmrf-url: /file.zip\n")})
    with pytest.raises(DiscoveryError, match="unsupported_archive"):
        discover(site.domain, "campus", cache_dir=tmp_path, opener=site)


def test_rejects_download_over_cap(tmp_path):
    listing = b"location-name: Campus\nmrf-url: /file.json\n"
    limit = len(listing)
    site = FakeSite({"/cms-hpt.txt": (200, {}, listing), "/file.json": (200, {}, b"x" * (limit + 1))})
    with pytest.raises(DiscoveryError, match="size_limit") as failure:
        discover(site.domain, "campus", cache_dir=tmp_path, max_bytes=limit, opener=site)
    assert failure.value.bytes_read == limit + 1
    assert site.requests == ["/cms-hpt.txt", "/file.json"]
    assert list(tmp_path.iterdir()) == []


def test_rejects_no_location_match(tmp_path):
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"location-name: North\nmrf-url: /n.json\n")})
    with pytest.raises(DiscoveryError, match="no_location_match"):
        discover(site.domain, "South", cache_dir=tmp_path, opener=site)


@pytest.mark.parametrize("other_field", ["mrf-url", "contact-email", "contact-name", "source-page-url"])
def test_location_hint_never_matches_other_fields(tmp_path, other_field):
    listing = f"location-name: North Campus\n{other_field}: south-only\n".encode()
    site = FakeSite({"/cms-hpt.txt": (200, {}, listing)})
    with pytest.raises(DiscoveryError) as failure:
        discover(site.domain, "south-only", cache_dir=tmp_path, opener=site)
    assert failure.value.code == "no_location_match"
    assert failure.value.locations == ("North Campus",)
    assert str(failure.value) == "no_location_match: North Campus"
    assert site.requests == ["/cms-hpt.txt"]


def test_ambiguous_location_lists_matches_without_downloading(tmp_path):
    listing = (b"location-name: South Shore Campus\nmrf-url: /one.json\n\n"
               b"location-name: South Shore Annex\nmrf-url: /two.json\n")
    site = FakeSite({"/cms-hpt.txt": (200, {}, listing)})
    with pytest.raises(DiscoveryError) as failure:
        discover(site.domain, "south shore", cache_dir=tmp_path, opener=site)
    assert failure.value.code == "ambiguous_location"
    assert failure.value.locations == ("South Shore Campus", "South Shore Annex")
    assert str(failure.value) == "ambiguous_location: South Shore Campus, South Shore Annex"
    assert site.requests == ["/cms-hpt.txt"]


@pytest.mark.parametrize("location_key", ["LoCaTiOn-NaMe", "location_name", "location name"])
def test_south_shore_hint_selects_one_normalized_location(tmp_path, location_key):
    listing = (f"location-name: North Campus\nmrf-url: /north.json\n\n"
               f"{location_key}: South   Shore Hospital\nmrf-url: /south.json\n").encode()
    site = FakeSite({"/cms-hpt.txt": (200, {}, listing), "/south.json": (200, {}, b"{}")})
    result = discover(site.domain, "  SOUTH \t shore  ", cache_dir=tmp_path, opener=site)
    assert result["source_url"] == "https://fixture.test/south.json"
    assert result["data"] == b"{}"
    assert site.requests == ["/cms-hpt.txt", "/south.json"]


def test_network_failure_uses_sha_cache_with_cached_label(tmp_path):
    payload = b'{"cached":true}'
    site = FakeSite({"/cms-hpt.txt": (200, {}, b"location-name: Campus\nmrf-url: /file.json\n"), "/file.json": (200, {}, payload)})
    first = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    site.online = False
    second = discover(site.domain, "campus", cache_dir=tmp_path, opener=site)
    assert second["data"] == payload
    assert second["sha256"] == first["sha256"]
    assert second["label"] == "cached"
    assert second["trace"][-1]["status"] == "error"
    assert (tmp_path / f"{first['sha256']}.mrf").read_bytes() == payload
