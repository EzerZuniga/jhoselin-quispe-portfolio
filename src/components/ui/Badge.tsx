import type { HTMLAttributes, ReactNode } from "react";

/* ============================================
   Badge Component
   A small label for status, categories, or tags.
   ============================================ */

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "outline";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Optional icon */
  icon?: ReactNode;
  /** Badge content */
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary/10 text-primary dark:bg-primary/20",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success/10 text-success dark:bg-success/20",
  warning: "bg-warning/10 text-warning dark:bg-warning/20",
  error: "bg-error/10 text-error dark:bg-error/20",
  outline: "bg-transparent border border-border text-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-2xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

export default function Badge({
  variant = "default",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap transition-colors";

  const classes = [baseStyles, variantStyles[variant], sizeStyles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
