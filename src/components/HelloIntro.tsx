import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";
import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function HelloIntro({ onComplete }: { onComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const hasReportedComplete = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const introSpeed = useRef(
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches ? 0.68 : 0.82,
  );

  // Pointer-driven liquid-glass lighting. Raw pointer position (normalised to the
  // word's box, [-1, 1]) is spring-smoothed so the light, glint, and shadow drift
  // gently rather than snapping — the "real-time but calm" Apple feel.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glintLevel = useMotionValue(0);
  const springConfig = { stiffness: 110, damping: 22, mass: 0.6 } as const;
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);
  const smoothGlint = useSpring(glintLevel, { stiffness: 90, damping: 24, mass: 0.5 });

  const lightX = useTransform(smoothX, (v) => `${50 + v * 16}%`);
  const lightY = useTransform(smoothY, (v) => `${14 + v * 7}%`);
  const shadowX = useTransform(smoothX, (v) => `${v * -13}px`);
  const shadowY = useTransform(smoothY, (v) => `${15 - v * 5}px`);
  const shadowBlur = useTransform(smoothY, (v) => `${24 + Math.abs(v) * 4}px`);
  const glintX = useTransform(smoothX, (v) => `${50 + v * 38}%`);
  const glintY = useTransform(smoothY, (v) => `${36 + v * 26}%`);

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
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setPointerFine(media.matches);

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
  // Only track the pointer for fine pointers (mouse/trackpad) and when the user
  // has not asked for reduced motion. Touch + reduced-motion get a stable sheen.
  const interactive = pointerFine && !prefersReducedMotion;

  const handleExitComplete = useCallback(() => {
    if (!isComplete || hasReportedComplete.current) {
      return;
    }

    hasReportedComplete.current = true;
    onComplete?.();
  }, [isComplete, onComplete]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      pointerX.set(clamp(nx, -1, 1));
      pointerY.set(clamp(ny, -1, 1));

      // Brightest glint near the word, with a faint always-on reflection while the
      // pointer is anywhere over the intro.
      const proximity = clamp(1 - Math.hypot(nx, ny) / 1.6, 0, 1);
      glintLevel.set(0.12 + proximity * 0.42);
    },
    [pointerX, pointerY, glintLevel],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
    glintLevel.set(0);
  }, [pointerX, pointerY, glintLevel]);

  const stageStyle = interactive
    ? ({
        "--hello-light-x": lightX,
        "--hello-light-y": lightY,
        "--hello-shadow-x": shadowX,
        "--hello-shadow-y": shadowY,
        "--hello-shadow-blur": shadowBlur,
        "--hello-glint-x": glintX,
        "--hello-glint-y": glintY,
        "--hello-glint-opacity": smoothGlint,
      } as unknown as CSSProperties)
    : undefined;

  return (
    <>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!isComplete ? (
          <motion.div
            className="hello-intro-shell fixed inset-0 z-50 grid place-items-center overflow-hidden px-6 pt-[env(safe-area-inset-top)] backdrop-blur-2xl max-sm:backdrop-blur-md"
            exit={{ opacity: 0, scale: 1.015, filter: "blur(6px)" }}
            transition={{ duration: shouldShortCircuit ? 0.22 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            onPointerMove={interactive ? handlePointerMove : undefined}
            onPointerLeave={interactive ? handlePointerLeave : undefined}
          >
            {/* Liquid-glass atmosphere: soft blurred rainbow caustics that echo the site background */}
            <div className="hello-rainbow-glow hello-rainbow-glow-one" aria-hidden="true" />
            <div className="hello-rainbow-glow hello-rainbow-glow-two" aria-hidden="true" />
            <div className="hello-rainbow-glow hello-rainbow-glow-three" aria-hidden="true" />
            <motion.div
              ref={stageRef}
              className={cn(
                "hello-light-stage relative w-[min(92vw,56rem)]",
                !interactive && "hello-light-stage--static",
              )}
              style={stageStyle}
            >
              {/* Overhead light pooling from above + pointer-tracked glass glint */}
              <div className="hello-overhead-light" aria-hidden="true" />
              {/* Colored light spilling from the glass onto the background, mirroring
                  the left-to-right spectrum of the word (kept soft + localized). */}
              <div className="hello-color-spill" aria-hidden="true" />
              <AppleHelloEnglishEffect
                className="hello-glass-mark relative z-[1] h-auto w-full"
                tone="rainbow"
                speed={shouldShortCircuit ? 0 : introSpeed.current}
                drawn={shouldShortCircuit}
                onAnimationComplete={() => setIsComplete(true)}
              />
              <div className="hello-glint" aria-hidden="true" />
            </motion.div>
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
