import { cn } from "@/lib/utils";

type GradientBackgroundProps = {
  className?: string;
  tone?: "indigo" | "amber";
};

const gradients = {
  indigo:
    "radial-gradient(125% 125% at 50% 10%, #ffffff 36%, #eef6ff 58%, #d7f8ee 76%, #6366f1 100%)",
  amber:
    "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #fff7ed 68%, #f59e0b 100%)",
};

export function GradientBackground({ className, tone = "indigo" }: GradientBackgroundProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-30 min-h-screen w-full", className)} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: gradients[tone],
          backgroundSize: "100% 100%",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_14%,rgba(0,122,255,.18),transparent_24%),radial-gradient(circle_at_12%_34%,rgba(21,214,180,.14),transparent_26%)]" />
    </div>
  );
}

export const Component = GradientBackground;
