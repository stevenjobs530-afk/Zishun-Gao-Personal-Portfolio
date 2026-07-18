import { Activity, BarChart3, Dumbbell, Plus, Target, Trash2 } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { ConceptNotice, GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { translateConceptText, type ConceptLanguage } from "./concept-i18n";
import {
  createConceptId,
  createIllustrativeSeries,
  directionLabels,
  normalizeConceptText,
  summariseIllustrativeSeries,
  summaryMethodLabels,
  type CustomProgressDefinition,
  type ProgressDirection,
  type ProgressSummaryMethod,
  type TrainingLibraryItem,
} from "./concept-model";

type ProgressDraft = {
  templateId: string;
  progressName: string;
  trainingName: string;
  equipmentName: string;
  metricName: string;
  unit: string;
  summaryMethod: ProgressSummaryMethod;
  direction: ProgressDirection | "";
};

type ProgressDraftErrors = Partial<Record<"progressName" | "trainingName" | "equipmentName" | "metricName" | "unit", string>>;

const emptyDraft: ProgressDraft = {
  templateId: "",
  progressName: "",
  trainingName: "",
  equipmentName: "",
  metricName: "",
  unit: "",
  summaryMethod: "latest",
  direction: "",
};

const metricSuggestions = [
  "Working-set load",
  "Repetitions",
  "Training volume",
  "Duration",
  "Distance",
  "Speed",
  "Resistance level",
  "Calories",
  "Consistency",
];

const unitSuggestions = ["kg", "lb", "reps", "sets", "minutes", "km", "miles", "kcal"];
const summaryMethods: ProgressSummaryMethod[] = ["latest", "maximum", "average", "total"];
const directions: ProgressDirection[] = ["increase", "decrease", "maintain"];
const seriesDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function validateDraft(draft: ProgressDraft) {
  const errors: ProgressDraftErrors = {};
  const fields = {
    progressName: normalizeConceptText(draft.progressName),
    trainingName: normalizeConceptText(draft.trainingName),
    equipmentName: normalizeConceptText(draft.equipmentName),
    metricName: normalizeConceptText(draft.metricName),
    unit: normalizeConceptText(draft.unit),
  };

  if (!fields.progressName) errors.progressName = "Enter a progress name.";
  else if (fields.progressName.length > 80) errors.progressName = "Use 80 characters or fewer.";

  if (!fields.trainingName) errors.trainingName = "Enter a training or exercise name.";
  else if (fields.trainingName.length > 80) errors.trainingName = "Use 80 characters or fewer.";

  if (fields.equipmentName.length > 80) errors.equipmentName = "Use 80 characters or fewer.";

  if (!fields.metricName) errors.metricName = "Enter a metric name.";
  else if (fields.metricName.length > 80) errors.metricName = "Use 80 characters or fewer.";

  if (!fields.unit) errors.unit = "Enter a unit.";
  else if (fields.unit.length > 24) errors.unit = "Use 24 characters or fewer.";

  return errors;
}

function ProgressCanvas({ definition }: { definition: CustomProgressDefinition }) {
  const gradientId = `progress-area-${useId().replace(/:/g, "")}`;
  const values = useMemo(() => createIllustrativeSeries(definition), [definition]);
  const summary = summariseIllustrativeSeries(values, definition.summaryMethod);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = Math.max(1, maximum - minimum);
  const points = values.map((value, index) => ({
    x: 24 + index * (508 / 6),
    y: 154 - ((value - minimum) / range) * 100,
  }));
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${points.at(-1)?.x ?? 532} 168 L${points[0]?.x ?? 24} 168 Z`;
  const latestPoint = points.at(-1);

  return (
    <div className="pt-custom-progress-canvas" aria-label={`${definition.progressName} concept preview`}>
      <div className="pt-progress-definition-meta">
        <div>
          <p>{definition.trainingName}</p>
          <h3>{definition.progressName}</h3>
          <span><Dumbbell aria-hidden="true" /> {definition.equipmentName || "No equipment specified"}</span>
        </div>
        <dl>
          <div><dt>Metric</dt><dd>{definition.metricName}</dd></div>
          <div><dt>Unit</dt><dd>{definition.unit}</dd></div>
          <div><dt>{summaryMethodLabels[definition.summaryMethod]}</dt><dd>{summary} {definition.unit}</dd></div>
        </dl>
      </div>
      <div className="pt-progress-chart pt-custom-progress-chart">
        <div className="pt-chart-heading">
          <h3>{definition.progressName}</h3>
          <span>{definition.metricName} · {definition.unit}</span>
        </div>
        <svg viewBox="0 0 560 190" role="img" aria-label={`Fixed fictional seven-day series for ${definition.metricName} in ${definition.unit}`}>
          <title>{definition.progressName}: illustrative data only</title>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2875ff" stopOpacity="0.24" />
              <stop offset="1" stopColor="#2875ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="pt-chart-grid" d="M20 45H540M20 95H540M20 145H540" />
          <path fill={`url(#${gradientId})`} d={areaPath} />
          <path className="pt-chart-line" d={linePath} />
          {latestPoint ? <circle cx={latestPoint.x} cy={latestPoint.y} r="7" /> : null}
        </svg>
        <div className="pt-chart-days">
          {seriesDays.map((day, index) => <span key={day}>{day}<small>{values[index]} {definition.unit}</small></span>)}
        </div>
      </div>
      <div className="pt-progress-disclosures" aria-label="Preview limitations">
        <span>Illustrative data</span><span>Concept preview</span><span>Not stored</span>
      </div>
    </div>
  );
}

export function ProgressSection({
  language,
  libraryItems,
  definitions,
  onAddDefinition,
  onDeleteDefinition,
}: {
  language: ConceptLanguage;
  libraryItems: TrainingLibraryItem[];
  definitions: CustomProgressDefinition[];
  onAddDefinition: (definition: CustomProgressDefinition) => void;
  onDeleteDefinition: (id: string) => void;
}) {
  const [selectedId, setSelectedId] = useState(definitions[0]?.id ?? "");
  const [isBuilding, setIsBuilding] = useState(false);
  const [draft, setDraft] = useState<ProgressDraft>(emptyDraft);
  const [errors, setErrors] = useState<ProgressDraftErrors>({});
  const [formStatus, setFormStatus] = useState("");
  const [announcement, setAnnouncement] = useState("Two preset examples are available. Custom definitions are cleared on refresh.");
  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const progressNameRef = useRef<HTMLInputElement | null>(null);
  const trainingNameRef = useRef<HTMLInputElement | null>(null);
  const equipmentNameRef = useRef<HTMLInputElement | null>(null);
  const metricNameRef = useRef<HTMLInputElement | null>(null);
  const unitRef = useRef<HTMLInputElement | null>(null);
  const selectedDefinition = definitions.find((definition) => definition.id === selectedId) ?? definitions[0];

  useEffect(() => {
    if (isBuilding) progressNameRef.current?.focus({ preventScroll: true });
  }, [isBuilding]);

  function closeBuilder({ restoreFocus = true }: { restoreFocus?: boolean } = {}) {
    setIsBuilding(false);
    setDraft(emptyDraft);
    setErrors({});
    setFormStatus("");
    if (restoreFocus) {
      window.requestAnimationFrame(() => addButtonRef.current?.focus({ preventScroll: true }));
    }
  }

  function updateDraftField(field: keyof ProgressDraftErrors, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormStatus("");
  }

  function handleTemplateChange(templateId: string) {
    const item = libraryItems.find((candidate) => candidate.id === templateId);
    setDraft((current) => ({
      ...current,
      templateId,
      trainingName: item?.trainingName ?? current.trainingName,
      equipmentName: item?.equipmentName ?? "",
    }));
    setErrors((current) => {
      if (!current.trainingName && !current.equipmentName) return current;
      const next = { ...current };
      delete next.trainingName;
      delete next.equipmentName;
      return next;
    });
    setFormStatus("");
  }

  function handleFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeBuilder();
    }
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus("Please correct the highlighted fields before creating this progress definition.");
      const firstInvalidField = ([
        ["progressName", progressNameRef],
        ["trainingName", trainingNameRef],
        ["equipmentName", equipmentNameRef],
        ["metricName", metricNameRef],
        ["unit", unitRef],
      ] as const).find(([field]) => nextErrors[field]);
      window.requestAnimationFrame(() => firstInvalidField?.[1].current?.focus({ preventScroll: true }));
      return;
    }

    const equipmentName = normalizeConceptText(draft.equipmentName);
    const definition: CustomProgressDefinition = {
      id: createConceptId("progress"),
      progressName: normalizeConceptText(draft.progressName),
      trainingName: normalizeConceptText(draft.trainingName),
      equipmentName: equipmentName || undefined,
      metricName: normalizeConceptText(draft.metricName),
      unit: normalizeConceptText(draft.unit),
      summaryMethod: draft.summaryMethod,
      direction: draft.direction || undefined,
      source: "user-created",
    };

    onAddDefinition(definition);
    setSelectedId(definition.id);
    setAnnouncement(`${definition.progressName} was created and selected. The chart uses a deterministic fictional series.`);
    closeBuilder();
  }

  function handleDelete(definition: CustomProgressDefinition) {
    if (definition.source !== "user-created") return;
    const confirmation = translateConceptText(
      `Remove “${definition.progressName}” from this browser-only preview?`,
      language,
    );
    if (!window.confirm(confirmation)) return;

    const remaining = definitions.filter((candidate) => candidate.id !== definition.id);
    onDeleteDefinition(definition.id);
    setSelectedId(remaining[0]?.id ?? "");
    setAnnouncement(`${definition.progressName} was removed. Preset definitions remain available.`);
  }

  return (
    <section id="progress" className="pt-progress-section pt-shell">
      <Reveal className="pt-progress-copy-column">
        <span className="pt-future-badge"><span aria-hidden="true" /> Concept preview</span>
        <SectionCopy
          label="Custom progress"
          title="Defining progress in the user’s own terms."
          body={<p>This browser-only builder demonstrates how a person could name a progress view, link it to any training or equipment entry, and define the metric, unit and summary method. The chart uses a fixed fictional series and is not an analysis of real training data.</p>}
        />
        <div className="pt-progress-promises">
          <article><Target aria-hidden="true" /><span><strong>Open training names</strong><small>Copy a library item or enter a completely new training and equipment name.</small></span></article>
          <article><Activity aria-hidden="true" /><span><strong>Custom metrics and units</strong><small>Suggestions help with common entries, but they do not restrict what can be typed.</small></span></article>
          <article><BarChart3 aria-hidden="true" /><span><strong>Browser-only output</strong><small>Every chart is illustrative, deterministic and cleared when the page refreshes.</small></span></article>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassPanel className="pt-progress-panel">
          <div className="pt-progress-heading">
            <div><h3>Progress definitions</h3><p>Choose an example or create another definition.</p></div>
            <button
              ref={addButtonRef}
              className="pt-primary-button pt-compact-button"
              type="button"
              aria-expanded={isBuilding}
              aria-controls="pt-progress-create-form"
              onClick={() => {
                setErrors({});
                setFormStatus("");
                setIsBuilding(true);
              }}
            >
              <Plus aria-hidden="true" /> Add progress
            </button>
          </div>

          {isBuilding ? (
            <form id="pt-progress-create-form" className="pt-concept-form pt-progress-create-form" noValidate onSubmit={handleCreate} onKeyDown={handleFormKeyDown}>
              <div className="pt-form-heading">
                <div><h3>Create a progress definition</h3><p>Library choices copy text into editable fields; they are not a fixed list.</p></div>
                <span>Required fields are marked *</span>
              </div>
              <div className="pt-form-grid">
                <label className="pt-form-field pt-form-field--wide">
                  <span>Copy from Library <small>Optional</small></span>
                  <select value={draft.templateId} onChange={(event) => handleTemplateChange(event.target.value)}>
                    <option value="">Choose a library item</option>
                    {libraryItems.map((item) => <option key={item.id} value={item.id}>{item.trainingName}{item.equipmentName ? ` · ${item.equipmentName}` : ""}</option>)}
                  </select>
                </label>
                <label className="pt-form-field pt-form-field--wide">
                  <span>Progress name *</span>
                  <input
                    ref={progressNameRef}
                    value={draft.progressName}
                    aria-invalid={Boolean(errors.progressName)}
                    aria-describedby={errors.progressName ? "progress-name-error" : undefined}
                    onChange={(event) => updateDraftField("progressName", event.target.value)}
                  />
                  {errors.progressName ? <small id="progress-name-error" className="pt-field-error">{errors.progressName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Training or exercise name *</span>
                  <input
                    ref={trainingNameRef}
                    value={draft.trainingName}
                    aria-invalid={Boolean(errors.trainingName)}
                    aria-describedby={errors.trainingName ? "progress-training-error" : undefined}
                    onChange={(event) => updateDraftField("trainingName", event.target.value)}
                  />
                  {errors.trainingName ? <small id="progress-training-error" className="pt-field-error">{errors.trainingName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Equipment name <small>Optional</small></span>
                  <input
                    ref={equipmentNameRef}
                    value={draft.equipmentName}
                    aria-invalid={Boolean(errors.equipmentName)}
                    aria-describedby={errors.equipmentName ? "progress-equipment-error" : undefined}
                    onChange={(event) => updateDraftField("equipmentName", event.target.value)}
                  />
                  {errors.equipmentName ? <small id="progress-equipment-error" className="pt-field-error">{errors.equipmentName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Metric name *</span>
                  <input
                    ref={metricNameRef}
                    value={draft.metricName}
                    list="pt-progress-metric-options"
                    aria-invalid={Boolean(errors.metricName)}
                    aria-describedby={errors.metricName ? "progress-metric-error" : undefined}
                    onChange={(event) => updateDraftField("metricName", event.target.value)}
                  />
                  <datalist id="pt-progress-metric-options">{metricSuggestions.map((item) => <option key={item} value={item} />)}</datalist>
                  {errors.metricName ? <small id="progress-metric-error" className="pt-field-error">{errors.metricName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Unit *</span>
                  <input
                    ref={unitRef}
                    value={draft.unit}
                    list="pt-progress-unit-options"
                    aria-invalid={Boolean(errors.unit)}
                    aria-describedby={errors.unit ? "progress-unit-error" : undefined}
                    onChange={(event) => updateDraftField("unit", event.target.value)}
                  />
                  <datalist id="pt-progress-unit-options">{unitSuggestions.map((item) => <option key={item} value={item} />)}</datalist>
                  {errors.unit ? <small id="progress-unit-error" className="pt-field-error">{errors.unit}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Summary method *</span>
                  <select value={draft.summaryMethod} onChange={(event) => {
                    setDraft((current) => ({ ...current, summaryMethod: event.target.value as ProgressSummaryMethod }));
                    setFormStatus("");
                  }}>
                    {summaryMethods.map((item) => <option key={item} value={item}>{summaryMethodLabels[item]}</option>)}
                  </select>
                </label>
                <label className="pt-form-field">
                  <span>Direction <small>Optional</small></span>
                  <select value={draft.direction} onChange={(event) => {
                    setDraft((current) => ({ ...current, direction: event.target.value as ProgressDirection | "" }));
                    setFormStatus("");
                  }}>
                    <option value="">Not specified</option>
                    {directions.map((item) => <option key={item} value={item}>{directionLabels[item]}</option>)}
                  </select>
                </label>
              </div>
              {formStatus ? <p className="pt-form-status" role="alert">{formStatus}</p> : null}
              <div className="pt-form-actions">
                <button className="pt-secondary-button" type="button" onClick={() => closeBuilder()}>Cancel</button>
                <button className="pt-primary-button pt-compact-button" type="submit">Create progress</button>
              </div>
            </form>
          ) : null}

          <div className="pt-progress-selector" aria-label="Progress definitions">
            {definitions.map((definition) => (
              <button
                key={definition.id}
                type="button"
                className={selectedDefinition?.id === definition.id ? "is-selected" : ""}
                aria-pressed={selectedDefinition?.id === definition.id}
                onClick={() => {
                  setSelectedId(definition.id);
                  setAnnouncement(`${definition.progressName} selected. The displayed values are illustrative.`);
                }}
              >
                <strong>{definition.progressName}</strong>
                <small>{definition.metricName} · {definition.unit}</small>
              </button>
            ))}
          </div>

          {selectedDefinition ? (
            <>
              <ProgressCanvas definition={selectedDefinition} />
              <div className="pt-progress-actions">
                <p aria-live="polite">{announcement}</p>
                {selectedDefinition.source === "user-created" ? (
                  <button className="pt-secondary-button pt-danger-button" type="button" onClick={() => handleDelete(selectedDefinition)}>
                    <Trash2 aria-hidden="true" /> Delete custom progress
                  </button>
                ) : <span className="pt-protected-note">Preset examples cannot be deleted.</span>}
              </div>
            </>
          ) : null}
          <ConceptNotice><strong>Illustrative data · Concept preview · Not stored</strong><span aria-hidden="true">·</span> This public interface does not analyse or retain real training records.</ConceptNotice>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
