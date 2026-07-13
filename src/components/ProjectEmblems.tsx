import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Decorative project emblems:
 * - uk-retail        → waving Union Jack (drawn SVG)
 * - apple-app-store  → official App Store icon image if present, else drawn fallback
 * - aep              → University of Bristol crest as a waving banner if present,
 *                      else drawn "UNIVERSITY OF BRISTOL" fallback flag
 *
 * Drop the official artwork into `public/project-assets/emblems/`:
 *   app-store-clean.png (transparent square icon artwork)
 *   bristol-crest.png  (crest on white/transparent)
 *
 * Motion layers (all skipped under prefers-reduced-motion):
 * 1. SVG feTurbulence + feDisplacementMap ripple, slowly morphing (flags only),
 * 2. a CSS sheen travelling across the cloth (`.emblem-flag-shade`, flags only),
 * 3. a gentle whole-flag sway anchored at the hoist (`.emblem-flag`),
 * 4. a scroll-driven glint: as the page scrolls, a soft light band sweeps
 *    across every emblem, tied to its position in the viewport.
 */

type EmblemSize = "sm" | "lg";

function emblemAssetPath(file: string) {
  return `${import.meta.env.BASE_URL}project-assets/emblems/${file}`;
}

function useFlagFilter() {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduceMotion = useReducedMotion();

  const filter = reduceMotion ? null : (
    <filter id={id} x="-8%" y="-14%" width="116%" height="128%">
      <feTurbulence type="fractalNoise" baseFrequency="0.011 0.05" numOctaves="2" seed="4" result="ripple">
        <animate
          attributeName="baseFrequency"
          dur="9s"
          values="0.011 0.05;0.015 0.066;0.011 0.05"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="ripple" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );

  return { id, filter, animated: !reduceMotion };
}

/** Scroll-linked glint position: sweeps as the emblem travels through the viewport. */
function useScrollGlint(ref: React.RefObject<HTMLElement | null>): {
  x: MotionValue<string> | string;
  animated: boolean;
} {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-160%", "260%"]);

  return { x: reduceMotion ? "-160%" : x, animated: !reduceMotion };
}

function ScrollGlint({ x }: { x: MotionValue<string> | string }) {
  return (
    <motion.span
      className="emblem-glint absolute inset-y-[-30%] left-0 w-[46%] rounded-[inherit]"
      style={{ x }}
      aria-hidden="true"
    />
  );
}

function MaskedScrollGlint({ src, x }: { src: string; x: MotionValue<string> | string }) {
  const maskImage = `url("${src}")`;

  return (
    <span
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
      aria-hidden="true"
    >
      <ScrollGlint x={x} />
    </span>
  );
}

function FlagShell({
  size,
  className,
  aspect = "wide",
  children,
}: {
  size: EmblemSize;
  className?: string;
  aspect?: "wide" | "square";
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const glint = useScrollGlint(ref);
  const width =
    aspect === "wide"
      ? size === "sm"
        ? "w-11"
        : "w-[3.6rem]"
      : size === "sm"
        ? "w-9"
        : "w-12";

  return (
    <span
      ref={ref}
      className={cn(
        "emblem-flag relative inline-block shrink-0 overflow-hidden rounded-[5px] shadow-[0_6px_16px_rgba(46,61,82,.28),0_1px_3px_rgba(46,61,82,.2)]",
        width,
        className,
      )}
      aria-hidden="true"
    >
      {children}
      <span className="emblem-flag-shade absolute inset-0 rounded-[inherit]" />
      <ScrollGlint x={glint.x} />
    </span>
  );
}

export function UnionJackFlag({ size = "sm", className }: { size?: EmblemSize; className?: string }) {
  const { id, filter, animated } = useFlagFilter();
  const clipId = `${id}clip`;

  return (
    <FlagShell size={size} className={className}>
      <svg viewBox="0 0 60 36" className="block h-auto w-full" role="presentation" focusable="false">
        <defs>
          {filter}
          <clipPath id={clipId}>
            <path d="M30,18 h30 v18 z v18 h-30 z h-30 v-18 z v-18 h30 z" />
          </clipPath>
        </defs>
        <g filter={animated ? `url(#${id})` : undefined}>
          <rect width="60" height="36" fill="#012169" />
          <path d="M0,0 L60,36 M60,0 L0,36" stroke="#ffffff" strokeWidth="7.2" />
          <path d="M0,0 L60,36 M60,0 L0,36" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4.8" />
          <path d="M30,0 V36 M0,18 H60" stroke="#ffffff" strokeWidth="12" />
          <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="7.2" />
        </g>
      </svg>
    </FlagShell>
  );
}

/**
 * A raster logo rendered as waving cloth: the image sits inside an SVG so the
 * same displacement filter can ripple its pixels. Falls back to `fallback`
 * when the image asset is missing from public/project-assets/emblems/.
 */
function ImageFlag({
  src,
  size,
  className,
  background = "#ffffff",
  imagePlacement = { x: 3, y: 3, width: 54, height: 54 },
  fallback,
}: {
  src: string;
  size: EmblemSize;
  className?: string;
  background?: string;
  imagePlacement?: { x: number; y: number; width: number; height: number };
  fallback: React.ReactNode;
}) {
  const { id, filter, animated } = useFlagFilter();
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    const probe = new Image();
    probe.onerror = () => setMissing(true);
    probe.src = src;
  }, [src]);

  if (missing) {
    return <>{fallback}</>;
  }

  return (
    <FlagShell size={size} className={className} aspect="square">
      <svg viewBox="0 0 60 60" className="block h-auto w-full" role="presentation" focusable="false">
        <defs>{filter}</defs>
        <g filter={animated ? `url(#${id})` : undefined}>
          <rect width="60" height="60" fill={background} />
          <image
            href={src}
            x={imagePlacement.x}
            y={imagePlacement.y}
            width={imagePlacement.width}
            height={imagePlacement.height}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </FlagShell>
  );
}

