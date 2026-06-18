import { cn } from "@/lib/utils";

type BackgroundComponentsProps = {
  className?: string;
};

export function Component({ className }: BackgroundComponentsProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-30 min-h-screen w-full bg-white", className)} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, #FFF991 0%, transparent 70%)",
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(99,102,241,.34),transparent_32%),radial-gradient(circle_at_14%_76%,rgba(34,211,238,.2),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.94)_0%,rgba(246,248,252,.88)_52%,rgba(236,242,248,.92)_100%)]" />
      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}

export const BackgroundComponents = Component;
