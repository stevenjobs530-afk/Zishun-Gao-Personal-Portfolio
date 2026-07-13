import { Activity, Dumbbell, Target } from "lucide-react";
import { useState } from "react";
import { ConceptNotice, GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { progressViews, type ProgressView } from "./concept-data";

const progressCopy: Record<ProgressView, { chart: string; machine: string; values: [number, number, number] }> = {
  Daily: { chart: "Daily training rhythm", machine: "Daily activity balance", values: [58, 43, 66] },
  Weekly: { chart: "Weekly training rhythm", machine: "Machine-specific progress", values: [72, 61, 77] },
  Exercise: { chart: "Exercise progress direction", machine: "Exercise-specific progress", values: [66, 74, 59] },
  Machine: { chart: "Machine training rhythm", machine: "Machine-specific progress", values: [79, 68, 73] },
};

function ProgressCanvas({ view }: { view: ProgressView }) {
  const copy = progressCopy[view];

  return (
    <div className="pt-progress-canvas" id="progress-panel" role="tabpanel" aria-label={`${view} future concept preview`}>
      <div className="pt-progress-ring-panel">
        <div className="pt-activity-rings" aria-label="Illustrative activity rings">
          <i /><i /><i />
        </div>
        <div className="pt-ring-legend"><span>Strength</span><span>Cardio</span><span>Recovery</span></div>
      </div>
      <div className="pt-progress-chart">
        <h3>{copy.chart}</h3>
        <svg viewBox="0 0 560 190" role="img" aria-label={`Illustrative ${view.toLowerCase()} line chart`}>
          <defs>
            <linearGradient id={`progress-area-${view}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2875ff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#2875ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="pt-chart-grid" d="M10 45H550M10 95H550M10 145H550" />
          <path fill={`url(#progress-area-${view})`} d="M10 140 C45 132,55 91,85 112 S125 62,155 98 S210 118,240 76 S285 100,320 54 S370 34,395 74 S445 36,475 79 S520 102,550 118 L550 170 L10 170 Z" />
          <path className="pt-chart-line" d="M10 140 C45 132,55 91,85 112 S125 62,155 98 S210 118,240 76 S285 100,320 54 S370 34,395 74 S445 36,475 79 S520 102,550 118" />
          <circle cx="350" cy="48" r="7" />
          <path className="pt-chart-marker" d="M350 55V166" />
        </svg>
        <div className="pt-chart-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
      </div>
      <div className="pt-progress-sliders">
        <h3>{copy.machine}</h3>
        <div className="pt-machine-select"><Dumbbell aria-hidden="true" /> Cable Row Station <span>⌄</span></div>
        <div className="pt-progress-bars">
          {(["Working-set load", "Training volume", "Consistency"] as const).map((label, index) => (
            <div key={label}>
              <span>{label}</span>
              <i><b style={{ width: `${copy.values[index]}%` }} /><em style={{ left: `${copy.values[index]}%` }} /></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgressSection() {
  const [view, setView] = useState<ProgressView>("Weekly");

  return (
    <section id="progress" className="pt-progress-section pt-shell">
      <Reveal className="pt-progress-copy-column">
        <span className="pt-future-badge"><span aria-hidden="true" /> Future Concept</span>
        <SectionCopy
          label="Progress Direction"
          title={<>From records to a<br />clearer training story.</>}
          body={<p>A planned direction for daily analysis, weekly trends and exercise-specific progress.</p>}
        />
        <div className="pt-progress-promises">
          <article><Target aria-hidden="true" /><span><strong>Training category distribution</strong><small>Understand how time could be balanced across strength, cardio and recovery.</small></span></article>
          <article><Activity aria-hidden="true" /><span><strong>Exercise progress</strong><small>Explore long-term changes in working loads and training volume.</small></span></article>
          <article><span className="pt-mini-rings" aria-hidden="true"><i /><i /></span><span><strong>More detailed activity rings</strong><small>A deeper view of consistency, balance and recovery over time.</small></span></article>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassPanel className="pt-progress-panel">
          <div className="pt-progress-heading">
            <h3>Progress concept</h3>
            <div className="pt-progress-tabs" role="tablist" aria-label="Progress concept views">
              {progressViews.map((item) => (
                <button key={item} type="button" role="tab" aria-selected={view === item} aria-controls="progress-panel" className={view === item ? "is-selected" : ""} onClick={() => setView(item)}>{item}</button>
              ))}
            </div>
          </div>
          <ProgressCanvas view={view} />
          <ConceptNotice><strong>Illustrative preview · Not a live feature</strong><span aria-hidden="true">·</span> This is a conceptual direction to explore richer progress insights.</ConceptNotice>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
