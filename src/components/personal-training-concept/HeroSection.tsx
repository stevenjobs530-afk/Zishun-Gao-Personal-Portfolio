import { ArrowDown, ArrowRight, Check, Dumbbell, HeartPulse, Leaf, Mouse } from "lucide-react";
import { GlassPanel, Reveal } from "./ConceptPrimitives";
import { scrollToConceptSection } from "./concept-utils";

const week = [
  ["Mon", "19", "strength"],
  ["Tue", "20", "cardio"],
  ["Wed", "21", "rest"],
  ["Thu", "22", "strength"],
  ["Fri", "23", "cardio"],
  ["Sat", "24", "blank"],
  ["Sun", "25", "blank"],
] as const;

function DashboardCard({
  kind,
  title,
  subtitle,
  meta,
}: {
  kind: "strength" | "cardio" | "rest";
  title: string;
  subtitle: string;
  meta: string;
}) {
  const Icon = kind === "strength" ? Dumbbell : kind === "cardio" ? HeartPulse : Leaf;

  return (
    <article className={`pt-dashboard-card pt-dashboard-card--${kind}`}>
      <span className="pt-round-icon">
        <Icon aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <div>
        <span>{meta}</span>
        <ArrowRight aria-hidden="true" />
      </div>
    </article>
  );
}

function HeroDashboard() {
  return (
    <GlassPanel className="pt-dashboard-shell">
      <div className="pt-dashboard-heading">
        <div>
          <h2>Today</h2>
          <p>Monday 19 May · Fictional preview</p>
        </div>
        <span className="pt-dashboard-sun" aria-hidden="true">✦</span>
      </div>
      <div className="pt-dashboard-cards">
        <DashboardCard kind="strength" title="Strength" subtitle="Lower Body" meta="45–60 min" />
        <DashboardCard kind="cardio" title="Cardio" subtitle="Zone 2 Endurance" meta="30–45 min" />
        <DashboardCard kind="rest" title="Rest Day" subtitle="Recovery Focus" meta="Mobility & Sleep" />
      </div>
      <div className="pt-week-panel">
        <div className="pt-week-heading">
          <strong>This week</strong>
          <span>Week 21 · 19–25 May</span>
        </div>
        <div className="pt-week-row">
          {week.map(([day, date, kind]) => (
            <div key={day} className="pt-week-day">
              <span>{day}</span>
              <strong>{date}</strong>
              <i className={`pt-status-dot pt-status-dot--${kind}`}>
                {kind === "rest" ? <Check aria-hidden="true" /> : null}
              </i>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-focus-row">
        <strong>Focus this week</strong>
        <span><Dumbbell aria-hidden="true" /> Strength <small>2 sessions</small></span>
        <span><HeartPulse aria-hidden="true" /> Cardio <small>2 sessions</small></span>
        <span><Leaf aria-hidden="true" /> Recovery <small>5 days</small></span>
      </div>
    </GlassPanel>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="pt-hero pt-shell">
      <Reveal className="pt-hero-copy">
        <h1>Personal<br />Training<br />Website V2</h1>
        <p className="pt-hero-positioning">Built around your gym.<br /><strong>Structured around your training.</strong></p>
        <p className="pt-hero-description">A highly customisable system for strength, cardio and recovery.</p>
        <button className="pt-primary-button" type="button" onClick={() => scrollToConceptSection("philosophy")}>
          Explore the concept <span><ArrowRight aria-hidden="true" /></span>
        </button>
        <p className="pt-disclosure">Fictional data · No sign-in · No data collection</p>
        <button className="pt-scroll-prompt" type="button" onClick={() => scrollToConceptSection("philosophy")}>
          <Mouse aria-hidden="true" /> Scroll to explore <ArrowDown aria-hidden="true" />
        </button>
      </Reveal>
      <Reveal className="pt-hero-dashboard" delay={0.12}>
        <HeroDashboard />
      </Reveal>
    </section>
  );
}
