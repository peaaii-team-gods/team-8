import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { toToastRecord, type ToastInput, type ToastRecord } from "./toast";
import StatusLine from "./StatusLine";

const MAX_TOASTS = 4;

const ToastContext = createContext<(input: ToastInput) => void>(() => {});

export function useToast() {
  const toast = useContext(ToastContext);
  return { toast };
}

const LEVEL: Record<ToastRecord["level"], string> = {
  info: "border-white/30",
  ok: "border-emerald-300/70",
  warn: "border-amber-300/70",
  error: "border-rose-300/70",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const record = toToastRecord(input, id);
    if (!record) return;
    setToasts((current) => [record, ...current].slice(0, MAX_TOASTS));
    const timeout = input.timeoutMs ?? 4500;
    if (timeout > 0) {
      const timer = window.setTimeout(() => dismiss(id), timeout);
      timers.current.set(id, timer);
    }
  }, [dismiss]);

  useEffect(() => () => {
    for (const timer of timers.current.values()) window.clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-[80] flex w-[min(320px,90vw)] flex-col gap-2" data-testid="toast-stack" aria-label="Notifications">
        {toasts.map((item) => (
          <div key={item.id} data-testid="toast" data-level={item.level} className={`pointer-events-auto glass border-l-2 px-3 py-2 text-xs ${LEVEL[item.level]}`}>
            <div className="flex items-start gap-2">
              <div>
                <div className="font-semibold">{item.title}</div>
                {item.detail && <div className="mt-0.5 opacity-70">{item.detail}</div>}
              </div>
              <button type="button" className="ml-auto opacity-70" aria-label="Dismiss notification" onClick={() => dismiss(item.id)}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
      <StatusLine />
    </ToastContext.Provider>
  );
}
