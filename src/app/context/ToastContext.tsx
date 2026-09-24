"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>

      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-2 bg-[#18181b] border border-zinc-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#b6fd00] text-black text-xs font-bold flex-shrink-0">
              ✓
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}