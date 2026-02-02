import { useState, type ReactNode } from "react";

/* ============================================
   Tooltip Component
   A simple tooltip that appears on hover.
   ============================================ */

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Position of the tooltip */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Element that triggers the tooltip */
  children: ReactNode;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent",
};

export default function Tooltip({
  content,
  position = "top",
  delay = 200,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 ${positionStyles[position]} pointer-events-none`}
        >
          <div className="bg-foreground text-background px-3 py-1.5 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            {content}
          </div>
          <div
            className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
