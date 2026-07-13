import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.97] active:duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        glass:
          "liquid-glow-button border border-white/85 bg-white/50 text-neutral-950 shadow-[inset_0_1px_1px_rgba(255,255,255,.98),inset_0_-14px_28px_rgba(255,255,255,.26),0_16px_42px_rgba(30,63,100,.13),0_0_30px_rgba(126,217,255,.2)] backdrop-blur-[34px] backdrop-saturate-150 hover:scale-[1.02] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-16px_30px_rgba(255,255,255,.3),0_18px_44px_rgba(0,122,255,.2),0_0_38px_rgba(126,217,255,.32)]",
        primary:
          "liquid-glow-button border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(162,221,255,.74))] text-neutral-950 shadow-[inset_0_1px_1px_rgba(255,255,255,.98),inset_0_-18px_28px_rgba(255,255,255,.22),0_16px_42px_rgba(0,122,255,.2),0_0_34px_rgba(126,217,255,.3)] backdrop-blur-[34px] backdrop-saturate-150 hover:scale-[1.02] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-16px_30px_rgba(255,255,255,.3),0_18px_44px_rgba(0,122,255,.24),0_0_42px_rgba(126,217,255,.36)]",
        link: "min-h-auto rounded-none px-0 text-neutral-600 hover:text-blue-700",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
