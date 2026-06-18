import { cn } from "@/lib/utils";

type AnimatedCardVisualProps = {
  visual: "bars" | "apps" | "wave" | "code";
  className?: string;
};

const barHeights = [44, 63, 36, 76, 54, 88];
const appCells = Array.from({ length: 6 });
const codeLines = ["const tools = build();", "focus.timer.start();", "wallpaper.automate();", "drinkReminder.sync();"];

function VisualChrome({ className }: { className?: string }) {
  return (
    <>
      <span
        className={cn(
          "pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(10,18,28,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(10,18,28,.055)_1px,transparent_1px)] bg-[length:28px_28px]",
          className,
        )}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_72%_24%,rgba(0,122,255,.2),transparent_34%),radial-gradient(circle_at_14%_82%,rgba(21,214,180,.16),transparent_28%)] transition-transform duration-700 ease-out group-hover/animated-card:scale-110"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -inset-16 z-[2] translate-x-[-58%] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.68),transparent)] blur-sm transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:translate-x-[58%]"
        aria-hidden="true"
      />
    </>
  );
}

function BarsVisual() {
  return (
    <div className="relative z-[3] flex h-full items-end justify-center gap-4 p-11">
      {barHeights.map((height, index) => (
        <i
          key={height}
          className="flex-1 rounded-t bg-[linear-gradient(180deg,rgba(0,122,255,.82),rgba(46,207,231,.72)_52%,rgba(63,99,255,.54))] shadow-[0_0_24px_rgba(0,122,255,.26),0_0_44px_rgba(56,213,225,.18)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:-translate-y-3 group-hover/animated-card:scale-y-[1.06]"
          style={{ height: `${height}%`, transitionDelay: `${index * 45}ms` }}
        />
      ))}
    </div>
  );
}

function AppsVisual() {
  return (
    <div className="relative z-[3] grid h-full grid-cols-3 gap-4 p-11">
      {appCells.map((_, index) => (
        <span
          key={index}
          className="apple-inner-curve min-h-14 border border-white/70 bg-white/48 shadow-[inset_0_1px_1px_rgba(255,255,255,.86),0_12px_28px_rgba(40,56,76,.1),0_0_24px_rgba(255,255,255,.35)] backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:-translate-y-2 group-hover/animated-card:scale-[1.04]"
          style={{ transitionDelay: `${index * 42}ms` }}
        />
      ))}
    </div>
  );
}

function WaveVisual() {
  return (
    <div className="relative z-[3] h-full">
      <span className="apple-inner-curve absolute inset-11 border border-white/60 bg-white/18 shadow-[inset_0_1px_1px_rgba(255,255,255,.82),0_0_28px_rgba(0,122,255,.13)] backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:-translate-y-2" />
      <svg className="absolute inset-x-10 top-1/2 z-[4] h-24 -translate-y-1/2 text-blue-500/45" viewBox="0 0 420 120" fill="none" aria-hidden="true">
        <path
          d="M4 82 C54 18 94 106 142 48 C194 -15 226 110 278 52 C326 -4 360 72 416 26"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="[stroke-dasharray:560] [stroke-dashoffset:200] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:[stroke-dashoffset:0]"
        />
      </svg>
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="relative z-[3] grid h-full content-center gap-3 p-9">
      {codeLines.map((line, index) => (
        <code
          key={line}
          className="apple-inner-curve block border border-white/70 bg-white/48 px-3 py-2 text-sm leading-7 text-neutral-700 shadow-[inset_0_1px_1px_rgba(255,255,255,.84),0_12px_28px_rgba(40,56,76,.1)] backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/animated-card:translate-x-2"
          style={{ transitionDelay: `${index * 48}ms` }}
        >
          {line}
        </code>
      ))}
    </div>
  );
}

export function AnimatedCardVisual({ visual, className }: AnimatedCardVisualProps) {
  return (
    <div
      className={cn(
        "relative h-56 overflow-hidden border-b border-white/50 bg-white/20",
        visual === "wave" && "bg-[linear-gradient(120deg,rgba(0,122,255,.18),transparent_35%),rgba(255,255,255,.24)]",
        className,
      )}
      aria-hidden="true"
    >
      <VisualChrome className={visual === "wave" ? "opacity-50" : undefined} />
      {visual === "bars" && <BarsVisual />}
      {visual === "apps" && <AppsVisual />}
      {visual === "wave" && <WaveVisual />}
      {visual === "code" && <CodeVisual />}
    </div>
  );
}
