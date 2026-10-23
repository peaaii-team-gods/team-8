import { buildSessionDownload, sessionDownloadFilename, type SessionDownload } from "./telemetryEvents";

export { buildSessionDownload, sessionDownloadFilename };
export type { SessionDownload };

export function serializeSessionDownload(doc: SessionDownload): string {
  return JSON.stringify(doc, null, 2);
}

/** Triggers a browser download of the session telemetry JSON. */
export function downloadSessionJson(doc: SessionDownload): void {
  const blob = new Blob([serializeSessionDownload(doc)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = sessionDownloadFilename(doc);
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
