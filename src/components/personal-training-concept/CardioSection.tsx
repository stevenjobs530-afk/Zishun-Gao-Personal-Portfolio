import { Activity, ArrowRight, Bike, Check, Clock3, Flame, Footprints, Info, MapPin, PersonStanding, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { cardioShowcase, type CardioType } from "./concept-data";

const cardioIcons = {
  Walking: Footprints,
  Running: PersonStanding,
  Cycling: Bike,
  Elliptical: Activity,
} satisfies Record<CardioType, typeof Activity>;

const days = [
  ["Mon", "strength"],
  ["Tue", "cardio"],
  ["Wed", "strength"],
  ["Thu", "cardio"],
  ["Fri", "rest"],
  ["Sat", "blank"],
  ["Sun", "strength"],
] as const;

export function CardioSection() {
  const [selectedType, setSelectedType] = useState<CardioType>("Running");
  const [confirmation, setConfirmation] = useState("Fictional data · Nothing is stored");
  const metrics = cardioShowcase[selectedType];
  const SelectedIcon = cardioIcons[selectedType];

  return (
    <section id="cardio" className="pt-story-section pt-shell pt-cardio-section">
      <Reveal>
        <SectionCopy
          label="Cardio & Recovery"
          title={<>Move. Recover.<br />See the whole week.</>}
          body={<p>Strength, cardio and rest remain distinct—then come together in one clear activity history.</p>}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="pt-cardio-stack">
          <GlassPanel className="pt-cardio-entry">
            <h3>Cardio entry</h3>
            <div className="pt-cardio-types" aria-label="Cardio type">
              {(Object.keys(cardioShowcase) as CardioType[]).map((type) => {
                const Icon = cardioIcons[type];
                return (
                  <button key={type} type="button" className={selectedType === type ? "is-selected" : ""} aria-pressed={selectedType === type} onClick={() => { setSelectedType(type); setConfirmation(`${type} preview selected. Nothing has been recorded.`); }}>
                    <Icon aria-hidden="true" /> {type}
                  </button>
                );
              })}
            </div>
            <div className="pt-cardio-detail">
              <span><SelectedIcon aria-hidden="true" /></span>
              <strong>{metrics.detail}</strong>
            </div>
            <div className="pt-cardio-metrics">
              <article><span>Duration</span><strong>{metrics.duration}<small>min</small></strong><Clock3 aria-hidden="true" /></article>
              <article><span>Distance</span><strong>{metrics.distance}<small>km</small></strong><MapPin aria-hidden="true" /></article>
              <article><span>kcal logged</span><strong>{metrics.calories}<small>kcal</small></strong><Flame aria-hidden="true" /></article>
            </div>
            <button className="pt-primary-button pt-cardio-add" type="button" onClick={() => setConfirmation(`Showcase entry added for ${selectedType}. It exists only in React memory and was not stored.`)}>
              Add showcase entry <span><ArrowRight aria-hidden="true" /></span>
            </button>
          </GlassPanel>
          <GlassPanel className="pt-activity-status">
            <div className="pt-activity-heading">
              <h3>Daily activity status</h3>
              <div className="pt-activity-legend" aria-label="Activity status legend">
                <span><i className="pt-status-dot pt-status-dot--strength" /> Strength</span>
                <span><i className="pt-status-dot pt-status-dot--cardio" /> Cardio</span>
                <span><i className="pt-status-dot pt-status-dot--rest"><Check aria-hidden="true" /></i> Rest Day</span>
                <span><i className="pt-status-dot pt-status-dot--blank" /> Blank</span>
              </div>
            </div>
            <div className="pt-activity-days">
              {days.map(([day, status]) => (
                <div key={day}>
                  <strong>{day}</strong>
                  <i className={`pt-status-dot pt-status-dot--${status}`}>{status === "rest" ? <Check aria-hidden="true" /> : null}</i>
                  <span>{status === "rest" ? "Rest Day" : ""}</span>
                </div>
              ))}
            </div>
            <div className="pt-cardio-notes">
              <p><Info aria-hidden="true" /> A Rest Day is a record, not an automatic health judgement.</p>
              <p aria-live="polite"><ShieldCheck aria-hidden="true" /> {confirmation}</p>
            </div>
          </GlassPanel>
        </div>
      </Reveal>
    </section>
  );
}
