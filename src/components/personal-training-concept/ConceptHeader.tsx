import { ArrowLeft } from "lucide-react";
import { scrollToConceptSection } from "./concept-utils";

const navigation = [
  ["philosophy", "Why"],
  ["library", "Library"],
  ["strength", "Strength"],
  ["cardio", "Cardio"],
  ["progress", "Progress"],
  ["technology", "Technology"],
] as const;

export function ConceptHeader() {
  return (
    <header className="pt-header">
      <a className="pt-back-link" href={import.meta.env.BASE_URL}>
        <ArrowLeft aria-hidden="true" /> Back to Portfolio
      </a>
      <nav aria-label="Concept showcase sections">
        {navigation.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToConceptSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <span className="pt-showcase-status">
        <span aria-hidden="true" /> Personal project · Concept study
      </span>
    </header>
  );
}
