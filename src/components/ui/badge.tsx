import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-muted)] text-[var(--primary)] text-xs uppercase tracking-[0.1em] px-3.5 py-1 rounded-full",
        accent:
          "bg-[var(--accent-muted)] text-[var(--accent)] text-[11px] uppercase tracking-[0.05em] font-bold px-2.5 py-0.5 rounded-full",
        outline:
          "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] text-[13px] px-4 py-1.5 rounded-full shadow-[var(--shadow-sm)]",
        success:
          "bg-[var(--success-muted)] text-[var(--success)] text-xs uppercase tracking-[0.1em] px-3.5 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
