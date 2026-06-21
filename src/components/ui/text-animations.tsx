import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const viewport = { once: true, amount: 0.28, margin: "-70px" };
const ease = [0.22, 1, 0.36, 1] as const;
const smallScreenQuery = "(max-width: 1023px)";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function getMediaQueryMatches(query: string) {
  return typeof window !== "undefined" ? window.matchMedia(query).matches : false;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(() => getMediaQueryMatches(query));

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

export function useDisableReveal() {
  const reduceMotion = useReducedMotion();
  const isSmallScreen = useMediaQuery(smallScreenQuery);
  const [isObserverUnsupported, setIsObserverUnsupported] = React.useState(
    () => typeof IntersectionObserver === "undefined",
  );

  React.useEffect(() => {
    setIsObserverUnsupported(typeof IntersectionObserver === "undefined");
  }, []);

  return Boolean(reduceMotion || isSmallScreen || isObserverUnsupported);
}

export function RevealBlock({ children, className, delay = 0 }: RevealProps) {
  const disableReveal = useDisableReveal();

  if (disableReveal) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function RevealArticle({ children, className, delay = 0 }: RevealProps) {
  const disableReveal = useDisableReveal();

  if (disableReveal) {
    return <article className={className}>{children}</article>;
  }

  return (
    <motion.article
      className={cn("will-change-transform", className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </motion.article>
  );
}

export function RevealListItem({ children, className, delay = 0 }: RevealProps) {
  const disableReveal = useDisableReveal();

  if (disableReveal) {
    return <li className={className}>{children}</li>;
  }

  return (
    <motion.li
      className={cn("will-change-transform", className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </motion.li>
  );
}

export function StaggerBlock({ children, className, delay = 0 }: RevealProps) {
  const disableReveal = useDisableReveal();

  if (disableReveal) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.09,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Omit<RevealProps, "delay">) {
  const disableReveal = useDisableReveal();

  if (disableReveal) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn("will-change-transform", className)} variants={revealVariants} transition={{ duration: 0.72, ease }}>
      {children}
    </motion.div>
  );
}