export function BristolCrestFlag({ size = "sm", className }: { size?: EmblemSize; className?: string }) {
  return (
    <ImageFlag
      src={emblemAssetPath("bristol-crest.png")}
      size={size}
      className={className}
      background="#ffffff"
      fallback={<BristolFallbackFlag size={size} className={className} />}
    />
  );
}

function BristolFallbackFlag({ size = "sm", className }: { size?: EmblemSize; className?: string }) {
  const { id, filter, animated } = useFlagFilter();

  return (
    <FlagShell size={size} className={className}>
      <svg viewBox="0 0 60 36" className="block h-auto w-full" role="presentation" focusable="false">
        <defs>
          {filter}
          <linearGradient id={`${id}field`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C11F33" />
            <stop offset="1" stopColor="#9B1626" />
          </linearGradient>
        </defs>
        <g filter={animated ? `url(#${id})` : undefined}>
          <rect width="60" height="36" fill={`url(#${id}field)`} />
          <g stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M23 10.5 Q27 8.6 30 10.5 Q33 8.6 37 10.5 V16.2 Q33 14.4 30 16.2 Q27 14.4 23 16.2 Z" />
            <path d="M30 10.5 V16.2" />
          </g>
          <text
            x="30"
            y="24.4"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'SF Pro Display', -apple-system, 'Helvetica Neue', Arial, sans-serif"
            fontSize="3.1"
            fontWeight="600"
            letterSpacing="1.35"
          >
            UNIVERSITY OF
          </text>
          <text
            x="30"
            y="30.6"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'SF Pro Display', -apple-system, 'Helvetica Neue', Arial, sans-serif"
            fontSize="5.4"
            fontWeight="700"
            letterSpacing="1.9"
          >
            BRISTOL
          </text>
        </g>
      </svg>
    </FlagShell>
  );
}

export function AppStoreEmblem({ size = "sm", className }: { size?: EmblemSize; className?: string }) {
  const src = emblemAssetPath("app-store-clean.png");
  const { id, filter, animated } = useFlagFilter();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const glint = useScrollGlint(ref);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    const probe = new Image();
    probe.onerror = () => setMissing(true);
    probe.src = src;
  }, [src]);

  if (missing) {
    return <AppStoreFallbackMark size={size} className={className} />;
  }

  return (
    <span
      ref={ref}
      className={cn(
        "emblem-flag emblem-app-icon relative inline-block shrink-0 overflow-hidden rounded-[22.5%]",
        size === "sm" ? "w-9" : "w-12",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 60" className="block h-auto w-full" role="presentation" focusable="false">
        <defs>{filter}</defs>
        <image
          href={src}
          x="0"
          y="0"
          width="60"
          height="60"
          preserveAspectRatio="xMidYMid meet"
          filter={animated ? `url(#${id})` : undefined}
        />
      </svg>
      <MaskedScrollGlint src={src} x={glint.x} />
    </span>
  );
}

function AppStoreFallbackMark({ size = "sm", className }: { size?: EmblemSize; className?: string }) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const glint = useScrollGlint(ref);

  return (
    <span
      ref={ref}
      className={cn(
        "emblem-app-icon relative inline-block shrink-0 overflow-hidden rounded-[22.5%]",
        size === "sm" ? "w-9" : "w-12",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 60" className="block h-auto w-full" role="presentation" focusable="false">
        <defs>
          <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2BC9FB" />
            <stop offset="1" stopColor="#1D6FF2" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="57" height="57" rx="13.5" fill={`url(#${id}bg)`} />
        <rect x="1.5" y="1.5" width="57" height="57" rx="13.5" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
        <g stroke="#ffffff" strokeWidth="4.6" strokeLinecap="round" fill="none">
          <path d="M30 14.5 L16.8 41" />
          <path d="M30 14.5 L43.2 41" />
          <path d="M12.5 33.4 H47.5" />
        </g>
      </svg>
      <ScrollGlint x={glint.x} />
    </span>
  );
}

const emblemByCaseStudyId: Record<string, React.ComponentType<{ size?: EmblemSize; className?: string }>> = {
  "uk-retail": UnionJackFlag,
  "apple-app-store": AppStoreEmblem,
  aep: BristolCrestFlag,
};

export function ProjectEmblem({
  caseStudyId,
  size = "sm",
  className,
}: {
  caseStudyId?: string;
  size?: EmblemSize;
  className?: string;
}) {
  if (!caseStudyId) {
    return null;
  }

  const Emblem = emblemByCaseStudyId[caseStudyId];

  return Emblem ? <Emblem size={size} className={className} /> : null;
}
