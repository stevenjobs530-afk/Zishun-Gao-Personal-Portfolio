import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { LanguageCode } from "@/data/portfolio";

type HintId = "language" | "sections";
type ArrowSide = "top" | "right" | "bottom";

type HintPosition = {
  top: number;
  left: number;
  arrowSide: ArrowSide;
  arrowOffset: number;
};

type HintCopy = {
  eyebrow: string;
  body: string;
  closeLabel: string;
};

const hintStorageKey = "zishun-portfolio-guided-hints-dismissed";
const viewportPadding = 16;

const hintCopyByLanguage: Record<LanguageCode, Record<HintId, HintCopy>> = {
  en: {
    language: {
      eyebrow: "Language",
      body: "Choose your preferred version here. English works well for UK / overseas recruiters, while 简体中文 is available for Chinese readers.",
      closeLabel: "Close guided hints",
    },
    sections: {
      eyebrow: "Sections",
      body: "Want to jump faster? Open Sections to move directly to Projects, Case Studies, Experience, Skills, Education, or Contact.",
      closeLabel: "Close guided hints",
    },
  },
  "zh-CN": {
    language: {
      eyebrow: "语言",
      body: "你可以在这里切换 English / 简体中文版本，按照不同 HR 或读者的阅读习惯查看内容。",
      closeLabel: "关闭引导提示",
    },
    sections: {
      eyebrow: "章节",
      body: "如果你想快速跳转到不同章节，可以点击「章节」进行进一步操作。",
      closeLabel: "关闭引导提示",
    },
  },
};

