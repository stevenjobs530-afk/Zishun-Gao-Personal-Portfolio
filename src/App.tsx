import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, CheckCircle2, Download, Drum, Dumbbell, FileText, Palette, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { BackgroundComponents } from "@/components/ui/background-components";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { RevealArticle, RevealBlock, RevealListItem, StaggerBlock, StaggerItem } from "@/components/ui/text-animations";
import { DataCanvas } from "@/components/DataCanvas";
import { CaseStudyFoldout } from "@/components/CaseStudyFoldout";
import { HelloIntro } from "@/components/HelloIntro";
import { PortfolioGuidedHints } from "@/components/PortfolioGuidedHints";
import { ProjectGalleryShowcase } from "@/components/ProjectGalleryShowcase";
import { SectionNavigator } from "@/components/SectionNavigator";
import { languageOptions, portfolioByLanguage, type LanguageCode, type PortfolioContent } from "@/data/portfolio";

const defaultLanguage: LanguageCode = "en";

type NavSectionId = keyof PortfolioContent["nav"];

const navSectionIdsByLanguage = {
  en: ["about", "projects", "experience", "skills", "education", "contact"],
  "zh-CN": ["education", "projects", "experience", "skills", "about", "contact"],
} as const satisfies Record<LanguageCode, readonly NavSectionId[]>;

const interestIcons = [Drum, Palette, Camera, Dumbbell] as const;

function publicAssetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

const cvPdfPaths = {
  en: publicAssetPath("cv/Zishun_Gao_CV_UK_2026.pdf"),
  "zh-CN": publicAssetPath("cv/Zishun_Gao_CV_CN_2026.pdf"),
} as const satisfies Record<LanguageCode, string>;

function getInitialLanguage(): LanguageCode {
  return defaultLanguage;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToPageSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  const headerOffset = sectionId === "top" ? 0 : 110;
  const scrollToTarget = (behavior: ScrollBehavior) => {
    window.scrollTo({
      top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerOffset),
      behavior,
    });
  };

  if (prefersReducedMotion()) {
    scrollToTarget("auto");
  } else {
    scrollToTarget("smooth");

    window.setTimeout(() => {
      const remainingOffset = target.getBoundingClientRect().top - headerOffset;

      if (Math.abs(remainingOffset) > 24) {
        window.scrollTo({
          top: Math.max(0, window.scrollY + remainingOffset),
          behavior: "auto",
        });
      }
    }, 700);
  }

  window.history.replaceState(null, "", `#${sectionId}`);
}

