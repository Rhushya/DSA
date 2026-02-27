import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient-primary)] text-white shadow-[var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg),0_0_30px_var(--primary-glow)] active:translate-y-0 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-md)] active:translate-y-0",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]",
        outline:
          "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]",
        white:
          "bg-white! text-[hsl(220_90%_40%)]! shadow-[0_4px_20px_hsl(0_0%_0%/0.2)]! hover:shadow-[0_8px_32px_hsl(0_0%_0%/0.3)]! hover:translate-y-[-2px]",
      },
      size: {
        default: "px-7 py-3 text-[15px] rounded-[var(--radius-lg)]",
        sm: "px-4 py-2 text-[13px] rounded-[var(--radius-md)]",
        lg: "px-9 py-3.5 text-base rounded-[var(--radius-lg)]",
        icon: "h-9 w-9 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
