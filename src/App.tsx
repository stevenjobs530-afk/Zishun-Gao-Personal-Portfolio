import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Code2, ImageIcon, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Animated3DCard } from "@/components/ui/animated-3d-card";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { BackgroundComponents } from "@/components/ui/background-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { RevealArticle, RevealBlock, RevealListItem, StaggerBlock, StaggerItem } from "@/components/ui/text-animations";
import { DataCanvas } from "@/components/DataCanvas";
import { HelloIntro } from "@/components/HelloIntro";
import { ProjectVisual } from "@/components/ProjectVisual";
import { languageOptions, portfolioByLanguage, type LanguageCode, type PortfolioContent } from "@/data/portfolio";

const LANGUAGE_STORAGE_KEY = "zishun-portfolio-language";
const defaultLanguage: LanguageCode = "en";

const navSectionIds = ["about", "projects", "experience", "skills", "education", "contact"] as const;
const caseStudyDetailTargets = [
  { id: "screenshots", Icon: ImageIcon },
  { id: "code", Icon: Code2 },
  { id: "conclusion", Icon: ListChecks },
] as const;

function publicAssetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "en" || value === "zh-CN";
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguageCode(storedLanguage) ? storedLanguage : defaultLanguage;
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
  return (
    <header className="fixed left-1/2 top-5 z-30 flex w-[min(1180px,calc(100%-40px))] -translate-x-1/2 items-center justify-between gap-5 rounded-lg border border-white/80 bg-white/55 px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_18px_55px_rgba(46,61,82,.14)] backdrop-blur-[44px] backdrop-saturate-150 max-sm:top-3 max-sm:w-[calc(100%-28px)]">
      <a className="text-sm font-semibold text-neutral-950" href="#top">
        {content.header.brandPrimary} <span className="text-neutral-500">{content.header.brandSecondary}</span>
      </a>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-5 text-xs font-medium text-neutral-600 max-lg:hidden" aria-label="Primary navigation">
          {navSectionIds.map((sectionId) => (
            <a key={sectionId} className="transition hover:text-blue-700" href={`#${sectionId}`}>
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
    <LiquidGlass className="min-h-[500px] rounded-[2rem] max-lg:min-h-[360px] max-sm:min-h-[280px]" aria-hidden="true">
      <div className="liquid-chrome-artwork absolute inset-7 rounded-[1.65rem] max-sm:inset-5">
        <span className="chrome-ribbon chrome-ribbon-one" />
        <span className="chrome-ribbon chrome-ribbon-two" />
        <span className="chrome-caustic chrome-caustic-one" />
        <span className="chrome-caustic chrome-caustic-two" />
      </div>
    </LiquidGlass>
  );
}

function Hero({ content }: { content: PortfolioContent }) {
  const { profile } = content;

  return (
    <section id="top" className="mx-auto grid min-h-[88vh] w-[min(1180px,calc(100%-40px))] grid-cols-[minmax(0,1.05fr)_minmax(320px,.75fr)] items-center gap-16 pb-12 pt-32 max-lg:grid-cols-1 max-lg:gap-9 max-sm:w-[calc(100%-28px)] max-sm:pt-28">
      <StaggerBlock className="max-w-[760px]" delay={0.15}>
        <StaggerItem>
          <h1 className="apple-display-text text-[clamp(4.1rem,9vw,8.7rem)] leading-[.88] text-neutral-950 max-sm:text-[clamp(3.3rem,19vw,5rem)]">
            {profile.name}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 text-[clamp(1.35rem,2.4vw,2.35rem)] font-semibold text-neutral-800">{profile.title}</p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-[760px] text-[clamp(1.02rem,1.55vw,1.22rem)] leading-8 text-neutral-700">
            {profile.intro}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 max-w-[760px] text-[clamp(1.02rem,1.55vw,1.22rem)] leading-8 text-neutral-500">
            {profile.introSecondary}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-wrap gap-4 max-sm:flex-col">
          <GlassButton
            className="h-12 min-w-36 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 7%)"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            {content.actions.viewProjects}
          </GlassButton>
          <GlassButton
            className="h-12 min-w-36 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            title={content.actions.cvPendingTitle}
          >
            {content.actions.downloadCV}
          </GlassButton>
        </StaggerItem>
        <StaggerItem className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-neutral-600 max-sm:flex-col">
          <a className="transition hover:text-blue-700" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="transition hover:text-blue-700" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="transition hover:text-blue-700" href={`mailto:${profile.email}`}>
            {content.actions.emailMe}
          </a>
        </StaggerItem>
      </StaggerBlock>
      <RevealBlock delay={0.35}>
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
            <span className="apple-display-text block text-[clamp(1.8rem,3vw,2.75rem)] text-neutral-950">{metric.value}</span>
            <span className="mt-2 block text-sm leading-6 text-neutral-500">{metric.label}</span>
          </article>
        ))}
      </LiquidGlass>
    </RevealBlock>
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

function ProjectDetailMenu({
  studyId,
  labels,
  className = "",
}: {
  studyId: string;
  labels: PortfolioContent["caseStudyLabels"];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {caseStudyDetailTargets.map(({ id, Icon }) => (
        <Button key={id} asChild variant="glass" size="sm" className="gap-2 px-3">
          <a href={`#case-${studyId}-${id}`}>
            <Icon className="size-4" aria-hidden="true" />
            {labels[id]}
          </a>
        </Button>
      ))}
    </div>
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
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {content.projects.map((project, index) => (
          <Animated3DCard key={project.title} delay={index * 0.08}>
            <Card className="flex min-h-[600px] flex-col overflow-hidden">
              <ProjectVisual visual={project.visual} />
              <CardHeader className="grow">
                <CardTitle className="transition-transform duration-500 group-hover/animated-card:-translate-y-1">{project.title}</CardTitle>
                <CardDescription className="transition-opacity duration-500 group-hover/animated-card:text-neutral-700">{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                {project.caseStudyId ? (
                  <ProjectDetailMenu studyId={project.caseStudyId} labels={content.caseStudyLabels} />
                ) : project.href ? (
                  <Button asChild variant="glass" size="sm" className="w-fit gap-2">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {content.actions.viewProject} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="glass" size="sm" className="w-fit">
                    <a href="#contact">{content.actions.discussProject}</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </Animated3DCard>
        ))}
      </div>
    </section>
  );
}

function CaseStudies({ content }: { content: PortfolioContent }) {
  return (
    <section id="case-studies" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-24 max-sm:w-[calc(100%-28px)]">
      <div className="grid grid-cols-[.86fr_1.14fr] gap-20 pb-9 max-lg:grid-cols-1">
        <SectionHeading label={content.sections.caseStudies.label} title={content.sections.caseStudies.title} />
        <RevealBlock>
          <p className="text-base leading-8 text-neutral-600">{content.sections.caseStudies.body}</p>
        </RevealBlock>
      </div>

      <div className="grid gap-6">
        {content.caseStudies.map((study, index) => (
          <div key={study.id} id={`case-${study.id}`} className="scroll-mt-32">
            <RevealArticle delay={index * 0.08}>
              <LiquidGlass className="grid grid-cols-[minmax(0,1.08fr)_minmax(320px,.92fr)] gap-8 p-7 md:p-9 max-lg:grid-cols-1">
                <div className="relative z-[1]">
                  <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{study.eyebrow}</p>
                  <h3 className="apple-display-text mt-4 text-[clamp(1.85rem,3vw,3.2rem)] leading-[1.02] text-neutral-950">
                    {study.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">{study.summary}</p>
                  <ProjectDetailMenu studyId={study.id} labels={content.caseStudyLabels} className="mt-6" />

                  <div className="mt-8 border-t border-white/55 pt-6">
                    <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.problem}</h4>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">{study.problem}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-8 max-md:grid-cols-1">
                    <div>
                      <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.method}</h4>
                      <ul className="mt-3 grid gap-3 text-sm leading-7 text-neutral-600">
                        {study.method.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.result}</h4>
                      <ul className="mt-3 grid gap-3 text-sm leading-7 text-neutral-600">
                        {study.results.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id={`case-${study.id}-conclusion`} className="mt-8 scroll-mt-32 border-t border-white/55 pt-6">
                    <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.conclusion}</h4>
                    <ul className="mt-3 grid gap-3 text-sm leading-7 text-neutral-600">
                      {study.conclusion.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/70" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="glass" size="sm" className="mt-6 w-fit gap-2">
                      <a href="#projects">
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        {content.caseStudyLabels.backToProjects}
                      </a>
                    </Button>
                  </div>

                  {study.href && study.linkLabel ? (
                    <Button asChild variant="glass" size="sm" className="mt-6 w-fit gap-2">
                      <a href={study.href} target="_blank" rel="noreferrer">
                        {study.linkLabel} <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : null}
                </div>

                <div className="relative z-[1] flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    {study.metrics.map((metric) => (
                      <div key={`${study.id}-${metric.label}`} className="border-t border-white/60 pt-4">
                        <span className="apple-display-text block text-[clamp(1.45rem,2.5vw,2.35rem)] leading-none text-neutral-950">
                          {metric.value}
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-neutral-500">{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <div id={`case-${study.id}-screenshots`} className="scroll-mt-32 border-t border-white/55 pt-5">
                    <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.screenshots}</h4>
                    <div className="mt-4 grid gap-5">
                      {study.screenshots.map((screenshot) => (
                        <figure key={screenshot.src}>
                          <div className="overflow-hidden rounded-lg border border-white/65 bg-white/42 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_18px_42px_rgba(46,61,82,.1)] backdrop-blur-2xl">
                            <img
                              className="max-h-[360px] w-full object-contain"
                              src={publicAssetPath(screenshot.src)}
                              alt={screenshot.alt}
                              loading="lazy"
                            />
                          </div>
                          <figcaption className="mt-3">
                            <span className="text-sm font-semibold text-neutral-900">{screenshot.title}</span>
                            <p className="mt-1 text-sm leading-7 text-neutral-600">{screenshot.caption}</p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/55 pt-5">
                    <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.evidence}</h4>
                    <div className="mt-4 grid gap-4">
                      {study.evidence.map((item) => (
                        <article key={item.title}>
                          <h5 className="text-sm font-semibold text-neutral-900">{item.title}</h5>
                          <p className="mt-1 text-sm leading-7 text-neutral-600">{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div id={`case-${study.id}-code`} className="scroll-mt-32 border-t border-white/55 pt-5">
                    <h4 className="apple-display-text text-lg text-neutral-900">{content.caseStudyLabels.code}</h4>
                    <div className="mt-4 grid gap-4">
                      {study.codeSamples.map((sample) => (
                        <div key={`${study.id}-${sample.label}`} className="overflow-hidden rounded-lg border border-white/65 bg-white/42 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_18px_42px_rgba(46,61,82,.1)] backdrop-blur-2xl">
                          <div className="flex items-center justify-between gap-4 border-b border-white/55 px-4 py-3">
                            <span className="text-xs font-semibold text-neutral-600">{sample.label}</span>
                            <span className="text-xs text-blue-600">{sample.language}</span>
                          </div>
                          <pre className="overflow-x-auto p-4 text-[0.78rem] leading-6 text-neutral-700">
                            <code>{sample.lines.join("\n")}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </RevealArticle>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceShowcase({ content }: { content: PortfolioContent }) {
  return (
    <div className="h-full overflow-hidden bg-[radial-gradient(circle_at_12%_2%,rgba(0,122,255,.12),transparent_18%),radial-gradient(circle_at_8%_92%,rgba(21,214,180,.15),transparent_28%),linear-gradient(135deg,#f9fbff_0%,#eef5f8_52%,#f8f9fc_100%)] p-5 md:p-8">
      <div className="mx-auto max-w-[760px]">
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{content.sections.experience.label}</p>
        <LiquidGlass className="mt-5">
          {content.experiences.map((item, index) => (
            <RevealArticle key={item.role} className={index > 0 ? "border-t border-white/50 p-5 md:p-6" : "p-5 md:p-6"} delay={index * 0.08}>
              <time className="text-sm leading-6 text-neutral-500">{item.date}</time>
              <h3 className="apple-display-text mt-1 text-lg text-neutral-900">{item.role}</h3>
              <p className="mt-1 text-sm text-neutral-500">{item.company}</p>
              <ul className="mt-4 list-disc pl-5 text-sm leading-6 text-neutral-600">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
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
                <p className="mt-3 text-sm leading-7 text-neutral-600">{skill.body}</p>
              </RevealArticle>
            ))}
          </LiquidGlass>
        </div>
      </section>
    </>
  );
}

function EducationAwards({ content }: { content: PortfolioContent }) {
  return (
    <section id="education" className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-[.82fr_1.18fr] gap-20 pt-32 max-lg:grid-cols-1 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
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
    </section>
  );
}

function Contact({ content }: { content: PortfolioContent }) {
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
      <a className="transition hover:text-blue-700" href="#top">
        {content.actions.backToTop}
      </a>
    </footer>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const content = portfolioByLanguage[language];

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  return (
    <>
      <BackgroundComponents />
      <DataCanvas />
      <HelloIntro />
      <Header content={content} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero content={content} />
        <Metrics content={content} />
        <About content={content} />
        <Projects content={content} />
        <CaseStudies content={content} />
        <ExperienceSkills content={content} />
        <EducationAwards content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
