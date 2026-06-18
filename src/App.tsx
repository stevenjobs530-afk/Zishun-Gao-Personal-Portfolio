import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Animated3DCard } from "@/components/ui/animated-3d-card";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { BackgroundComponents } from "@/components/ui/background-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { RevealArticle, RevealBlock, RevealListItem, StaggerBlock, StaggerItem } from "@/components/ui/text-animations";
import { DataCanvas } from "@/components/DataCanvas";
import { HelloIntro } from "@/components/HelloIntro";
import { ProjectVisual } from "@/components/ProjectVisual";
import { awards, education, experiences, metrics, profile, projects, skills } from "@/data/portfolio";

const navItems = ["About", "Projects", "Experience", "Skills", "Education", "Contact"];

function Header() {
  return (
    <header className="fixed left-1/2 top-5 z-30 flex w-[min(1180px,calc(100%-40px))] -translate-x-1/2 items-center justify-between gap-5 rounded-lg border border-white/80 bg-white/55 px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_18px_55px_rgba(46,61,82,.14)] backdrop-blur-[44px] backdrop-saturate-150 max-sm:top-3 max-sm:w-[calc(100%-28px)]">
      <a className="text-sm font-semibold text-neutral-950" href="#top">
        Zishun <span className="text-neutral-500">Gao</span>
      </a>
      <nav className="flex items-center gap-5 text-xs font-medium text-neutral-600 max-lg:hidden" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} className="transition hover:text-blue-700" href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
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

function Hero() {
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
            View Projects
          </GlassButton>
          <GlassButton
            className="h-12 min-w-36 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            title="CV download will be added later"
          >
            Download CV
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
            Email Me
          </a>
        </StaggerItem>
      </StaggerBlock>
      <RevealBlock delay={0.35}>
        <HeroGraphic />
      </RevealBlock>
    </section>
  );
}

