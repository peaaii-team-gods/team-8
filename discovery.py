import gzip
import hashlib
import html.parser
import http.client
import io
import json
import re
import socket
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

FETCH_RETRIES = 2
FETCH_BACKOFF_S = 1


class DiscoveryError(Exception):
    def __init__(self, code, bytes_read=0, locations=()):
        self.code = code
        self.bytes_read = bytes_read
        self.locations = tuple(locations)
        super().__init__(f"{code}: {', '.join(self.locations)}" if self.locations else code)


def _require_http(url):
    if urllib.parse.urlsplit(url).scheme.lower() not in {"http", "https"}:
        raise DiscoveryError("unsupported_scheme")


class _HTTPRedirect(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        target = headers.get("location", headers.get("uri"))
        if target is not None:
            _require_http(urllib.parse.urljoin(req.full_url, target))
        return super().http_error_302(req, fp, code, msg, headers)

    http_error_301 = http_error_303 = http_error_307 = http_error_308 = http_error_302


def _http_opener():
    # build_opener silently installs file, FTP and data protocol handlers.
    client = urllib.request.OpenerDirector()
    for handler in (urllib.request.HTTPHandler(), urllib.request.HTTPSHandler(),
                    urllib.request.HTTPDefaultErrorHandler(), _HTTPRedirect(),
                    urllib.request.HTTPErrorProcessor()):
        client.add_handler(handler)
    return client


class _Links(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "a":
            self.hrefs.extend(value for key, value in attrs if key.lower() == "href" and value)


def _bounded_body(response, limit, headers):
    raw = response.read(limit + 1)
    if len(raw) > limit:
        raise DiscoveryError("size_limit", len(raw))
    if headers.get("Content-Encoding", "").lower() == "gzip" or raw.startswith(b"\x1f\x8b"):
        try:
            with gzip.GzipFile(fileobj=io.BytesIO(raw)) as stream:
                body = stream.read(limit + 1)
        except OSError as exc:
            raise DiscoveryError("invalid_gzip") from exc
        if len(body) > limit:
            raise DiscoveryError("size_limit", len(raw))
        return body
    return raw


def _blocks(text):
    for chunk in re.split(r"(?:\r?\n\s*){2,}", text):
        fields = {}
        for line in chunk.splitlines():
            match = re.match(r"\s*([^:=]+?)\s*[:=]\s*(.*?)\s*$", line)
            if match:
                key = re.sub(r"[-_\s]+", "-", match.group(1).strip().casefold())
                fields[key] = match.group(2).strip()
        if fields:
            yield fields


def _cached(cache_dir, key, trace):
    index_path = cache_dir / "index.json"
    try:
        digest = json.loads(index_path.read_text(encoding="utf-8"))[key]
        data = (cache_dir / f"{digest}.mrf").read_bytes()
        if hashlib.sha256(data).hexdigest() != digest:
            return None
        return {"data": data, "sha256": digest, "source_url": None,
                "trace": trace, "label": "cached", "path": str(cache_dir / f"{digest}.mrf")}
    except (OSError, ValueError, KeyError, TypeError):
        return None


def discover(domain, location_hint, *, cache_dir="data", max_bytes=60 * 1024 * 1024, opener=None):
    """Discover and download a hospital MRF. Cache files are named by SHA-256."""
    location_hint = " ".join(location_hint.split()).casefold()
    if not domain or not location_hint or max_bytes <= 0:
        raise ValueError("domain, location_hint and positive max_bytes are required")
    domain = domain.strip().removeprefix("https://").removeprefix("http://").rstrip("/")
    base = f"https://{domain}/"
    cache = Path(cache_dir)
    cache.mkdir(parents=True, exist_ok=True)
    key = f"{domain.casefold()}|{location_hint.casefold()}"
    trace = []
    client = opener or _http_opener()

    def _timeout(exc):
        if isinstance(exc, (socket.timeout, TimeoutError)):
            return True
        reason = getattr(exc, "reason", None)
        return isinstance(reason, (socket.timeout, TimeoutError)) or "timed out" in str(exc).lower()

    def fetch(url, limit=max_bytes):
        _require_http(url)
        req = urllib.request.Request(url, headers={"Accept-Encoding": "gzip", "User-Agent": "RHM-Hospital-MRF-Discovery/1.0"})
        last = None
        for attempt in range(FETCH_RETRIES + 1):
            status = "error"
            try:
                response = client.open(req, timeout=30)
                with response:
                    status = response.getcode()
                    _require_http(response.geturl())
                    if isinstance(status, int) and 500 <= status <= 599:
                        trace.append({"url": url, "status": status, "bytes": 0})
                        last = DiscoveryError("http_error")
                        if attempt < FETCH_RETRIES:
                            time.sleep(FETCH_BACKOFF_S)
                            continue
                        raise last
                    headers = response.headers
                    body = _bounded_body(response, limit, headers)
                trace.append({"url": url, "status": status, "bytes": len(body)})
                if status < 200 or status >= 300:
                    raise DiscoveryError("http_error")
                return body
            except urllib.error.HTTPError as exc:
                trace.append({"url": url, "status": exc.code, "bytes": 0})
                last = DiscoveryError("http_error")
                if 500 <= exc.code <= 599 and attempt < FETCH_RETRIES:
                    time.sleep(FETCH_BACKOFF_S)
                    continue
                raise last from exc
            except DiscoveryError as exc:
                if not trace or trace[-1]["url"] != url:
                    trace.append({"url": url, "status": status, "bytes": exc.bytes_read})
                raise
            except (urllib.error.URLError, socket.timeout, TimeoutError, http.client.HTTPException, OSError) as exc:
                trace.append({"url": url, "status": status, "bytes": 0})
                last = DiscoveryError("network_error")
                if _timeout(exc) and attempt < FETCH_RETRIES:
                    time.sleep(FETCH_BACKOFF_S)
                    continue
                raise last from exc
        raise last

    try:
        listing = fetch(urllib.parse.urljoin(base, "cms-hpt.txt"), min(max_bytes, 2 * 1024 * 1024))
        blocks = list(_blocks(listing.decode("utf-8-sig")))
        names = [" ".join(b.get("location-name", "").split()) for b in blocks]
        matches = [(b, name) for b, name in zip(blocks, names) if location_hint in name.casefold()]
        if not matches:
            raise DiscoveryError("no_location_match", locations=[name for name in names if name])
        if len(matches) > 1:
            raise DiscoveryError("ambiguous_location", locations=[name for _, name in matches])
        selected = matches[0][0]
        target = selected.get("mrf-url") or selected.get("mrf_url")
        if not target and selected.get("source-page-url"):
            source_page = urllib.parse.urljoin(base, selected["source-page-url"])
            page = fetch(source_page, min(max_bytes, 4 * 1024 * 1024)).decode("utf-8-sig", errors="replace")
            parser = _Links()
            parser.feed(page)
            links = parser.hrefs + re.findall(r"https?://[^\s\"'<>]+\.json(?:\?[^\s\"'<>]*)?", page, re.I)
            target = next((link for link in links if urllib.parse.urlparse(link).path.casefold().endswith(".json")), None)
            if not target:
                raise DiscoveryError("no_json_link")
            target = urllib.parse.urljoin(source_page, target)
        if not target:
            raise DiscoveryError("no_mrf_url")
        target_url = urllib.parse.urljoin(base, target)
        if urllib.parse.urlparse(target_url).path.casefold().endswith(".zip"):
            raise DiscoveryError("unsupported_archive")
        data = fetch(target_url, max_bytes)
        digest = hashlib.sha256(data).hexdigest()
        destination = cache / f"{digest}.mrf"
        destination.write_bytes(data)
        index_path = cache / "index.json"
        try:
            index = json.loads(index_path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            index = {}
        index[key] = digest
        index_path.write_text(json.dumps(index, sort_keys=True), encoding="utf-8")
        return {"data": data, "sha256": digest, "source_url": target_url,
                "trace": trace, "label": "downloaded", "path": str(destination)}
    except DiscoveryError as exc:
        if exc.code in {"network_error", "http_error"}:
            cached = _cached(cache, key, trace)
            if cached:
                return cached
        raise


def main(argv=None):
    import argparse

    parser = argparse.ArgumentParser(description="Discover and download a hospital MRF")
    parser.add_argument("domain")
    parser.add_argument("location_hint")
    parser.add_argument("--max-bytes", type=int, default=60 * 1024 * 1024)
    args = parser.parse_args(argv)
    try:
        result = discover(args.domain, args.location_hint, max_bytes=args.max_bytes)
    except DiscoveryError as exc:
        parser.error(str(exc))
    print(json.dumps({key: result[key] for key in ("path", "source_url", "sha256", "label", "trace")}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
