import { Check, Dumbbell, Info, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";

type SetKind = "Warm-up" | "Working";

type RecordedSet = {
  id: number;
  kind: SetKind;
  weight: number;
  reps: number;
};

const initialSets: RecordedSet[] = [
  { id: 1, kind: "Warm-up", weight: 30, reps: 12 },
  { id: 2, kind: "Working", weight: 50, reps: 10 },
  { id: 3, kind: "Working", weight: 55, reps: 10 },
];

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export function StrengthSection() {
  const [kind, setKind] = useState<SetKind>("Working");
  const [weight, setWeight] = useState(55);
  const [reps, setReps] = useState(10);
  const [setNumber, setSetNumber] = useState(3);
  const [recordedSets, setRecordedSets] = useState(initialSets);
  const [timer, setTimer] = useState(102);
  const [timerRunning, setTimerRunning] = useState(false);
  const [savedMessage, setSavedMessage] = useState("Fictional session · Nothing is saved");

  useEffect(() => {
    if (!timerRunning || timer <= 0) {
      return;
    }

    const interval = window.setInterval(() => setTimer((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timer, timerRunning]);

  function saveShowcaseSet() {
    const newSet: RecordedSet = { id: Date.now(), kind, weight, reps };
    setRecordedSets((sets) => [...sets, newSet]);
    setSetNumber((current) => current + 1);
    setTimer(120);
    setTimerRunning(true);
    setSavedMessage(`${kind} set ${setNumber} added to this in-memory preview. Refreshing clears it.`);
  }

  return (
    <section id="strength" className="pt-story-section pt-shell pt-strength-section">
      <Reveal>
        <SectionCopy
          label="Strength Training"
          title={<>Record the set.<br />Keep the rhythm.</>}
          body={<p>Warm-up and working sets stay clear, fast and connected to your own exercise library.</p>}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <GlassPanel className="pt-strength-panel">
          <div className="pt-session-heading">
            <h3>Demo Strength Session</h3>
            <p>13 July · Showcase only</p>
          </div>
          <div className="pt-strength-grid">
            <div className="pt-strength-form">
              <div className="pt-exercise-summary">
                <div className="pt-exercise-art">
                  <img src={`${import.meta.env.BASE_URL}personal-training-concept/plate-loaded-chest-press.png`} alt="Plate Loaded Chest Press fictional equipment render" />
                </div>
                <div>
                  <h3>Plate Loaded Chest Press</h3>
                  <p>Previous best · 62.5 kg × 8</p>
                </div>
              </div>
              <div className="pt-segmented-control" aria-label="Set type">
                {(["Warm-up", "Working"] as const).map((option) => (
                  <button key={option} type="button" className={kind === option ? "is-selected" : ""} aria-pressed={kind === option} onClick={() => setKind(option)}>
                    {option}
                  </button>
                ))}
              </div>
              <div className="pt-set-fields">
                <label>
                  <span>Weight</span>
                  <span className="pt-number-field"><input aria-label="Weight in kilograms" type="number" min="0" max="300" step="2.5" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><small>kg</small></span>
                </label>
                <label>
                  <span>Reps</span>
                  <span className="pt-number-field"><input aria-label="Repetitions" type="number" min="1" max="100" value={reps} onChange={(event) => setReps(Number(event.target.value))} /></span>
                </label>
                <label>
                  <span>Set</span>
                  <span className="pt-number-field"><input aria-label="Set number" type="number" min="1" max="50" value={setNumber} onChange={(event) => setSetNumber(Number(event.target.value))} /></span>
                </label>
              </div>
              <button className="pt-primary-button pt-save-set" type="button" onClick={saveShowcaseSet}>
                Save set + start rest <Check aria-hidden="true" />
              </button>
              <button className="pt-secondary-button pt-choose-exercise" type="button" onClick={() => setSavedMessage("Exercise switching is represented in the custom library above.")}>
                <RotateCcw aria-hidden="true" /> Choose another exercise
              </button>
              <div className="pt-inline-message" aria-live="polite"><Info aria-hidden="true" /> {savedMessage}</div>
            </div>
            <aside className="pt-recorded-sets" aria-label="Recorded showcase sets">
              <h3>Recorded sets</h3>
              <div className="pt-recorded-list">
                {recordedSets.slice(-4).map((set) => (
                  <div key={set.id}>
                    <span className={set.kind === "Working" ? "is-working" : ""} />
                    <strong>{set.kind}</strong>
                    <p>{set.weight} kg × {set.reps}</p>
                  </div>
                ))}
              </div>
              <div className="pt-rest-timer">
                <div>
                  <h3>Rest timer</h3>
                  <output aria-live="off">{formatTimer(timer)}</output>
                  <button type="button" onClick={() => setTimerRunning((running) => !running)}>{timerRunning ? "Pause" : "Resume"}</button>
                </div>
                <span className={timerRunning ? "is-running" : ""}><Dumbbell aria-hidden="true" /></span>
              </div>
            </aside>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
