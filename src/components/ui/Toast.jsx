import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle size={20} className="text-emerald-500 shrink-0" />,
  error: <XCircle size={20} className="text-red-500 shrink-0" />,
  warning: <AlertTriangle size={20} className="text-yellow-500 shrink-0" />,
  info: <Info size={20} className="text-blue-500 shrink-0" />,
};

const BG = {
  success: "bg-white border-l-4 border-emerald-500",
  error: "bg-white border-l-4 border-red-500",
  warning: "bg-white border-l-4 border-yellow-500",
  info: "bg-white border-l-4 border-blue-500",
};

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const toast = useMemo(() => ({
    success: (title, message, duration) => add("success", title, message, duration),
    error: (title, message, duration) => add("error", title, message, duration),
    warning: (title, message, duration) => add("warning", title, message, duration),
    info: (title, message, duration) => add("info", title, message, duration),
  }), [add]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastItem = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl max-w-sm w-full
        animate-in slide-in-from-right-full duration-300
        ${BG[toast.type] || BG.info}
      `}
    >
      {ICONS[toast.type] || ICONS.info}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-black text-gray-800 text-sm leading-tight">{toast.title}</p>
        )}
        {toast.message && (
          <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-300 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// For backward compatibility during migration, we can export a dummy container
export const ToastContainer = () => null;
