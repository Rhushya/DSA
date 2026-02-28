import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold no-underline leading-tight text-center transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-light)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-white shadow-[var(--shadow-md)] hover:bg-[var(--primary-hover)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-lg)] active:translate-y-0 active:shadow-[var(--shadow-sm)]",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] shadow-[var(--shadow-xs)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-0",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--primary-muted)] hover:text-[var(--text-primary)]",
        outline:
          "border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-muted)] hover:text-[var(--primary)]",
        white:
          "bg-white! text-[var(--primary)]! font-bold! shadow-[var(--shadow-md)]! hover:shadow-[var(--shadow-lg)]! hover:translate-y-[-1px] active:translate-y-0",
      },
      size: {
        default: "h-12 px-8 text-base rounded-xl",
        sm: "h-11 px-6 text-[15px] rounded-xl",
        lg: "h-14 px-12 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
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
