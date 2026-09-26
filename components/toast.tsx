"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ToastTone = "success" | "info" | "error";
export type Toast = { id: number; message: string; tone: ToastTone };

type ToastContextValue = {
  notify: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Root client provider: exposes `useToast()` to the whole tree and mounts the
 * toast viewport once.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
    </ToastContext.Provider>
  );
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-100 flex flex-col items-center gap-2 p-4 sm:right-6 sm:bottom-6 sm:left-auto sm:items-end sm:p-0"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 border border-ink/10 bg-ink px-4 py-3 text-bone shadow-[0_18px_40px_-20px_rgba(11,11,12,0.6)]"
          >
            <span
              aria-hidden="true"
              className={`grid size-6 shrink-0 place-items-center rounded-full ${
                toast.tone === "error" ? "bg-clay/30 text-clay" : "bg-accent/90 text-ink"
              }`}
            >
              {toast.tone === "info" ? (
                <Info className="size-3.5" />
              ) : toast.tone === "error" ? (
                <X className="size-3.5" />
              ) : (
                <Check className="size-3.5" />
              )}
            </span>
            <p className="flex-1 text-sm leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-bone/50 transition-colors hover:text-bone"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Access the toast helper from any client component. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastViewport />");
  return ctx.notify;
}

/** Restores state from localStorage after mount to avoid SSR hydration drift. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* corrupted or unavailable storage — fall back to initial state */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked — state stays in memory only */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
