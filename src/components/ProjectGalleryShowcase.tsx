import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ProjectHighlightStack, type HighlightCard } from "@/components/ProjectHighlightStack";
import { type CaseStudy, type PortfolioContent, type Project, type ProjectShowcaseCopy } from "@/data/portfolio";

const showcaseFallbackCopy: ProjectShowcaseCopy = {
  eyebrow: "Featured work",
  description: "Drag, swipe or use the arrows to move through the projects.",
  focusLabel: "Focus areas",
  dragHint: "Drag to shuffle",
  prevLabel: "Previous project",
  nextLabel: "Next project",
  slideLabel: "Go to project",
  caseStudyCta: "Read case study",
  exploreCta: "View on GitHub",
};

type ShowcaseItem = {
  project: Project;
  study?: CaseStudy;
  heroSrc?: string;
  heroAlt?: string;
};

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}?v=20260621`;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCarouselControls(cardCount: number) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(cardCount > 1);

  const updateState = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const maxScroll = track.scrollWidth - track.clientWidth;
    const firstCard = track.firstElementChild instanceof HTMLElement ? track.firstElementChild : null;
    const itemWidth = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth;
    const nextIndex = Math.min(cardCount - 1, Math.max(0, Math.round(track.scrollLeft / itemWidth)));
    setActiveIndex(nextIndex);
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = (index: number) => {
    const target = trackRef.current?.children.item(index);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest", inline: "start" });
    }
  };

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    let currentIndex = activeIndex;
    if (track) {
      const firstCard = track.firstElementChild instanceof HTMLElement ? track.firstElementChild : null;
      const itemWidth = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth;
      currentIndex = Math.min(cardCount - 1, Math.max(0, Math.round(track.scrollLeft / itemWidth)));
    }
    scrollToIndex(Math.min(cardCount - 1, Math.max(0, currentIndex + direction)));
  };

  return { activeIndex, canScrollNext, canScrollPrev, scrollByPage, scrollToIndex, trackRef, updateState };
}

function ShowcaseCover({ item }: { item: ShowcaseItem }) {
  if (item.heroSrc) {
    return (
      <div className="relative h-[210px] overflow-hidden border-b border-white/55 bg-[radial-gradient(circle_at_25%_18%,rgba(0,122,255,.18),transparent_42%),radial-gradient(circle_at_82%_88%,rgba(21,214,180,.18),transparent_46%),linear-gradient(135deg,rgba(255,255,255,.5),rgba(236,245,251,.7))]">
        <span className="pointer-events-none absolute -inset-16 z-[1] translate-x-[-58%] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)] blur-sm transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/gallery-card:translate-x-[58%]" />
        <div className="apple-inner-curve absolute inset-4 z-[2] flex items-center justify-center overflow-hidden border border-white/70 bg-white/80 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_16px_40px_rgba(46,61,82,.12)]">
          <img
            className="media-fade-in max-h-full max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/gallery-card:scale-[1.04]"
            src={assetUrl(item.heroSrc)}
            alt={item.heroAlt ?? item.project.title}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid h-[210px] place-content-center overflow-hidden border-b border-white/55 bg-[radial-gradient(circle_at_72%_24%,rgba(0,122,255,.2),transparent_40%),radial-gradient(circle_at_14%_82%,rgba(21,214,180,.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.5),rgba(236,245,251,.7))]">
      <span className="pointer-events-none absolute -inset-16 z-[1] translate-x-[-58%] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)] blur-sm transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/gallery-card:translate-x-[58%]" />
      <span className="apple-inner-curve relative z-[2] flex size-16 items-center justify-center border border-white/70 bg-white/55 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_12px_28px_rgba(40,56,76,.1)] backdrop-blur-2xl transition-transform duration-700 ease-out group-hover/gallery-card:-translate-y-1">
        <Code2 className="size-7" aria-hidden="true" />
      </span>
    </div>
  );
}

function ShowcaseCard({ item, copy }: { item: ShowcaseItem; copy: ProjectShowcaseCopy }) {
  const { project, study } = item;
  const eyebrow = study?.eyebrow ?? project.tags[0];
  const headlineMetrics = study?.metrics.slice(0, 2) ?? [];

  return (
    <article className="snap-start shrink-0 pl-5 first:pl-0">
      <LiquidGlass className="group/gallery-card flex h-full min-h-[540px] w-[min(85vw,330px)] flex-col overflow-hidden p-0 transition-transform duration-500 ease-out hover:-translate-y-1 sm:w-[360px] lg:w-[396px]">
        <div className="relative z-[1] flex h-full flex-col">
          <ShowcaseCover item={item} />

          <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
            <div>
              {eyebrow ? (
                <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>
              ) : null}
              <h3 className="apple-display-text mt-2 text-[1.2rem] leading-snug text-neutral-950">{project.title}</h3>
              <p className="mt-3 line-clamp-3 text-[0.92rem] leading-7 text-neutral-600">{project.summary}</p>
            </div>

            {headlineMetrics.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {headlineMetrics.map((metric) => (
                  <div key={metric.label} className="border-t border-white/55 pt-3">
                    <span className="apple-display-text block text-[clamp(1.15rem,2vw,1.5rem)] leading-none text-neutral-950">
                      {metric.value}
                    </span>
                    <span className="mt-1.5 block text-[0.72rem] leading-5 text-neutral-500">{metric.label}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-1">
              {project.caseStudyId ? (
                <Button asChild variant="glass" size="sm" className="group/cta gap-1.5">
                  <a href={`#case-${project.caseStudyId}`}>
                    {copy.caseStudyCta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {project.href ? (
                <Button asChild variant="glass" size="sm" className="gap-1.5">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.caseStudyId ? <ExternalLink className="size-4" aria-hidden="true" /> : copy.exploreCta}
                    {project.caseStudyId ? null : <ArrowUpRight className="size-4" aria-hidden="true" />}
                  </a>
                </Button>
              ) : null}
              {!project.caseStudyId && !project.href ? (
                <Button asChild variant="glass" size="sm">
                  <a href="#contact">{copy.exploreCta}</a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </LiquidGlass>
    </article>
  );
}

