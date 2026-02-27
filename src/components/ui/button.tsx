import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold no-underline leading-tight text-center transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient-primary)] text-white shadow-[0_4px_14px_hsl(220_90%_56%/0.35),var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[0_8px_28px_hsl(220_90%_56%/0.45),var(--shadow-lg)] active:translate-y-0 active:shadow-[var(--shadow-sm)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border-2 border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_4px_16px_var(--primary-glow)] hover:translate-y-[-2px] active:translate-y-0 active:shadow-[var(--shadow-sm)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]",
        outline:
          "border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-muted)] hover:text-[var(--primary)]",
        white:
          "bg-white! text-[hsl(220_90%_40%)]! font-bold! shadow-[0_4px_20px_hsl(0_0%_0%/0.15)]! hover:shadow-[0_8px_32px_hsl(0_0%_0%/0.25)]! hover:translate-y-[-2px] active:translate-y-0",
      },
      size: {
        default: "h-11 px-7 text-[15px] rounded-xl",
        sm: "h-9 px-4 text-[13px] rounded-lg",
        lg: "h-13 px-10 text-base rounded-xl",
        icon: "h-9 w-9 rounded-lg",
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
