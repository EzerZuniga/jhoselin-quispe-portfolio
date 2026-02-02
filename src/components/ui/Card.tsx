import type { HTMLAttributes, ReactNode } from "react";

/* ============================================
   Card Component
   A versatile card container with optional hover effects.
   ============================================ */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: "default" | "elevated" | "outlined" | "glass";
  /** Enable hover animation */
  hoverable?: boolean;
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Card content */
  children: ReactNode;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const variantStyles = {
  default: "bg-card border border-border",
  elevated: "bg-card shadow-lg shadow-black/5 dark:shadow-black/20",
  outlined: "bg-transparent border-2 border-border",
  glass: "glass border border-border/50",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "default",
  hoverable = false,
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl overflow-hidden transition-all duration-300";
  const hoverStyles = hoverable
    ? "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:-translate-y-1 cursor-pointer"
    : "";

  const classes = [
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    hoverStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }: CardBodyProps) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