export function ProjectGalleryShowcase({ content }: { content: PortfolioContent }) {
  const copy = content.projectShowcase ?? showcaseFallbackCopy;
  const studyById = new Map(content.caseStudies.map((study) => [study.id, study]));

  const items: ShowcaseItem[] = content.projects.map((project) => {
    const study = project.caseStudyId ? studyById.get(project.caseStudyId) : undefined;
    const hero = study?.screenshots[0];
    return { project, study, heroSrc: hero?.src, heroAlt: hero?.alt };
  });

  const highlightItems: HighlightCard[] = items
    .filter((item) => item.study)
    .map((item) => ({
      id: item.study!.id,
      eyebrow: item.study!.eyebrow,
      title: item.project.title,
      metricValue: item.study!.metrics[0]?.value,
      metricLabel: item.study!.metrics[0]?.label,
      summary: item.project.summary,
      href: `#case-${item.study!.id}`,
    }));

  const controls = useCarouselControls(items.length);

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{copy.eyebrow}</p>
          <p className="mt-4 text-[0.98rem] leading-8 text-neutral-600 md:text-base">{copy.description}</p>
          <div className="mt-7 flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                className="liquid-glow-button flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/55 text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_12px_34px_rgba(46,61,82,.12)] backdrop-blur-[34px] transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-45"
                onClick={() => controls.scrollByPage(-1)}
                disabled={!controls.canScrollPrev}
                aria-label={copy.prevLabel}
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="liquid-glow-button flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/55 text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_12px_34px_rgba(46,61,82,.12)] backdrop-blur-[34px] transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-45"
                onClick={() => controls.scrollByPage(1)}
                disabled={!controls.canScrollNext}
                aria-label={copy.nextLabel}
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
            <span className="text-sm font-medium tabular-nums text-neutral-500">
              {String(controls.activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {highlightItems.length > 0 ? (
          <div className="hidden lg:block">
            <p className="mb-5 text-xs font-semibold uppercase tracking-normal text-blue-600">{copy.focusLabel}</p>
            <ProjectHighlightStack items={highlightItems} dragHint={copy.dragHint} ctaLabel={copy.caseStudyCta} />
          </div>
        ) : null}
      </div>

      <div
        ref={controls.trackRef}
        className="award-preview-track -mx-8 mt-10 flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth px-8 pb-10 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={controls.updateState}
      >
        {items.map((item) => (
          <ShowcaseCard key={item.project.title} item={item} copy={copy} />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.project.title}
            type="button"
            aria-label={`${copy.slideLabel} ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              controls.activeIndex === index ? "w-8 bg-neutral-950" : "w-2.5 bg-neutral-950/20 hover:bg-neutral-950/40"
            }`}
            onClick={() => controls.scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
