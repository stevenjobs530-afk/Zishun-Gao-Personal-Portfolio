import { ArrowRight, Dumbbell, Info, Pencil, Play, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassPanel, Reveal, SectionCopy } from "./ConceptPrimitives";
import { libraryCategories, libraryItems, type LibraryCategory } from "./concept-data";

export function LibrarySection() {
  const [category, setCategory] = useState<LibraryCategory>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(libraryItems[0].id);
  const [announcement, setAnnouncement] = useState("Showcase data only · Nothing is created or saved");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return libraryItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !normalizedQuery || `${item.name} ${item.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const selectedItem = libraryItems.find((item) => item.id === selectedId) ?? libraryItems[0];

  function chooseCategory(nextCategory: LibraryCategory) {
    setCategory(nextCategory);
    const firstMatch = libraryItems.find((item) => nextCategory === "All" || item.category === nextCategory);
    if (firstMatch) {
      setSelectedId(firstMatch.id);
    }
  }

  return (
    <section id="library" className="pt-library-section pt-shell">
      <Reveal>
        <SectionCopy
          label="Custom Training Library"
          title={<>Your equipment.<br />Your language.</>}
          body={<p>Create the exercises and machines that match the gym you actually use.</p>}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <GlassPanel className="pt-library-panel">
          <div className="pt-library-toolbar">
            <h3>My Training Library</h3>
            <label className="pt-search-field">
              <Search aria-hidden="true" />
              <span className="pt-sr-only">Search exercises or equipment</span>
              <input
                value={query}
                type="search"
                placeholder="Search exercises or equipment"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button
              className="pt-primary-button pt-compact-button"
              type="button"
              onClick={() => setAnnouncement("Custom creation is intentionally disabled in this local concept showcase.")}
            >
              <Plus aria-hidden="true" /> Add custom item
            </button>
          </div>
          <div className="pt-filter-row" aria-label="Filter training library">
            {libraryCategories.map((item) => (
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
            <div className="pt-library-list" aria-label="Fictional training items">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    className={selectedItem.id === item.id ? "is-selected" : ""}
                    type="button"
                    aria-pressed={selectedItem.id === item.id}
                    onClick={() => {
                      setSelectedId(item.id);
                      setAnnouncement(`${item.name} selected. Showcase data only.`);
                    }}
                  >
                    <span className="pt-library-thumb">
                      {item.image ? <img src={item.image} alt="" /> : <Dumbbell aria-hidden="true" />}
                    </span>
                    <span><strong>{item.name}</strong><small>{item.category}</small></span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                ))
              ) : (
                <div className="pt-library-empty">
                  <Search aria-hidden="true" />
                  <strong>No showcase items match</strong>
                  <span>Try another name or category.</span>
                </div>
              )}
            </div>
            <article className="pt-library-detail">
              <div className="pt-library-detail-art">
                {selectedItem.image ? <img src={selectedItem.image} alt={`${selectedItem.name} fictional equipment render`} /> : <Dumbbell aria-hidden="true" />}
              </div>
              <div className="pt-library-detail-copy">
                <h3>{selectedItem.name}</h3>
                <p className="pt-library-category">{selectedItem.category}</p>
                <p>{selectedItem.detail}</p>
                <p className="pt-library-description">{selectedItem.description}</p>
                <div className="pt-library-actions">
                  <button type="button" className="pt-primary-button pt-compact-button" onClick={() => setAnnouncement("Detail editing is a visual concept only. Nothing was changed.")}>
                    <Pencil aria-hidden="true" /> Edit details
                  </button>
                  <button type="button" className="pt-secondary-button" onClick={() => setAnnouncement(`${selectedItem.name} is ready for the fictional strength-session preview.`)}>
                    <Play aria-hidden="true" /> Use in session
                  </button>
                </div>
                <div className="pt-inline-message" aria-live="polite">
                  <Info aria-hidden="true" /> {announcement}
                </div>
              </div>
            </article>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
