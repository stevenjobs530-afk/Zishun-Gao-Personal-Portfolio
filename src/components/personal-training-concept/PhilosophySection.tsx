import { ArrowRight, BookOpen } from "lucide-react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { defaultTrainingLibraryItems } from "./concept-data";

const philosophyMachines = defaultTrainingLibraryItems.slice(0, 3);

export function PhilosophySection() {
  return (
    <section id="philosophy" className="pt-story-section pt-shell pt-philosophy">
      <Reveal>
        <SectionCopy
          label="Design motivation"
          title="Why I started this project"
          body={
            <>
              <p>Different gyms can have very different equipment, layouts and naming conventions. A fixed exercise catalogue cannot describe every machine or the way each person understands their training environment.</p>
              <blockquote>
                The software should adapt to the user’s gym and training style, rather than forcing the user to adapt to a fixed exercise catalogue.
              </blockquote>
              <p className="pt-philosophy-close">This project explores a personal library in which people can define their own exercise, equipment and progress names.</p>
            </>
          }
        />
      </Reveal>
      <Reveal delay={0.1}>
        <GlassPanel className="pt-philosophy-visual">
          <div className="pt-philosophy-sources">
            {philosophyMachines.map((item, index) => (
              <article key={item.id}>
                <strong>{index === 0 ? "Cable Area" : index === 1 ? "Plate Loaded" : "Assisted"}</strong>
                {item.image ? <img src={item.image} alt="" /> : null}
              </article>
            ))}
          </div>
          <div className="pt-philosophy-flow" aria-hidden="true">
            <span />
            <ArrowRight />
          </div>
          <div className="pt-philosophy-library">
            <div className="pt-philosophy-library-title">
              <strong>My Training Library</strong>
              <BookOpen aria-hidden="true" />
            </div>
            {philosophyMachines.map((item) => (
              <article key={item.id}>
                {item.image ? <img src={item.image} alt="" /> : null}
                <span><strong>{item.trainingName}</strong><small>{item.category}</small></span>
                <ArrowRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
