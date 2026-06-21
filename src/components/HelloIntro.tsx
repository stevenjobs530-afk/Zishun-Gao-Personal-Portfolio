import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export function HelloIntro() {
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)").matches : false,
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
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsSmallScreen(media.matches);

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

    const shouldShortCircuit = prefersReducedMotion || isSmallScreen;
    const timer = window.setTimeout(
      () => setIsComplete(true),
      shouldShortCircuit ? 420 : 3800,
    );

    return () => window.clearTimeout(timer);
  }, [isComplete, isSmallScreen, prefersReducedMotion]);

  const shouldShortCircuit = prefersReducedMotion || isSmallScreen;

  return (
    <>
      <AnimatePresence>
        {!isComplete ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-white/80 px-6 pt-[env(safe-area-inset-top)] backdrop-blur-2xl max-sm:bg-white/70 max-sm:backdrop-blur-md"
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: shouldShortCircuit ? 0.22 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-x-12 top-1/2 h-20 -translate-y-1/2 rounded-full bg-yellow-200/35 blur-3xl" />
              <AppleHelloEnglishEffect
                className="relative h-auto w-full text-neutral-950 drop-shadow-[0_22px_42px_rgba(46,61,82,.14)]"
                speed={shouldShortCircuit ? 0 : 0.82}
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