function Metrics() {
  return (
    <RevealBlock>
      <LiquidGlass className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-4 divide-x divide-white/50 max-lg:grid-cols-2 max-lg:divide-x-0 max-sm:w-[calc(100%-28px)] max-sm:grid-cols-1">
        {metrics.map((metric) => (
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

function About() {
  return (
    <section id="about" className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-[.82fr_1.18fr] gap-20 pt-32 max-lg:grid-cols-1 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
      <SectionHeading label="About" title="Business context, data discipline and practical execution." />
      <div className="flex flex-col gap-5 text-base leading-8 text-neutral-600">
        {profile.about.map((paragraph, index) => (
          <RevealBlock key={paragraph} delay={index * 0.08}>
            <p>{paragraph}</p>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-32 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
      <div className="flex items-end justify-between gap-6 pb-9 max-lg:flex-col max-lg:items-start">
        <SectionHeading label="Featured Projects" title="Evidence-led portfolio work." />
        <Button asChild variant="glass" size="sm" className="gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer">
            View GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {projects.map((project, index) => (
          <Animated3DCard key={project.title} delay={index * 0.08}>
            <Card className="min-h-[560px] overflow-hidden">
              <ProjectVisual visual={project.visual} />
              <CardHeader>
                <CardTitle className="transition-transform duration-500 group-hover/animated-card:-translate-y-1">{project.title}</CardTitle>
                <CardDescription className="transition-opacity duration-500 group-hover/animated-card:text-neutral-700">{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                {project.href ? (
                  <Button asChild variant="glass" size="sm" className="w-fit gap-2">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      View Project <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="glass" size="sm" className="w-fit">
                    <a href="#contact">Discuss Project</a>
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

function ExperienceShowcase() {
  return (
    <div className="h-full overflow-hidden bg-[radial-gradient(circle_at_12%_2%,rgba(0,122,255,.12),transparent_18%),radial-gradient(circle_at_8%_92%,rgba(21,214,180,.15),transparent_28%),linear-gradient(135deg,#f9fbff_0%,#eef5f8_52%,#f8f9fc_100%)] p-5 md:p-8">
      <div className="mx-auto max-w-[760px]">
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">Experience</p>
        <LiquidGlass className="mt-5">
          {experiences.map((item, index) => (
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

function ExperienceSkills() {
  return (
    <>
      <section id="experience" className="pt-24 max-sm:pt-16">
        <ContainerScroll
          titleComponent={
            <StaggerBlock>
              <StaggerItem>
                <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">Experience</p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="apple-display-text mx-auto mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] leading-[.95] text-neutral-900">
                  Experience shaped into practical reporting.
                </h2>
              </StaggerItem>
            </StaggerBlock>
          }
        >
          <ExperienceShowcase />
        </ContainerScroll>
      </section>

      <section id="skills" className="mx-auto w-[min(1180px,calc(100%-40px))] pt-12 max-sm:w-[calc(100%-28px)]">
        <div className="grid grid-cols-[.82fr_1.18fr] gap-20 max-lg:grid-cols-1">
          <SectionHeading label="Skills" title="A practical stack for analysis, reporting and business context." />
          <LiquidGlass>
            {skills.map((skill, index) => (
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

function EducationAwards() {
  return (
    <section id="education" className="mx-auto grid w-[min(1180px,calc(100%-40px))] grid-cols-[.82fr_1.18fr] gap-20 pt-32 max-lg:grid-cols-1 max-sm:w-[calc(100%-28px)] max-sm:pt-24">
      <div>
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">Education</p>
        <LiquidGlass className="mt-5">
          {education.map((item, index) => (
            <RevealArticle key={item.school} className={index > 0 ? "border-t border-white/50 p-7" : "p-7"} delay={index * 0.07}>
              <h3 className="apple-display-text text-lg text-neutral-900">{item.school}</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">{item.detail}</p>
              <span className="text-sm leading-7 text-neutral-500">{item.meta}</span>
            </RevealArticle>
          ))}
        </LiquidGlass>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">Awards</p>
        <LiquidGlass className="mt-5">
          <ul className="list-none">
            {awards.map((award, index) => (
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

function Contact() {
  return (
    <section id="contact" className="mx-auto mt-32 w-[min(1180px,calc(100%-40px))] max-sm:mt-24 max-sm:w-[calc(100%-28px)]">
      <RevealBlock>
        <LiquidGlass className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-11 p-12 max-lg:grid-cols-1 max-sm:p-7">
          <StaggerBlock>
            <StaggerItem>
              <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">Contact</p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="apple-display-text mt-4 text-[clamp(2.25rem,5vw,4.8rem)] leading-none text-neutral-900">
                Let&apos;s connect.
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">
                I am open to data analyst, BI analyst, business analyst, finance analyst and graduate scheme opportunities.
              </p>
            </StaggerItem>
          </StaggerBlock>
        <div className="grid min-w-64 gap-3 max-lg:min-w-0">
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => {
              window.location.href = `mailto:${profile.email}`;
            }}
          >
            {profile.email}
          </GlassButton>
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => window.open(profile.linkedin, "_blank", "noopener,noreferrer")}
          >
            LinkedIn
          </GlassButton>
          <GlassButton
            className="h-12 text-neutral-950"
            glassColor="oklch(from var(--foreground) l c h / 5%)"
            onClick={() => window.open(profile.github, "_blank", "noopener,noreferrer")}
          >
            GitHub
          </GlassButton>
        </div>
        </LiquidGlass>
      </RevealBlock>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex w-[min(1180px,calc(100%-40px))] items-center justify-between gap-5 py-12 text-sm text-neutral-500 max-sm:w-[calc(100%-28px)] max-sm:flex-col max-sm:items-start">
      <span>© 2026 Zishun Gao. All rights reserved.</span>
      <a className="transition hover:text-blue-700" href="#top">
        Back to top
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <BackgroundComponents />
      <DataCanvas />
      <HelloIntro />
      <Header />
      <main>
        <Hero />
        <Metrics />
        <About />
        <Projects />
        <ExperienceSkills />
        <EducationAwards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
