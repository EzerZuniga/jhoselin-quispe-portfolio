import { useEffect, useCallback, type ReactNode, type MouseEvent } from "react";

/* ============================================
   Modal Component
   An accessible modal dialog with overlay.
   ============================================ */

interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Modal title for accessibility */
  title: string;
  /** Modal size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Show close button */
  showCloseButton?: boolean;
  /** Modal content */
  children: ReactNode;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  showCloseButton = true,
  children,
}: ModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Lock body scroll and add escape listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  // Handle overlay click
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={`relative w-full ${sizeStyles[size]} bg-background rounded-2xl shadow-2xl border border-border animate-fade-up`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="modal-title" className="text-xl font-semibold text-foreground">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
}
