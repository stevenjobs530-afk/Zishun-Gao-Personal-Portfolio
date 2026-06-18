import * as React from "react";
import { cn } from "@/lib/utils";

type LiquidGlassProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function LiquidGlass<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: LiquidGlassProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        "apple-glass-panel relative isolate overflow-hidden border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.3)),linear-gradient(145deg,rgba(0,0,0,.1),rgba(255,255,255,.1))] shadow-[inset_0_1px_1px_rgba(255,255,255,.92),inset_0_-1px_18px_rgba(255,255,255,.36),0_0_0_1px_rgba(255,255,255,.27),0_20px_58px_rgba(46,61,82,.15),0_42px_120px_rgba(33,130,255,.13)] backdrop-blur-[44px] backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-[1px] before:z-0 before:rounded-[inherit] before:border before:border-white/50 before:shadow-[inset_0_1px_1px_rgba(255,255,255,.82),0_0_28px_rgba(0,122,255,.13)] after:pointer-events-none after:absolute after:-inset-24 after:-z-10 after:bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.66),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(32,210,190,.16),transparent_30%)] after:opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { LiquidGlass };
