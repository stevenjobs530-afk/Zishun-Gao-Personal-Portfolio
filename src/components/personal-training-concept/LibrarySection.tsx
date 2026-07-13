import { ArrowRight, Dumbbell, Info, Plus, Search, Trash2 } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import {
  createConceptId,
  normalizeConceptText,
  type TrainingLibraryItem,
} from "./concept-model";

type LibraryDraft = {
  trainingName: string;
  equipmentName: string;
  category: string;
  description: string;
};

type LibraryDraftErrors = Partial<Record<keyof LibraryDraft, string>>;

const emptyDraft: LibraryDraft = {
  trainingName: "",
  equipmentName: "",
  category: "",
  description: "",
};

function validateDraft(draft: LibraryDraft) {
  const errors: LibraryDraftErrors = {};
  const trainingName = normalizeConceptText(draft.trainingName);
  const equipmentName = normalizeConceptText(draft.equipmentName);
  const category = normalizeConceptText(draft.category);
  const description = normalizeConceptText(draft.description);

  if (!trainingName) errors.trainingName = "Enter a training or exercise name.";
  else if (trainingName.length > 80) errors.trainingName = "Use 80 characters or fewer.";

  if (equipmentName.length > 80) errors.equipmentName = "Use 80 characters or fewer.";

  if (!category) errors.category = "Enter a category.";
  else if (category.length > 80) errors.category = "Use 80 characters or fewer.";

  if (description.length > 240) errors.description = "Use 240 characters or fewer.";

  return errors;
}

