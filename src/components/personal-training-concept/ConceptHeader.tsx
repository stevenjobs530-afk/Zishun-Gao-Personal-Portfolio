import { scrollToConceptSection } from "./concept-utils";

const navigation = [
  ["philosophy", "Philosophy"],
  ["library", "Library"],
  ["strength", "Strength"],
  ["cardio", "Cardio"],
  ["progress", "Progress"],
  ["technology", "Technology"],
] as const;

export function ConceptHeader() {
  return (
    <header className="pt-header">
      <a
        className="pt-wordmark"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          scrollToConceptSection("top");
        }}
      >
        PT V2
      </a>
      <nav aria-label="Concept showcase navigation">
        {navigation.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToConceptSection(id);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <span className="pt-showcase-status">
        <span aria-hidden="true" /> Concept Showcase
      </span>
    </header>
  );
}
