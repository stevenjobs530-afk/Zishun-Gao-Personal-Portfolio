import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "liquid-glow-chip inline-flex items-center rounded-full border border-white/80 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),inset_0_-8px_16px_rgba(255,255,255,.2),0_12px_28px_rgba(40,56,76,.1),0_0_24px_rgba(126,217,255,.18)] backdrop-blur-2xl backdrop-saturate-150",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