export function LibrarySection({
  items,
  onAddItem,
  onDeleteItem,
}: {
  items: TrainingLibraryItem[];
  onAddItem: (item: TrainingLibraryItem) => void;
  onDeleteItem: (id: string) => void;
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<LibraryDraft>(emptyDraft);
  const [errors, setErrors] = useState<LibraryDraftErrors>({});
  const [formStatus, setFormStatus] = useState("");
  const [announcement, setAnnouncement] = useState(
    "Browser-only concept preview · Changes are cleared when the page refreshes.",
  );
  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const trainingNameRef = useRef<HTMLInputElement | null>(null);
  const equipmentNameRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isCreating) {
      trainingNameRef.current?.focus({ preventScroll: true });
    }
  }, [isCreating]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category))).sort((a, b) => a.localeCompare(b))],
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeConceptText(query).toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const searchable = [item.trainingName, item.equipmentName, item.category, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, items, query]);

  const selectedItem = items.find((item) => item.id === selectedId) ?? filteredItems[0] ?? items[0];

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    const firstMatch = items.find((item) => nextCategory === "All" || item.category === nextCategory);
    if (firstMatch) setSelectedId(firstMatch.id);
  }

  function closeForm({ restoreFocus = true }: { restoreFocus?: boolean } = {}) {
    setIsCreating(false);
    setDraft(emptyDraft);
    setErrors({});
    setFormStatus("");
    if (restoreFocus) {
      window.requestAnimationFrame(() => addButtonRef.current?.focus({ preventScroll: true }));
    }
  }

  function updateDraftField(field: keyof LibraryDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormStatus("");
  }

  function handleFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeForm();
    }
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus("Please correct the highlighted fields before creating this item.");
      const firstInvalidField = ([
        ["trainingName", trainingNameRef],
        ["equipmentName", equipmentNameRef],
        ["category", categoryRef],
        ["description", descriptionRef],
      ] as const).find(([field]) => nextErrors[field]);
      window.requestAnimationFrame(() => firstInvalidField?.[1].current?.focus({ preventScroll: true }));
      return;
    }

    const trainingName = normalizeConceptText(draft.trainingName);
    const equipmentName = normalizeConceptText(draft.equipmentName);
    const categoryName = normalizeConceptText(draft.category);
    const description = normalizeConceptText(draft.description);
    const item: TrainingLibraryItem = {
      id: createConceptId("library"),
      trainingName,
      equipmentName: equipmentName || undefined,
      category: categoryName,
      description: description || undefined,
      detail: equipmentName ? `Equipment · ${equipmentName}` : "User-defined training item",
      source: "user-created",
    };

    onAddItem(item);
    setSelectedId(item.id);
    setCategory("All");
    setQuery("");
    setAnnouncement(`${trainingName} was added and selected. It is available to the progress builder until refresh.`);
    closeForm();
  }

  function handleDelete(item: TrainingLibraryItem) {
    if (item.source !== "user-created") return;
    if (!window.confirm(`Remove “${item.trainingName}” from this browser-only preview?`)) return;

    const remainingItems = items.filter((candidate) => candidate.id !== item.id);
    onDeleteItem(item.id);
    setSelectedId(remainingItems[0]?.id ?? "");
    setCategory("All");
    setQuery("");
    setAnnouncement(`${item.trainingName} was removed. Existing progress previews keep their saved text.`);
  }

  return (
    <section id="library" className="pt-library-section pt-shell">
      <Reveal>
        <SectionCopy
          label="Custom training library"
          title="Defining exercises and equipment in the user’s own terms."
          body={<p>This concept lets people add training items using the names and categories that make sense in their own gym. Preset entries are suggestions, not a fixed set of allowed options.</p>}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <GlassPanel className="pt-library-panel">
          <div className="pt-library-toolbar">
            <h3>My Training Library</h3>
            <label className="pt-search-field">
              <Search aria-hidden="true" />
              <span className="pt-sr-only">Search training, equipment or categories</span>
              <input
                value={query}
                type="search"
                placeholder="Search training or equipment"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button
              ref={addButtonRef}
              className="pt-primary-button pt-compact-button"
              type="button"
              aria-expanded={isCreating}
              aria-controls="pt-library-create-form"
              onClick={() => {
                setErrors({});
                setFormStatus("");
                setIsCreating(true);
              }}
            >
              <Plus aria-hidden="true" /> Add custom item
            </button>
          </div>

          {isCreating ? (
            <form id="pt-library-create-form" className="pt-concept-form pt-library-create-form" noValidate onSubmit={handleCreate} onKeyDown={handleFormKeyDown}>
              <div className="pt-form-heading">
                <div><h3>Create a library item</h3><p>Saved only in React memory and cleared on refresh.</p></div>
                <span>Required fields are marked *</span>
              </div>
              <div className="pt-form-grid">
                <label className="pt-form-field">
                  <span>Training or exercise name *</span>
                  <input
                    ref={trainingNameRef}
                    value={draft.trainingName}
                    aria-invalid={Boolean(errors.trainingName)}
                    aria-describedby={errors.trainingName ? "library-training-error" : undefined}
                    onChange={(event) => updateDraftField("trainingName", event.target.value)}
                  />
                  {errors.trainingName ? <small id="library-training-error" className="pt-field-error">{errors.trainingName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Equipment name <small>Optional</small></span>
                  <input
                    ref={equipmentNameRef}
                    value={draft.equipmentName}
                    aria-invalid={Boolean(errors.equipmentName)}
                    aria-describedby={errors.equipmentName ? "library-equipment-error" : undefined}
                    onChange={(event) => updateDraftField("equipmentName", event.target.value)}
                  />
                  {errors.equipmentName ? <small id="library-equipment-error" className="pt-field-error">{errors.equipmentName}</small> : null}
                </label>
                <label className="pt-form-field">
                  <span>Category *</span>
                  <input
                    ref={categoryRef}
                    value={draft.category}
                    list="pt-library-category-options"
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? "library-category-error" : undefined}
                    onChange={(event) => updateDraftField("category", event.target.value)}
                  />
                  <datalist id="pt-library-category-options">
                    {categories.slice(1).map((item) => <option key={item} value={item} />)}
                  </datalist>
                  {errors.category ? <small id="library-category-error" className="pt-field-error">{errors.category}</small> : null}
                </label>
                <label className="pt-form-field pt-form-field--wide">
                  <span>Description <small>Optional · {draft.description.length}/240</small></span>
                  <textarea
                    ref={descriptionRef}
                    value={draft.description}
                    rows={3}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "library-description-error" : undefined}
                    onChange={(event) => updateDraftField("description", event.target.value)}
                  />
                  {errors.description ? <small id="library-description-error" className="pt-field-error">{errors.description}</small> : null}
                </label>
              </div>
              {formStatus ? <p className="pt-form-status" role="alert">{formStatus}</p> : null}
              <div className="pt-form-actions">
                <button className="pt-secondary-button" type="button" onClick={() => closeForm()}>Cancel</button>
                <button className="pt-primary-button pt-compact-button" type="submit">Create item</button>
              </div>
            </form>
          ) : null}

          <div className="pt-filter-row" aria-label="Filter training library">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "is-selected" : ""}
                type="button"
                aria-pressed={category === item}
                onClick={() => chooseCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="pt-library-workspace">
            <div className="pt-library-list" aria-label="Training library items">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    className={selectedItem?.id === item.id ? "is-selected" : ""}
                    type="button"
                    aria-pressed={selectedItem?.id === item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setAnnouncement(`${item.trainingName} selected. ${item.source === "user-created" ? "User-created item" : "Preset example"}.`);
                    }}
                  >
                    <span className="pt-library-thumb">
                      {item.image ? <img src={item.image} alt="" /> : <Dumbbell aria-hidden="true" />}
                    </span>
                    <span><strong>{item.trainingName}</strong><small>{item.equipmentName ? `${item.category} · ${item.equipmentName}` : item.category}</small></span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                ))
              ) : (
                <div className="pt-library-empty">
                  <Search aria-hidden="true" />
                  <strong>No items match</strong>
                  <span>Try another name or category.</span>
                </div>
              )}
            </div>
            {selectedItem ? (
              <article className="pt-library-detail">
                <div className="pt-library-detail-art">
                  {selectedItem.image ? <img src={selectedItem.image} alt={`${selectedItem.trainingName} fictional equipment render`} /> : <Dumbbell aria-hidden="true" />}
                </div>
                <div className="pt-library-detail-copy">
                  <p className="pt-library-source">{selectedItem.source === "user-created" ? "User-created · Browser only" : "Preset example"}</p>
                  <h3>{selectedItem.trainingName}</h3>
                  <p className="pt-library-category">{selectedItem.category}</p>
                  {selectedItem.equipmentName ? <p><strong>Equipment:</strong> {selectedItem.equipmentName}</p> : null}
                  {selectedItem.detail ? <p>{selectedItem.detail}</p> : null}
                  <p className="pt-library-description">{selectedItem.description || "No description added."}</p>
                  <div className="pt-library-actions">
                    {selectedItem.source === "user-created" ? (
                      <button type="button" className="pt-secondary-button pt-danger-button" onClick={() => handleDelete(selectedItem)}>
                        <Trash2 aria-hidden="true" /> Delete user item
                      </button>
                    ) : <span className="pt-protected-note">Preset examples cannot be deleted.</span>}
                  </div>
                  <div className="pt-inline-message" aria-live="polite">
                    <Info aria-hidden="true" /> {announcement}
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