function Header({
  content,
  language,
  onLanguageChange,
}: {
  content: PortfolioContent;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}) {
  const navSectionIds = navSectionIdsByLanguage[language];

  return (
    <header className="fixed left-1/2 top-[calc(env(safe-area-inset-top)+1.25rem)] z-30 flex w-[min(1180px,calc(100%-40px))] -translate-x-1/2 items-center justify-between gap-5 rounded-lg border border-white/80 bg-white/55 px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_18px_55px_rgba(46,61,82,.14)] backdrop-blur-[44px] backdrop-saturate-150 max-sm:top-[calc(env(safe-area-inset-top)+0.75rem)] max-sm:w-[calc(100%-28px)] max-sm:gap-3">
      <a
        className="min-w-0 truncate text-sm font-semibold text-neutral-950"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToPageSection("top");
        }}
      >
        {content.header.brandPrimary} <span className="text-neutral-500">{content.header.brandSecondary}</span>
      </a>
      <div className="flex shrink-0 items-center gap-4 max-sm:gap-3">
        <nav className="flex items-center gap-5 text-xs font-medium text-neutral-600 max-lg:hidden" aria-label="Primary navigation">
          {navSectionIds.map((sectionId) => (
            <a
              key={sectionId}
              className="nav-link hover:text-blue-700"
              href={`#${sectionId}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToPageSection(sectionId);
              }}
            >
              {content.nav[sectionId]}
            </a>
          ))}
        </nav>
        <LanguageSelectorDropdown
          ariaLabel={content.header.languageLabel}
          value={language}
          options={languageOptions}
          onChange={onLanguageChange}
        />
      </div>
    </header>
  );
}

function HeroGraphic() {
  return (
    <LiquidGlass className="min-h-[500px] rounded-[2rem] max-lg:min-h-56 max-sm:min-h-[220px]" aria-hidden="true">
      <div className="liquid-chrome-artwork absolute inset-7 rounded-[1.65rem] max-sm:inset-5">
        <span className="chrome-ribbon chrome-ribbon-one" />
        <span className="chrome-ribbon chrome-ribbon-two" />
        <span className="chrome-caustic chrome-caustic-one" />
        <span className="chrome-caustic chrome-caustic-two" />
      </div>
    </LiquidGlass>
  );
}

function Hero({ content, language }: { content: PortfolioContent; language: LanguageCode }) {
  const { profile } = content;
  const cvPdfPath = cvPdfPaths[language];

  return (
    <section id="top" className="mx-auto grid min-h-[88vh] w-[min(1180px,calc(100%-40px))] grid-cols-[minmax(0,1.05fr)_minmax(320px,.75fr)] items-center gap-16 pb-12 pt-32 max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-6 max-lg:pb-8 max-sm:w-[calc(100%-28px)] max-sm:pt-28">
      <StaggerBlock className="max-w-[760px]" delay={0.15}>
        <StaggerItem>
          <h1 className="apple-display-text text-[clamp(4.1rem,9vw,8.7rem)] leading-[.88] text-neutral-950 max-sm:text-[clamp(2.75rem,15vw,4rem)] max-sm:leading-[.96]">
            {profile.name}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 text-[clamp(1.35rem,2.4vw,2.35rem)] font-semibold text-neutral-800 max-sm:mt-4 max-sm:text-xl">{profile.title}</p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-[760px] text-[clamp(1.02rem,1.55vw,1.22rem)] leading-8 text-neutral-700 max-sm:mt-4 max-sm:text-base max-sm:leading-7">
            {profile.intro}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 max-w-[760px] text-[clamp(1.02rem,1.55vw,1.22rem)] leading-8 text-neutral-500 max-sm:text-base max-sm:leading-7">
            {profile.introSecondary}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-wrap gap-4 max-sm:mt-6 max-sm:flex-col">
          <GlassButton
            liquid
            className="h-12 min-w-36 text-neutral-950 max-sm:w-full"
            glassColor="oklch(from var(--foreground) l c h / 7%)"
            onClick={() => scrollToPageSection("projects")}
          >
            {content.actions.viewProjects}
          </GlassButton>
          <GlassButton
            asChild
            liquid
            className="h-12 min-w-36 text-neutral-950 max-sm:w-full"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
          >
            <a href={cvPdfPath} download>
              {content.actions.downloadCV}
            </a>
          </GlassButton>
        </StaggerItem>
        <StaggerItem className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-neutral-600 max-sm:mt-6 max-sm:flex-col max-sm:gap-3">
          <a className="nav-link hover:text-blue-700" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="nav-link hover:text-blue-700" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="nav-link hover:text-blue-700" href={`mailto:${profile.email}`}>
            {content.actions.emailMe}
          </a>
        </StaggerItem>
      </StaggerBlock>
      <RevealBlock className="max-sm:hidden" delay={0.35}>
        <HeroGraphic />
      </RevealBlock>
    </section>
  );
}

function Metrics({ content }: { content: PortfolioContent }) {
  return (
    <RevealBlock>
      <LiquidGlass className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-4 divide-x divide-white/50 max-lg:grid-cols-2 max-lg:divide-x-0 max-sm:w-[calc(100%-28px)] max-sm:grid-cols-1">
        {content.metrics.map((metric) => (
          <article key={metric.label} className="min-h-32 p-6">
            <span className="apple-display-text block whitespace-nowrap text-[clamp(1.55rem,2.7vw,2.75rem)] text-neutral-950">{metric.value}</span>
            <span className="mt-2 block text-sm leading-6 text-neutral-500">{metric.label}</span>
          </article>
        ))}
      </LiquidGlass>
    </RevealBlock>
  );
}

function RecruiterQuickView({ content }: { content: PortfolioContent }) {
  const quickView = content.recruiterQuickView;

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-40px))] pt-10 max-sm:w-[calc(100%-28px)]">
      <RevealBlock>
        <LiquidGlass className="grid grid-cols-[.72fr_1.28fr] gap-8 p-7 md:p-8 max-lg:grid-cols-1">
          <div className="relative z-[1]">
            <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{quickView.label}</p>
            <h2 className="apple-display-text mt-4 text-[clamp(1.8rem,3vw,3rem)] leading-none text-neutral-900">
              {quickView.title}
            </h2>
            <p className="mt-5 text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{quickView.body}</p>
          </div>
          <div className="relative z-[1] grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {quickView.items.map((item, index) => (
              <RevealArticle key={item.title} className="border-t border-white/55 pt-4" delay={index * 0.05}>
                <h3 className="apple-display-text text-base text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{item.body}</p>
              </RevealArticle>
            ))}
          </div>
        </LiquidGlass>
      </RevealBlock>
    </section>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <StaggerBlock>
      <StaggerItem>
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{label}</p>
      </StaggerItem>
      <StaggerItem>
        <h2 className="apple-display-text mt-4 text-[clamp(2.25rem,5vw,4.8rem)] leading-none text-neutral-800">{title}</h2>
      </StaggerItem>
    </StaggerBlock>
  );
}

function About({ content }: { content: PortfolioContent }) {
  return (
    <section id="about" className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-[.82fr_1.18fr] gap-20 pt-32 max-lg:grid-cols-1 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
      <SectionHeading label={content.sections.about.label} title={content.sections.about.title} />
      <div className="flex flex-col gap-5 text-base leading-8 text-neutral-600">
        {content.profile.about.map((paragraph, index) => (
          <RevealBlock key={paragraph} delay={index * 0.08}>
            <p>{paragraph}</p>
          </RevealBlock>
        ))}
        <RevealBlock delay={0.18}>
          <LiquidGlass className="mt-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.targetRoles.label}</p>
            <h3 className="apple-display-text mt-3 text-xl leading-tight text-neutral-900">{content.targetRoles.title}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">{content.targetRoles.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {content.targetRoles.roles.map((role) => (
                <Badge key={role}>{role}</Badge>
              ))}
            </div>
          </LiquidGlass>
        </RevealBlock>
      </div>
    </section>
  );
}

function Projects({ content }: { content: PortfolioContent }) {
  return (
    <section id="projects" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-32 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
      <div className="flex items-end justify-between gap-6 pb-9 max-lg:flex-col max-lg:items-start">
        <SectionHeading label={content.sections.projects.label} title={content.sections.projects.title} />
        <Button asChild variant="glass" size="sm" className="gap-2">
          <a href={content.profile.github} target="_blank" rel="noreferrer">
            {content.actions.viewGithub} <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <ProjectGalleryShowcase content={content} />
    </section>
  );
}

function PersonalTrainingPortal({ content }: { content: PortfolioContent }) {
  const project = content.projects.find((item) => item.href === "#/personal-training-concept");

  if (!project?.cover || !project.preview || !project.href) {
    return null;
  }

  const href = `${import.meta.env.BASE_URL}${project.href}`;

  return (
    <RevealArticle className="mt-6">
      <LiquidGlass
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.preview.ctaLabel}: ${project.title}. ${project.preview.newTabLabel}`}
        className="group grid min-w-0 grid-cols-[minmax(220px,.72fr)_minmax(0,1.28fr)] items-center overflow-hidden p-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 max-md:grid-cols-1"
      >
        <div className="relative z-[1] min-w-0 self-stretch border-r border-white/55 bg-[radial-gradient(circle_at_22%_18%,rgba(0,122,255,.17),transparent_44%),radial-gradient(circle_at_84%_86%,rgba(21,214,180,.16),transparent_46%),rgba(240,247,252,.56)] p-4 max-md:border-b max-md:border-r-0 md:p-5">
          <img
            className="media-fade-in aspect-video h-full max-h-[240px] w-full rounded-lg border border-white/75 bg-white/75 object-contain shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_16px_42px_rgba(46,61,82,.13)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025] max-md:max-h-none"
            src={publicAssetPath(project.cover.src)}
            alt={project.cover.alt}
            loading="lazy"
          />
        </div>
        <div className="relative z-[1] min-w-0 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{project.preview.label}</p>
          <h3 className="apple-display-text mt-3 text-[clamp(1.45rem,2.8vw,2.4rem)] leading-tight text-neutral-950">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{project.summary}</p>
          <p className="mt-3 text-xs leading-5 text-neutral-500">{project.preview.disclosure}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-500/15 bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(18,97,255,.2)]">
              {project.preview.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-neutral-500">{project.preview.newTabLabel}</span>
          </div>
        </div>
      </LiquidGlass>
    </RevealArticle>
  );
}

function CaseStudies({ content }: { content: PortfolioContent }) {
  const [openStudyId, setOpenStudyId] = useState<string | null>(null);

  const toggleStudy = (studyId: string) => {
    if (openStudyId === studyId) {
      setOpenStudyId(null);

      if (window.location.hash.startsWith(`#case-${studyId}`)) {
        window.history.replaceState(null, "", "#case-studies");
      }

      return;
    }

    setOpenStudyId(studyId);
  };

  useEffect(() => {
    const syncStudyFromHash = () => {
      const matchingStudy = content.caseStudies.find((study) => window.location.hash.startsWith(`#case-${study.id}`));

      if (matchingStudy) {
        setOpenStudyId(matchingStudy.id);
      }
    };

    syncStudyFromHash();
    window.addEventListener("hashchange", syncStudyFromHash);
    return () => window.removeEventListener("hashchange", syncStudyFromHash);
  }, [content.caseStudies]);

  useEffect(() => {
    if (!openStudyId || !window.location.hash.startsWith(`#case-${openStudyId}`)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) {
        return;
      }

      window.scrollTo({
        top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 110),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }, 60);

    return () => window.clearTimeout(timeout);
  }, [openStudyId]);

  return (
    <section id="case-studies" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-24 max-sm:w-[calc(100%-28px)]">
      <div className="grid grid-cols-[.86fr_1.14fr] gap-20 pb-9 max-lg:grid-cols-1">
        <SectionHeading label={content.sections.caseStudies.label} title={content.sections.caseStudies.title} />
        <RevealBlock>
          <p className="text-base leading-8 text-neutral-600">{content.sections.caseStudies.body}</p>
        </RevealBlock>
      </div>

      <div className="grid gap-7">
        {content.caseStudies.map((study, index) => (
          <div key={study.id} id={`case-${study.id}`}>
            <CaseStudyFoldout
              study={study}
              labels={content.caseStudyLabels}
              expanded={openStudyId === study.id}
              onToggle={() => toggleStudy(study.id)}
              delay={index * 0.08}
            />
            {study.id === "aep" ? <PersonalTrainingPortal content={content} /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceShowcase({ content }: { content: PortfolioContent }) {
  return (
    <div className="h-full overflow-x-hidden overflow-y-auto bg-[radial-gradient(circle_at_12%_2%,rgba(0,122,255,.12),transparent_18%),radial-gradient(circle_at_8%_92%,rgba(21,214,180,.15),transparent_28%),linear-gradient(135deg,#f9fbff_0%,#eef5f8_52%,#f8f9fc_100%)] p-5 max-lg:h-auto max-lg:overflow-visible max-lg:rounded-[1.5rem] md:p-8">
      <div className="mx-auto max-w-[760px]">
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.experience.label}</p>
        <LiquidGlass className="mt-5">
          {content.experiences.map((item, index) => (
            <RevealArticle key={item.role} className={index > 0 ? "border-t border-white/50 p-5 md:p-6" : "p-5 md:p-6"} delay={index * 0.08}>
              <time className="text-sm leading-6 text-neutral-500">{item.date}</time>
              <h3 className="apple-display-text mt-1 text-lg text-neutral-900">{item.role}</h3>
              <p className="mt-1 text-sm text-neutral-500">{item.company}</p>
              <ul className="mt-4 list-disc pl-5 text-[0.95rem] leading-7 text-neutral-600">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {item.badges ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
                </div>
              ) : null}
              {item.caseStudy ? (
                <div className="mt-6 border-t border-white/55 pt-5">
                  <h4 className="apple-display-text text-base text-neutral-900">{item.caseStudy.title}</h4>
                  <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600">{item.caseStudy.body}</p>
                  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 max-md:grid-cols-1">
                    {item.caseStudy.details.map((detail) => (
                      <article key={detail.title} className="border-t border-white/45 pt-4">
                        <h5 className="text-sm font-semibold text-neutral-900">{detail.title}</h5>
                        <p className="mt-1 text-[0.95rem] leading-7 text-neutral-600">{detail.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </RevealArticle>
          ))}
        </LiquidGlass>
      </div>
    </div>
  );
}

function ExperienceSkills({ content }: { content: PortfolioContent }) {
  return (
    <>
      <section id="experience" className="pt-24 max-sm:pt-16">
        <ContainerScroll
          titleComponent={
            <StaggerBlock>
              <StaggerItem>
                <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.experience.label}</p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="apple-display-text mx-auto mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] leading-[.95] text-neutral-900">
                  {content.sections.experience.title}
                </h2>
              </StaggerItem>
            </StaggerBlock>
          }
        >
          <ExperienceShowcase content={content} />
        </ContainerScroll>
      </section>

      <section id="skills" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-12 max-sm:w-[calc(100%-28px)]">
        <div className="grid grid-cols-[.82fr_1.18fr] gap-20 max-lg:grid-cols-1">
          <SectionHeading label={content.sections.skills.label} title={content.sections.skills.title} />
          <LiquidGlass>
            {content.skills.map((skill, index) => (
              <RevealArticle key={skill.title} className={index > 0 ? "border-t border-white/50 p-7" : "p-7"} delay={index * 0.06}>
                <h3 className="apple-display-text text-lg text-neutral-900">{skill.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{skill.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </RevealArticle>
            ))}
          </LiquidGlass>
        </div>
      </section>
    </>
  );
}

function useAwardWallControls(cardCount: number) {
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
    const itemWidth = firstCard ? firstCard.offsetWidth + 18 : track.clientWidth;
    const nextIndex = Math.min(cardCount - 1, Math.max(0, Math.round(track.scrollLeft / itemWidth)));

    setActiveIndex(nextIndex);
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);

    return () => window.removeEventListener("resize", updateState);
  }, []);

  const scrollToIndex = (index: number) => {
    const target = trackRef.current?.children.item(index);

    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest", inline: "start" });
    }
  };

  const scrollByPage = (direction: -1 | 1) => {
    scrollToIndex(Math.min(cardCount - 1, Math.max(0, activeIndex + direction)));
  };

  return {
    activeIndex,
    canScrollNext,
    canScrollPrev,
    scrollByPage,
    scrollToIndex,
    trackRef,
    updateState,
  };
}

function AwardPreviewCard({
  card,
  yearLabel,
  categoryLabel,
}: {
  card: PortfolioContent["awardsGallery"]["cards"][number];
  yearLabel: string;
  categoryLabel: string;
}) {
  return (
    <article className="snap-start">
      <LiquidGlass className="flex h-full min-h-[450px] w-[min(76vw,285px)] flex-col p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,.92),inset_0_-1px_14px_rgba(255,255,255,.34),0_0_0_1px_rgba(255,255,255,.24),0_14px_34px_rgba(46,61,82,.07)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:min-h-[470px] sm:w-[310px] lg:w-[326px]">
        <div className="relative z-[1] flex h-full flex-col">
          <div className="apple-inner-curve flex h-[185px] items-center justify-center overflow-hidden border border-white/70 bg-white/78 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_18px_48px_rgba(46,61,82,.12)] sm:h-[205px]">
            <img className="media-fade-in max-h-full max-w-full object-contain" src={publicAssetPath(card.image)} alt={card.alt} loading="lazy" />
          </div>

          <div className="mt-5 min-w-0">
            <h3 className="apple-display-text text-[1.05rem] leading-7 text-neutral-950">{card.title}</h3>
            <dl className="mt-4 grid gap-2 text-sm leading-6 text-neutral-600">
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-neutral-900">{yearLabel}:</dt>
                <dd>{card.year}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-neutral-900">{categoryLabel}:</dt>
                <dd>{card.category}</dd>
              </div>
            </dl>
          </div>

          <p className="mt-4 text-[0.95rem] leading-7 text-neutral-600">{card.note}</p>

          <div className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="size-4" aria-hidden="true" />
            <span>{card.privacy}</span>
          </div>
        </div>
      </LiquidGlass>
    </article>
  );
}

function AwardPreviewWall({ content }: { content: PortfolioContent }) {
  const gallery = content.awardsGallery;
  const controls = useAwardWallControls(gallery.cards.length);

  return (
    <div className="col-span-full mt-12">
      <div className="flex items-end justify-between gap-6 max-lg:flex-col max-lg:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.awards.label}</p>
          <h3 className="apple-display-text mt-4 text-[clamp(1.8rem,3.4vw,3.3rem)] leading-none text-neutral-900">{gallery.title}</h3>
          <p className="mt-5 text-base leading-8 text-neutral-600">{gallery.body}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-600">
            <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
            <span>
              {gallery.cards.length} {gallery.proofCountLabel}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="liquid-glow-button flex size-9 items-center justify-center rounded-full border border-white/80 bg-white/55 text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_12px_34px_rgba(46,61,82,.12)] backdrop-blur-[34px] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] active:scale-95 active:duration-150 disabled:cursor-not-allowed disabled:opacity-45 sm:size-11"
              type="button"
              onClick={() => controls.scrollByPage(-1)}
              disabled={!controls.canScrollPrev}
              aria-label={gallery.previousLabel}
            >
              <ArrowLeft className="size-4 sm:size-5" aria-hidden="true" />
            </button>
            <button
              className="liquid-glow-button flex size-9 items-center justify-center rounded-full border border-white/80 bg-white/55 text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_12px_34px_rgba(46,61,82,.12)] backdrop-blur-[34px] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] active:scale-95 active:duration-150 disabled:cursor-not-allowed disabled:opacity-45 sm:size-11"
              type="button"
              onClick={() => controls.scrollByPage(1)}
              disabled={!controls.canScrollNext}
              aria-label={gallery.nextLabel}
            >
              <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={controls.trackRef}
        className="award-preview-track -mx-8 -mb-12 mt-0 flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth px-8 pb-20 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={controls.updateState}
      >
        {gallery.cards.map((card) => (
          <AwardPreviewCard key={card.id} card={card} yearLabel={gallery.yearLabel} categoryLabel={gallery.categoryLabel} />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {gallery.cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            aria-label={`${gallery.dotLabel} ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              controls.activeIndex === index ? "w-8 bg-neutral-950" : "w-2.5 bg-neutral-950/20 hover:bg-neutral-950/40"
            }`}
            onClick={() => controls.scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function AcademicTranscriptCard({
  transcript,
}: {
  transcript: PortfolioContent["academicTranscripts"]["cards"][number];
}) {
  const previewImage = publicAssetPath(transcript.previewImage);
  const downloadHref = publicAssetPath(transcript.downloadHref);

  return (
    <RevealArticle>
      <LiquidGlass className="h-full overflow-hidden p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-5">
        <div className="relative z-[1] grid h-full grid-cols-[minmax(150px,.55fr)_minmax(0,1fr)] gap-5 max-sm:grid-cols-1">
          <a
            className="block overflow-hidden rounded-lg border border-white/75 bg-white/55 shadow-[inset_0_1px_1px_rgba(255,255,255,.92),0_16px_38px_rgba(46,61,82,.12)]"
            href={downloadHref}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="aspect-[595/842] h-full w-full object-cover object-top"
              src={previewImage}
              alt={transcript.previewAlt}
              loading="lazy"
            />
          </a>
          <div className="flex min-w-0 flex-col">
            <span className="flex size-10 items-center justify-center rounded-lg border border-white/65 bg-white/45 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,.9)]">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <h3 className="apple-display-text mt-4 text-xl text-neutral-900">{transcript.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600">{transcript.body}</p>
            <div className="mt-auto flex flex-col gap-4 pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span>{transcript.privacy}</span>
              </div>
              <GlassButton asChild className="h-11 w-full text-neutral-950 sm:w-fit" glassColor="oklch(from var(--foreground) l c h / 5%)">
                <a href={downloadHref} download>
                  <span className="inline-flex items-center gap-2">
                    {transcript.downloadLabel}
                    <Download className="size-4" aria-hidden="true" />
                  </span>
                </a>
              </GlassButton>
            </div>
          </div>
        </div>
      </LiquidGlass>
    </RevealArticle>
  );
}

function AcademicTranscripts({ content }: { content: PortfolioContent }) {
  const transcripts = content.academicTranscripts;

  return (
    <div className="col-span-full mt-12">
      <div className="flex items-end justify-between gap-6 max-lg:flex-col max-lg:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.education.label}</p>
          <h3 className="apple-display-text mt-4 text-[clamp(1.8rem,3.4vw,3.3rem)] leading-none text-neutral-900">{transcripts.title}</h3>
          <p className="mt-5 text-base leading-8 text-neutral-600">{transcripts.body}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-600">
          <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
          <span>
            {transcripts.cards.length} {transcripts.proofCountLabel}
          </span>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {transcripts.cards.map((transcript) => (
          <AcademicTranscriptCard key={transcript.id} transcript={transcript} />
        ))}
      </div>
    </div>
  );
}

function EducationAwards({ content }: { content: PortfolioContent }) {
  return (
    <section id="education" className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-[.82fr_1.18fr] gap-20 pb-10 pt-32 max-lg:grid-cols-1 max-sm:w-[calc(100%-28px)] max-sm:pb-8 max-sm:pt-24">
      <div>
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.education.label}</p>
        <LiquidGlass className="mt-5">
          {content.education.map((item, index) => (
            <RevealArticle key={item.school} className={index > 0 ? "border-t border-white/50 p-7" : "p-7"} delay={index * 0.07}>
              <h3 className="apple-display-text text-lg text-neutral-900">{item.school}</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">{item.detail}</p>
              <span className="text-sm leading-7 text-neutral-500">{item.meta}</span>
            </RevealArticle>
          ))}
        </LiquidGlass>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.awards.label}</p>
        <LiquidGlass className="mt-5">
          <ul className="list-none">
            {content.awards.map((award, index) => (
              <RevealListItem key={award} className={index > 0 ? "border-t border-white/50 p-7" : "p-7"} delay={index * 0.06}>
                {award}
              </RevealListItem>
            ))}
          </ul>
        </LiquidGlass>
      </div>
      <AcademicTranscripts content={content} />
      <AwardPreviewWall content={content} />
    </section>
  );
}

function Interests({ content }: { content: PortfolioContent }) {
  return (
    <section id="interests" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-24 lg:pr-20 max-sm:w-[calc(100%-28px)] max-sm:pt-20">
      <div className="grid grid-cols-[.82fr_1.18fr] gap-20 max-lg:grid-cols-1">
        <SectionHeading label={content.sections.interests.label} title={content.sections.interests.title} />
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {content.interests.map((interest, index) => {
            const Icon = interestIcons[index % interestIcons.length];

            return (
              <RevealArticle key={interest.title} delay={index * 0.05}>
                <LiquidGlass className="h-full p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:p-6">
                  <div className="relative z-[1] flex h-full flex-col gap-4">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-white/65 bg-white/45 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,.9)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="apple-display-text text-lg text-neutral-900">{interest.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-7 text-neutral-600">{interest.body}</p>
                    </div>
                  </div>
                </LiquidGlass>
              </RevealArticle>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ content, language }: { content: PortfolioContent; language: LanguageCode }) {
  const cvPdfPath = cvPdfPaths[language];

  return (
    <section id="contact" className="mx-auto mt-32 w-[min(1180px,calc(100%-40px))] max-sm:mt-24 max-sm:w-[calc(100%-28px)]">
      <RevealBlock>
        <LiquidGlass className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-11 p-12 max-lg:grid-cols-1 max-sm:p-7">
          <StaggerBlock>
            <StaggerItem>
              <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.contact.label}</p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="apple-display-text mt-4 text-[clamp(2.25rem,5vw,4.8rem)] leading-none text-neutral-900">
                {content.sections.contact.title}
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">
                {content.sections.contact.body}
              </p>
            </StaggerItem>
          </StaggerBlock>
        <div className="grid min-w-64 gap-3 max-lg:min-w-0">
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => {
              window.location.href = `mailto:${content.profile.email}`;
            }}
          >
            {content.profile.email}
          </GlassButton>
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => window.open(content.profile.linkedin, "_blank", "noopener,noreferrer")}
          >
            LinkedIn
          </GlassButton>
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => window.open(content.profile.github, "_blank", "noopener,noreferrer")}
          >
            GitHub
          </GlassButton>
          <GlassButton asChild className="h-12 text-neutral-950" glassColor="oklch(from var(--foreground) l c h / 5%)">
            <a href={cvPdfPath} download>
              {content.actions.downloadCV}
            </a>
          </GlassButton>
        </div>
        </LiquidGlass>
      </RevealBlock>
    </section>
  );
}

function Footer({ content }: { content: PortfolioContent }) {
  return (
    <footer className="mx-auto flex w-[min(1180px,calc(100%-40px))] items-center justify-between gap-5 py-12 text-sm text-neutral-500 max-sm:w-[calc(100%-28px)] max-sm:flex-col max-sm:items-start">
      <span>{content.footer.rights}</span>
      <a
        className="nav-link hover:text-blue-700"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToPageSection("top");
        }}
      >
        {content.actions.backToTop}
      </a>
    </footer>
  );
}

function MainContent({ content, language }: { content: PortfolioContent; language: LanguageCode }) {
  if (language === "zh-CN") {
    return (
      <main>
        <Hero content={content} language={language} />
        <EducationAwards content={content} />
        <Metrics content={content} />
        <RecruiterQuickView content={content} />
        <Projects content={content} />
        <CaseStudies content={content} />
        <ExperienceSkills content={content} />
        <About content={content} />
        <Interests content={content} />
        <Contact content={content} language={language} />
      </main>
    );
  }

  return (
    <main>
      <Hero content={content} language={language} />
      <Metrics content={content} />
      <RecruiterQuickView content={content} />
      <About content={content} />
      <Projects content={content} />
      <CaseStudies content={content} />
      <ExperienceSkills content={content} />
      <EducationAwards content={content} />
      <Interests content={content} />
      <Contact content={content} language={language} />
    </main>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const [helloIntroComplete, setHelloIntroComplete] = useState(false);
  const content = portfolioByLanguage[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  return (
    <>
      <BackgroundComponents />
      <DataCanvas />
      <HelloIntro onComplete={() => setHelloIntroComplete(true)} />
      <Header content={content} language={language} onLanguageChange={setLanguage} />
      <SectionNavigator language={language} />
      <PortfolioGuidedHints introComplete={helloIntroComplete} language={language} />
      <MainContent content={content} language={language} />
      <Footer content={content} />
    </>
  );
}
