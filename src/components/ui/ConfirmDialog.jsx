import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

/**
 * ConfirmDialog — replaces window.confirm() with a professional modal.
 *
 * Usage:
 *   const { confirm, ConfirmDialogComponent } = useConfirm();
 *
 *   // In JSX:
 *   {ConfirmDialogComponent}
 *
 *   // To trigger it:
 *   const ok = await confirm({
 *     title: "Xoá tài khoản?",
 *     message: "Hành động này không thể hoàn tác!",
 *     confirmText: "Xoá",
 *     type: "danger" // "danger" | "warning" | "info"
 *   });
 *   if (ok) { ... do action ... }
 */

const TYPE_STYLES = {
  danger: {
    icon: <Trash2 size={24} className="text-red-500" />,
    bg: "bg-red-50",
    btn: "bg-red-600 hover:bg-red-700 shadow-red-600/30",
    ring: "ring-red-200",
  },
  warning: {
    icon: <AlertTriangle size={24} className="text-yellow-500" />,
    bg: "bg-yellow-50",
    btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/30",
    ring: "ring-yellow-200",
  },
  info: {
    icon: <AlertTriangle size={24} className="text-blue-500" />,
    bg: "bg-blue-50",
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30",
    ring: "ring-blue-200",
  },
};

export const useConfirm = () => {
  const [dialog, setDialog] = React.useState(null);
  const resolveRef = React.useRef(null);

  const confirm = React.useCallback(({ title, message, confirmText = "Xác nhận", cancelText = "Huỷ", type = "danger" }) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setDialog({ title, message, confirmText, cancelText, type });
    });
  }, []);

  const handleConfirm = () => {
    setDialog(null);
    resolveRef.current?.(true);
  };

  const handleCancel = () => {
    setDialog(null);
    resolveRef.current?.(false);
  };

  const ConfirmDialogComponent = dialog ? (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancel} />
      <div className={`relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-4 ${TYPE_STYLES[dialog.type]?.ring || "ring-red-200"}`}>
        {/* Header */}
        <div className={`px-6 pt-6 pb-4 flex flex-col items-center text-center ${TYPE_STYLES[dialog.type]?.bg}`}>
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md mb-4">
            {TYPE_STYLES[dialog.type]?.icon}
          </div>
          <h3 className="text-xl font-black text-gray-800">{dialog.title}</h3>
          {dialog.message && (
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">{dialog.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-4 bg-white">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all active:scale-95"
          >
            {dialog.cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95 ${TYPE_STYLES[dialog.type]?.btn}`}
          >
            {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, ConfirmDialogComponent };
};

export default useConfirm;
