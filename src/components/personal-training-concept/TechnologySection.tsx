import { AppWindow, ArrowRight, ArrowUp, Ban, BarChart3, Database, Dumbbell, LockKeyhole, Monitor, ShieldCheck, UserRound } from "lucide-react";
import { GlassPanel, Reveal } from "./ConceptPrimitives";
import { architectureSteps } from "./concept-data";
import { scrollToConceptSection } from "./concept-utils";

const architectureIcons = [Monitor, AppWindow, ShieldCheck, Database, BarChart3] as const;

export function TechnologySection() {
  return (
    <section id="technology" className="pt-technology-section pt-shell">
      <Reveal>
        <div className="pt-technology-title">
          <span className="pt-future-badge"><span aria-hidden="true" /> Technology Overview</span>
          <h2>Designed to keep<br />private training private.</h2>
          <p>A simplified view of the intended product architecture.</p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <GlassPanel className="pt-architecture-panel">
          <div className="pt-architecture-flow">
            {architectureSteps.map((step, index) => {
              const Icon = architectureIcons[index];
              return (
                <div className="pt-architecture-step-wrap" key={step.title}>
                  <article className="pt-architecture-step">
                    <span className="pt-step-number">{index + 1}</span>
                    <span className="pt-architecture-icon"><Icon aria-hidden="true" /></span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                  {index < architectureSteps.length - 1 ? <ArrowRight className="pt-architecture-arrow" aria-hidden="true" /> : null}
                </div>
              );
            })}
          </div>
        </GlassPanel>
        <GlassPanel className="pt-privacy-strip">
          <article><span><LockKeyhole aria-hidden="true" /></span><div><strong>Login-protected product</strong><p>Access is required to view and use the intended system.</p></div></article>
          <article><span><UserRound aria-hidden="true" /></span><div><strong>User-level data access</strong><p>Users can only access their own information.</p></div></article>
          <article><span><Ban aria-hidden="true" /></span><div><strong>No public registration</strong><p>Sign-ups are disabled in this conceptual showcase.</p></div></article>
          <p className="pt-privacy-disclosure"><strong>Concept showcase only</strong><span>·</span> No live database connection <span>·</span> No data collection</p>
        </GlassPanel>
      </Reveal>
      <footer className="pt-concept-footer">
        <div className="pt-footer-brand">
          <span><Dumbbell aria-hidden="true" /></span>
          <div><strong>Personal Training Website V2</strong><p>A local design exploration of a highly customisable training system.</p></div>
        </div>
        <button type="button" onClick={() => scrollToConceptSection("top")}><ArrowUp aria-hidden="true" /> Back to top</button>
      </footer>
    </section>
  );
}
