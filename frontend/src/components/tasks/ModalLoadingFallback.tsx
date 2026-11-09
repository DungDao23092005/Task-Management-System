import { createPortal } from "react-dom";
import { Spinner } from "../ui/Spinner";

export function ModalLoadingFallback() {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-busy="true"
      aria-label="Đang mở hộp thoại"
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border border-line-strong bg-surface px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <Spinner size="sm" label="Đang tải..." />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Đang tải hộp thoại...
        </span>
      </div>
    </div>,
    document.body,
  );
}

