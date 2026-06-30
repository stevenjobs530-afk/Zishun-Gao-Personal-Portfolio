import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export function HelloIntro({ onComplete }: { onComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasReportedComplete = useRef(false);
  const introSpeed = useRef(
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches ? 0.68 : 0.82,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (isComplete) return;

    const shouldShortCircuit = prefersReducedMotion;
    const timer = window.setTimeout(
      () => setIsComplete(true),
      shouldShortCircuit ? 420 : 3800,
    );

    return () => window.clearTimeout(timer);
  }, [isComplete, prefersReducedMotion]);

  const shouldShortCircuit = prefersReducedMotion;
  const handleExitComplete = useCallback(() => {
    if (!isComplete || hasReportedComplete.current) {
      return;
    }

    hasReportedComplete.current = true;
    onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!isComplete ? (
          <motion.div
            className="hello-intro-shell fixed inset-0 z-50 grid place-items-center overflow-hidden px-6 pt-[env(safe-area-inset-top)] backdrop-blur-2xl max-sm:backdrop-blur-md"
            exit={{ opacity: 0, scale: 1.015, filter: "blur(6px)" }}
            transition={{ duration: shouldShortCircuit ? 0.22 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Liquid-glass atmosphere: soft blurred rainbow caustics that echo the site background */}
            <div className="hello-rainbow-glow hello-rainbow-glow-one" aria-hidden="true" />
            <div className="hello-rainbow-glow hello-rainbow-glow-two" aria-hidden="true" />
            <div className="hello-rainbow-glow hello-rainbow-glow-three" aria-hidden="true" />
            <div className="relative w-[min(92vw,56rem)]">
              <div className="pointer-events-none absolute inset-x-[6%] top-1/2 h-24 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.85),transparent_70%)] blur-2xl" />
              <AppleHelloEnglishEffect
                className="relative h-auto w-full"
                tone="rainbow"
                speed={shouldShortCircuit ? 0 : introSpeed.current}
                drawn={shouldShortCircuit}
                onAnimationComplete={() => setIsComplete(true)}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed left-1/2 top-4 z-40 hidden w-40 -translate-x-1/2 text-neutral-950 lg:block"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-hidden={!isComplete}
      >
        <AppleHelloEnglishEffect className="h-auto w-full" drawn />
      </motion.div>
    </>
  );
}
