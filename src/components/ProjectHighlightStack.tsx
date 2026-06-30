import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type HighlightCard = {
  id: string;
  eyebrow: string;
  title: string;
  metricValue?: string;
  metricLabel?: string;
  summary: string;
  href: string;
};

type CardPosition = "front" | "middle" | "back";

const positionStyles: Record<CardPosition, { rotate: string; x: string; zIndex: number; opacity: number }> = {
  front: { rotate: "-5deg", x: "0%", zIndex: 3, opacity: 1 },
  middle: { rotate: "0deg", x: "30%", zIndex: 2, opacity: 0.85 },
  back: { rotate: "5deg", x: "58%", zIndex: 1, opacity: 0.7 },
};

function HighlightStackCard({
  card,
  position,
  onShuffle,
  ctaLabel,
}: {
  card: HighlightCard;
  position: CardPosition;
  onShuffle: () => void;
  ctaLabel: string;
}) {
  const dragStartX = React.useRef(0);
  const isFront = position === "front";
  const style = positionStyles[position];

  return (
    <motion.article
      style={{ zIndex: style.zIndex }}
      animate={{ rotate: style.rotate, x: style.x, opacity: style.opacity }}
      drag={isFront ? "x" : false}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(event) => {
        dragStartX.current = "clientX" in event ? event.clientX : 0;
      }}
      onDragEnd={(event) => {
        const endX = "clientX" in event ? event.clientX : 0;
        if (dragStartX.current - endX > 120) {
          onShuffle();
        }
        dragStartX.current = 0;
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "apple-glass-panel absolute left-0 top-0 flex h-[360px] w-[290px] flex-col justify-between overflow-hidden border border-white/75 bg-[linear-gradient(150deg,rgba(255,255,255,.78),rgba(255,255,255,.34))] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,.94),0_22px_58px_rgba(46,61,82,.16)] backdrop-blur-[40px] backdrop-saturate-150 sm:w-[300px]",
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
      )}
    >
      <div className="relative z-[1]">
        <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-blue-600">{card.eyebrow}</p>
        {card.metricValue ? (
          <div className="mt-5">
            <span className="apple-display-text block text-[clamp(2.1rem,4vw,2.8rem)] leading-none text-neutral-950">
              {card.metricValue}
            </span>
            <span className="mt-2 block text-xs leading-5 text-neutral-500">{card.metricLabel}</span>
          </div>
        ) : null}
        <h3 className="apple-display-text mt-5 text-[1.05rem] leading-snug text-neutral-900">{card.title}</h3>
        <p className="mt-3 line-clamp-3 text-[0.85rem] leading-6 text-neutral-600">{card.summary}</p>
      </div>

      <div className="relative z-[1] flex items-center justify-between pt-4">
        <a
          href={card.href}
          className="liquid-glow-button inline-flex h-9 items-center gap-1.5 rounded-full border border-white/85 bg-white/55 px-3.5 text-xs font-semibold text-neutral-950 shadow-[inset_0_1px_1px_rgba(255,255,255,.98),0_12px_30px_rgba(30,63,100,.12)] backdrop-blur-[30px] transition hover:scale-[1.03]"
        >
          {ctaLabel}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
        {isFront ? <GripHorizontal className="size-5 text-neutral-400" aria-hidden="true" /> : null}
      </div>
    </motion.article>
  );
}

export function ProjectHighlightStack({
  items,
  dragHint,
  ctaLabel,
  className,
}: {
  items: HighlightCard[];
  dragHint: string;
  ctaLabel: string;
  className?: string;
}) {
  const [order, setOrder] = React.useState(() => items.map((_, index) => index));

  const handleShuffle = React.useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last !== undefined) {
        next.unshift(last);
      }
      return next;
    });
  }, []);

  if (items.length === 0) {
    return null;
  }

  const positions: CardPosition[] = ["front", "middle", "back"];

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="relative h-[360px] w-[290px] sm:w-[300px]">
        {order.map((itemIndex, stackIndex) => (
          <HighlightStackCard
            key={items[itemIndex].id}
            card={items[itemIndex]}
            position={positions[stackIndex] ?? "back"}
            onShuffle={handleShuffle}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <GripHorizontal className="size-4" aria-hidden="true" />
        <span>{dragHint}</span>
      </div>
    </div>
  );
}
