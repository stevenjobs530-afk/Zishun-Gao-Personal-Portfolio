import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "apple-glass-panel border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,255,255,.3)),linear-gradient(145deg,rgba(0,0,0,.1),rgba(255,255,255,.1))] shadow-[inset_0_1px_1px_rgba(255,255,255,.94),inset_0_-1px_18px_rgba(255,255,255,.38),0_0_0_1px_rgba(255,255,255,.28),0_22px_58px_rgba(46,61,82,.15),0_44px_130px_rgba(33,130,255,.14)] backdrop-blur-[44px] backdrop-saturate-150",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-7", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("apple-display-text text-lg leading-tight text-neutral-900", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-7 text-neutral-600", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-7 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-3 p-7 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
