import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export function HelloIntro() {
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isComplete) return;

    const timer = window.setTimeout(
      () => setIsComplete(true),
      prefersReducedMotion ? 350 : 3800,
    );

    return () => window.clearTimeout(timer);
  }, [isComplete, prefersReducedMotion]);

  return (
    <>
      <AnimatePresence>
        {!isComplete ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-white/80 px-6 backdrop-blur-2xl"
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-x-12 top-1/2 h-20 -translate-y-1/2 rounded-full bg-yellow-200/35 blur-3xl" />
              <AppleHelloEnglishEffect
                className="relative h-auto w-full text-neutral-950 drop-shadow-[0_22px_42px_rgba(46,61,82,.14)]"
                speed={prefersReducedMotion ? 0 : 0.82}
                drawn={prefersReducedMotion}
                onAnimationComplete={() => setIsComplete(true)}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed left-1/2 top-3 z-40 w-32 -translate-x-1/2 text-neutral-950 sm:top-4 sm:w-40"
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
