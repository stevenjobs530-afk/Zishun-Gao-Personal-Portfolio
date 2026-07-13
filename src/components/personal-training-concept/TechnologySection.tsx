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
          <span className="pt-future-badge"><span aria-hidden="true" /> Technology overview</span>
          <h2>Separating the public showcase from the private product.</h2>
          <p>The diagram outlines the intended architecture for the private training product. This public portfolio showcase is a separate static React interface: it does not connect to Supabase, authenticate users or store training data.</p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <GlassPanel className="pt-architecture-panel">
          <h3 className="pt-architecture-heading">Intended private product architecture</h3>
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
          <article><span><LockKeyhole aria-hidden="true" /></span><div><strong>Private product intent</strong><p>The intended product architecture includes authenticated access.</p></div></article>
          <article><span><UserRound aria-hidden="true" /></span><div><strong>Scoped private records</strong><p>The private product is intended to keep each account’s records separate.</p></div></article>
          <article><span><Ban aria-hidden="true" /></span><div><strong>Static public showcase</strong><p>This portfolio page has no sign-in, database or data submission.</p></div></article>
          <p className="pt-privacy-disclosure"><strong>Public concept showcase</strong><span>·</span> Fictional data <span>·</span> No live database connection <span>·</span> No data collection</p>
        </GlassPanel>
      </Reveal>
      <footer className="pt-concept-footer">
        <div className="pt-footer-brand">
          <span><Dumbbell aria-hidden="true" /></span>
          <div><strong>Personal Training Website V2</strong><p>An ongoing personal project and interface study using fictional data and browser-only interactions.</p></div>
        </div>
        <div className="pt-footer-actions">
          <a href={import.meta.env.BASE_URL}><ArrowRight aria-hidden="true" /> Back to Portfolio</a>
          <button type="button" onClick={() => scrollToConceptSection("top")}><ArrowUp aria-hidden="true" /> Back to top</button>
        </div>
      </footer>
    </section>
  );
}
