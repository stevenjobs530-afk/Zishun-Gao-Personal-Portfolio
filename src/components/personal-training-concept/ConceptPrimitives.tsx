import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.99 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.64, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionCopy({
  label,
  title,
  body,
  className = "",
}: {
  label: string;
  title: ReactNode;
  body: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pt-section-copy ${className}`}>
      <p className="pt-section-label">{label}</p>
      <h2>{title}</h2>
      <div className="pt-section-body">{body}</div>
    </div>
  );
}

export function GlassPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pt-glass-panel ${className}`}>{children}</div>;
}

export function ConceptNotice({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`pt-concept-notice ${className}`} role="note">
      <span aria-hidden="true">i</span>
      <p>{children}</p>
    </div>
  );
}
