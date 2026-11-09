import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const BASE_STYLES =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[2px] border px-4 text-sm font-semibold tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-55";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-canvas hover:border-accent-hover hover:bg-accent-hover",
  secondary:
    "border-line-strong bg-raised text-ink hover:border-muted/50 hover:bg-line",
  ghost:
    "border-transparent bg-transparent text-muted hover:border-line hover:bg-surface hover:text-ink",
  danger:
    "border-danger-strong bg-danger-strong text-ink hover:border-danger-hover hover:bg-danger-hover",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      isLoading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(BASE_STYLES, VARIANT_STYLES[variant], className)}
        {...props}
        aria-busy={isLoading || undefined}
      >
        {isLoading ? (
          <Spinner size="sm" label="Loading" className="text-current" />
        ) : null}
        {children}
      </button>
    );
  },
);