function clamp(value: number, min: number, max: number) {
  if (max < min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function isUsableTarget(element: Element | null): element is HTMLElement {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
}

function getSectionsTarget() {
  const rail = document.querySelector('[data-guide-target="sections-rail"]');

  if (isUsableTarget(rail)) {
    return { element: rail, placement: "rail" as const };
  }

  const compact = document.querySelector('[data-guide-target="sections"]');

  if (isUsableTarget(compact)) {
    return { element: compact, placement: "compact" as const };
  }

  return null;
}

function getCardSize(card: HTMLElement | null) {
  const viewportWidth = window.innerWidth;

  return {
    width: card?.offsetWidth || Math.min(344, viewportWidth - viewportPadding * 2),
    height: card?.offsetHeight || 168,
  };
}

function getLanguagePosition(card: HTMLElement | null): HintPosition | null {
  const target = document.querySelector('[data-guide-target="language"]');

  if (!isUsableTarget(target)) {
    return null;
  }

  const targetRect = target.getBoundingClientRect();
  const { width, height } = getCardSize(card);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const left = clamp(targetRect.right - width, viewportPadding, viewportWidth - width - viewportPadding);
  const top = clamp(targetRect.bottom + 14, viewportPadding, viewportHeight - height - viewportPadding);

  return {
    top,
    left,
    arrowSide: "top",
    arrowOffset: clamp(targetRect.left + targetRect.width / 2 - left, 24, width - 24),
  };
}

function getSectionsPosition(card: HTMLElement | null): HintPosition | null {
  const target = getSectionsTarget();

  if (!target) {
    return null;
  }

  const targetRect = target.element.getBoundingClientRect();
  const { width, height } = getCardSize(card);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (target.placement === "rail") {
    const left = clamp(targetRect.left - width - 16, viewportPadding, viewportWidth - width - viewportPadding);
    const top = clamp(targetRect.top + targetRect.height / 2 - height / 2, viewportPadding, viewportHeight - height - viewportPadding);

    return {
      top,
      left,
      arrowSide: "right",
      arrowOffset: clamp(targetRect.top + targetRect.height / 2 - top, 24, height - 24),
    };
  }

  const topCandidate = targetRect.top - height - 14;
  const top =
    topCandidate >= viewportPadding
      ? topCandidate
      : clamp(targetRect.bottom + 14, viewportPadding, viewportHeight - height - viewportPadding);
  const left = clamp(targetRect.right - width, viewportPadding, viewportWidth - width - viewportPadding);

  return {
    top,
    left,
    arrowSide: topCandidate >= viewportPadding ? "bottom" : "top",
    arrowOffset: clamp(targetRect.left + targetRect.width / 2 - left, 24, width - 24),
  };
}

function GuideArrow({ side, offset }: { side: ArrowSide; offset: number }) {
  const style =
    side === "right"
      ? { top: offset }
      : {
          left: offset,
        };

  return (
    <span
      className={
        side === "top"
          ? "absolute -top-1.5 size-3 -translate-x-1/2 rotate-45 border-l border-t border-white/75 bg-white/78 backdrop-blur-xl"
          : side === "bottom"
            ? "absolute -bottom-1.5 size-3 -translate-x-1/2 rotate-45 border-b border-r border-white/75 bg-white/72 backdrop-blur-xl"
            : "absolute -right-1.5 size-3 -translate-y-1/2 rotate-45 border-r border-t border-white/75 bg-white/74 backdrop-blur-xl"
      }
      style={style}
      aria-hidden="true"
    />
  );
}

function HintCard({
  hintId,
  copy,
  position,
  cardRef,
  onDismiss,
}: {
  hintId: HintId;
  copy: HintCopy;
  position: HintPosition;
  cardRef: (node: HTMLDivElement | null) => void;
  onDismiss: () => void;
}) {
  return (
    <aside
      ref={cardRef}
      data-guide-card={hintId}
      className="fixed z-[70] max-h-[min(19rem,calc(100vh-2rem))] w-[min(21.5rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/80 bg-white/68 p-4 text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.96),0_22px_60px_rgba(46,61,82,.18),0_0_34px_rgba(126,217,255,.17)] backdrop-blur-[38px] backdrop-saturate-150 motion-safe:animate-fade-in max-[430px]:p-3.5"
      style={{ top: position.top, left: position.left }}
      role="status"
    >
      <GuideArrow side={position.arrowSide} offset={position.arrowOffset} />
      <div className="relative z-[1] flex items-start gap-3">
        <div className="mt-1 size-2.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_0_5px_rgba(0,122,255,.12),0_0_18px_rgba(0,185,255,.42)]" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{copy.eyebrow}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.body}</p>
        </div>
        <button
          type="button"
          aria-label={copy.closeLabel}
          className="-mr-1 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-neutral-500 outline-none transition hover:bg-white/70 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-blue-500/45"
          onClick={onDismiss}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

export function PortfolioGuidedHints({ language }: { language: LanguageCode }) {
  const [visible, setVisible] = useState(false);
  const [positions, setPositions] = useState<Record<HintId, HintPosition | null>>({
    language: null,
    sections: null,
  });
  const cardRefs = useRef<Record<HintId, HTMLDivElement | null>>({
    language: null,
    sections: null,
  });
  const copy = useMemo(() => hintCopyByLanguage[language], [language]);

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(hintStorageKey, "true");
    } catch {
      // Session storage is a convenience only; dismissal should still work.
    }

    setVisible(false);
  }, []);

  const updatePositions = useCallback(() => {
    setPositions({
      language: getLanguagePosition(cardRefs.current.language),
      sections: getSectionsPosition(cardRefs.current.sections),
    });
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(hintStorageKey) === "true") {
        return;
      }
    } catch {
      // If storage is unavailable, show the hints for this render cycle.
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let frame = window.requestAnimationFrame(updatePositions);

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updatePositions);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;

      if (cardRefs.current.language?.contains(target) || cardRefs.current.sections?.contains(target)) {
        return;
      }

      dismiss();
    };

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate);
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [dismiss, updatePositions, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    updatePositions();
  }, [language, updatePositions, visible]);

  if (!visible || !positions.language || !positions.sections) {
    return null;
  }

  return (
    <>
      <HintCard
        hintId="language"
        copy={copy.language}
        position={positions.language}
        cardRef={(node) => {
          cardRefs.current.language = node;
        }}
        onDismiss={dismiss}
      />
      <HintCard
        hintId="sections"
        copy={copy.sections}
        position={positions.sections}
        cardRef={(node) => {
          cardRefs.current.sections = node;
        }}
        onDismiss={dismiss}
      />
    </>
  );
}
