import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Compass, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LanguageCode } from "@/data/portfolio";

const allSectionIds = ["top", "about", "projects", "case-studies", "experience", "skills", "education", "contact"] as const;

type SectionId = (typeof allSectionIds)[number];

type SectionItem = {
  id: SectionId;
  label: string;
};

type SectionNavigatorProps = {
  language: LanguageCode;
};

const sectionIdsByLanguage = {
  en: ["top", "about", "projects", "case-studies", "experience", "skills", "education", "contact"],
  "zh-CN": ["top", "education", "case-studies", "projects", "experience", "skills", "about", "contact"],
} as const satisfies Record<LanguageCode, readonly SectionId[]>;

const sectionLabelsByLanguage: Record<LanguageCode, Record<SectionId, string>> = {
  en: {
    top: "Home",
    about: "About",
    projects: "Projects",
    "case-studies": "Case Studies",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  "zh-CN": {
    top: "首页",
    about: "关于我",
    projects: "项目",
    "case-studies": "案例",
    experience: "经历",
    skills: "技能",
    education: "教育",
    contact: "联系",
  },
};

function getSectionItems(language: LanguageCode): SectionItem[] {
  return sectionIdsByLanguage[language].map((sectionId) => ({
    id: sectionId,
    label: sectionLabelsByLanguage[language][sectionId],
  }));
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollActiveSection(sectionIds: readonly SectionId[]): SectionId {
  if (typeof window === "undefined") {
    return "top";
  }

  const marker = Math.min(window.innerHeight * 0.5, 420);
  let activeSection: SectionId = "top";

  for (const sectionId of sectionIds) {
    const element = document.getElementById(sectionId);

    if (element && element.getBoundingClientRect().top <= marker) {
      activeSection = sectionId;
    }
  }

  const pageBottom = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (documentHeight - pageBottom < Math.max(220, window.innerHeight * 0.22)) {
    return "contact";
  }

  return activeSection;
}

function getSectionScrollOffset(sectionId: SectionId) {
  return sectionId === "top" ? 0 : 110;
}

function scrollSectionIntoView(target: HTMLElement, sectionId: SectionId, behavior: ScrollBehavior) {
  window.scrollTo({
    top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - getSectionScrollOffset(sectionId)),
    behavior,
  });
}

export function SectionNavigator({ language }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionItems = useMemo(() => getSectionItems(language), [language]);
  const activeSectionIds = useMemo(() => sectionIdsByLanguage[language], [language]);
  const panelId = "section-navigator-mobile-panel";
  const navigationLabel = language === "zh-CN" ? "页面章节导航" : "Section navigation";
  const mobilePrompt = language === "zh-CN" ? "章节" : "Sections";

  const setActiveIfChanged = useCallback((nextSection: SectionId) => {
    setActiveSection((currentSection) => (currentSection === nextSection ? currentSection : nextSection));
  }, []);

  const scrollToSection = useCallback(
    (sectionId: SectionId) => {
      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      const behavior = prefersReducedMotion() ? "auto" : "smooth";

      scrollSectionIntoView(target, sectionId, behavior);

      if (behavior === "smooth") {
        window.setTimeout(() => {
          const remainingOffset = target.getBoundingClientRect().top - getSectionScrollOffset(sectionId);

          if (Math.abs(remainingOffset) > 24) {
            window.scrollTo({
              top: Math.max(0, window.scrollY + remainingOffset),
              behavior: "auto",
            });
          }
        }, 700);
      }

      setActiveIfChanged(sectionId);
      setMobileOpen(false);

      window.history.replaceState(null, "", `#${sectionId}`);
    },
    [setActiveIfChanged],
  );

  useEffect(() => {
    const updateFromScroll = () => setActiveIfChanged(getScrollActiveSection(activeSectionIds));
    let animationFrame = 0;

    const scheduleScrollUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateFromScroll();
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate);

    const observedEntries = new Map<SectionId, IntersectionObserverEntry>();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                observedEntries.set(entry.target.id as SectionId, entry);
              }

              const visibleEntry = activeSectionIds
                .map((sectionId) => observedEntries.get(sectionId))
                .filter((entry): entry is IntersectionObserverEntry => Boolean(entry?.isIntersecting))
                .sort((first, second) => Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top))[0];

              if (visibleEntry) {
                setActiveIfChanged(visibleEntry.target.id as SectionId);
              }
            },
            {
              rootMargin: "-35% 0px -55% 0px",
              threshold: [0, 0.1, 0.35],
            },
          );

    if (observer) {
      for (const sectionId of activeSectionIds) {
        const element = document.getElementById(sectionId);

        if (element) {
          observer.observe(element);
        }
      }
    }

    return () => {
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      observer?.disconnect();
    };
  }, [activeSectionIds, setActiveIfChanged]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block" aria-label={navigationLabel}>
        <div className="group flex w-16 flex-col items-stretch gap-1.5 overflow-hidden rounded-[2rem] border border-white/80 bg-white/58 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.96),0_18px_55px_rgba(46,61,82,.16),0_0_32px_rgba(126,217,255,.16)] backdrop-blur-[34px] backdrop-saturate-150 transition-[width] duration-300 ease-out hover:w-44 focus-within:w-44">
          {sectionItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={language === "zh-CN" ? `跳转到${item.label}` : `Jump to ${item.label}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group/item flex min-h-10 w-full items-center gap-3 rounded-[1.15rem] px-3 text-left text-xs font-semibold text-neutral-500 outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/40",
                  active ? "bg-white/72 text-blue-700 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_8px_20px_rgba(0,122,255,.12)]" : "hover:bg-white/45 hover:text-neutral-900",
                )}
                onClick={() => scrollToSection(item.id)}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full border transition duration-200",
                    active
                      ? "border-blue-500 bg-blue-500 shadow-[0_0_0_4px_rgba(0,122,255,.13),0_0_16px_rgba(0,122,255,.35)]"
                      : "border-neutral-400/55 bg-neutral-400/30 group-hover/item:border-blue-400/70 group-hover/item:bg-blue-400/45",
                  )}
                  aria-hidden="true"
                />
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:opacity-100 group-focus-within:max-w-28 group-focus-within:opacity-100">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div
        ref={rootRef}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] z-50 min-[1400px]:hidden"
      >
        {mobileOpen ? (
          <nav
            id={panelId}
            className="mb-3 max-h-[70vh] w-[min(17rem,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto rounded-[1.8rem] border border-white/80 bg-white/68 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.96),0_24px_70px_rgba(46,61,82,.22),0_0_38px_rgba(126,217,255,.17)] backdrop-blur-[36px] backdrop-saturate-150 animate-fade-in"
            aria-label={navigationLabel}
          >
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-neutral-500">
                <Compass className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span className="truncate">{mobilePrompt}</span>
              </div>
              <button
                type="button"
                aria-label={language === "zh-CN" ? "关闭章节导航" : "Close section navigation"}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 outline-none transition hover:bg-white/65 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-blue-500/45"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid gap-1.5">
              {sectionItems.map((item) => {
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "flex min-h-10 w-full items-center gap-3 rounded-[1.15rem] px-3 text-left text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500/35",
                      active
                        ? "bg-white/76 text-blue-700 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_8px_18px_rgba(0,122,255,.1)]"
                        : "text-neutral-600 hover:bg-white/50 hover:text-neutral-950",
                    )}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 shrink-0 rounded-full border transition",
                        active
                          ? "border-blue-500 bg-blue-500 shadow-[0_0_0_4px_rgba(0,122,255,.13)]"
                          : "border-neutral-400/55 bg-neutral-400/30",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        ) : null}

        <button
          type="button"
          aria-label={language === "zh-CN" ? "打开章节导航" : "Open section navigation"}
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          className="liquid-glow-button inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-white/85 bg-white/62 px-3.5 text-blue-700 shadow-[inset_0_1px_1px_rgba(255,255,255,.98),0_16px_44px_rgba(46,61,82,.18),0_0_28px_rgba(126,217,255,.18)] outline-none backdrop-blur-[34px] backdrop-saturate-150 transition duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-blue-500/45 active:scale-95"
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
        >
          <Compass className="size-5" aria-hidden="true" />
          <span className="text-xs font-semibold leading-none text-neutral-700">{mobilePrompt}</span>
        </button>
      </div>
    </>
  );
}
