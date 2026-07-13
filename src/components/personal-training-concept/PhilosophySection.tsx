import { ArrowRight, BookOpen } from "lucide-react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { libraryItems } from "./concept-data";

const philosophyMachines = libraryItems.slice(0, 3);

export function PhilosophySection() {
  return (
    <section id="philosophy" className="pt-story-section pt-shell pt-philosophy">
      <Reveal>
        <SectionCopy
          label="Product Philosophy"
          title={<>Every gym<br />is different.</>}
          body={
            <>
              <p>Fixed exercise catalogues cannot reflect every machine, setup or training style.</p>
              <blockquote>
                The software should adapt to the user’s gym and training style, rather than forcing the user to adapt to a fixed exercise catalogue.
              </blockquote>
              <p className="pt-philosophy-close">Create your own exercises. Name your own equipment.<br />Build a training library that feels like your gym.</p>
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
                <span><strong>{item.name}</strong><small>{item.category}</small></span>
                <ArrowRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
