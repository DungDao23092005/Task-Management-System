import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  endAdornment?: ReactNode;
}

const BASE_STYLES =
  "h-10 w-full rounded-[2px] border bg-canvas px-3 text-sm text-ink transition-colors duration-150 placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-55";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, endAdornment, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className="grid gap-2">
      <label
        htmlFor={inputId}
        className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            BASE_STYLES,
            endAdornment ? "pr-11" : null,
            error
              ? "border-danger focus-visible:border-danger focus-visible:ring-danger"
              : "border-line-strong focus-visible:border-accent focus-visible:ring-accent",
            className,
          )}
          {...props}
        />
        {endAdornment ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            {endAdornment}
          </div>
        ) : null}
      </div>
      {message ? (
        <p
          id={messageId}
          className={cn(
            "text-xs leading-5",
            error ? "text-danger-ink" : "text-muted",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
});
