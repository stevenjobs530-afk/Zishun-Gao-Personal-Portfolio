import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useDisableReveal } from "@/components/ui/text-animations";

type Animated3DCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
};

const spring = { stiffness: 360, damping: 32, mass: 0.65 };

export function Animated3DCard({
  children,
  className,
  delay = 0,
  intensity = 8,
}: Animated3DCardProps) {
  const disableMotion = useDisableReveal();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXBase = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateYBase = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useSpring(rotateXBase, spring);
  const rotateY = useSpring(rotateYBase, spring);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["18%", "82%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["18%", "82%"]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,.7), rgba(126,217,255,.18) 28%, transparent 58%)`;

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disableMotion) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [disableMotion, mouseX, mouseY],
  );

  const handleMouseLeave = React.useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  if (disableMotion) {
    return (
      <div className={cn("group/animated-card relative h-full", className)}>
        <div className="relative h-full">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("group/animated-card relative h-full [perspective:1400px]", className)}
      initial={{ opacity: 0, y: 34, rotateX: -8, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full transform-gpu"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -5 }}
        transition={spring}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover/animated-card:opacity-100"
          style={{ background: glow }}
          aria-hidden="true"
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
