import { ArrowLeft, Languages } from "lucide-react";
import type { ConceptLanguage } from "./concept-i18n";
import { scrollToConceptSection } from "./concept-utils";

const navigation = [
  ["philosophy", "Why"],
  ["library", "Library"],
  ["strength", "Strength"],
  ["cardio", "Cardio"],
  ["progress", "Progress"],
  ["technology", "Technology"],
] as const;

interface ConceptHeaderProps {
  language: ConceptLanguage;
  onLanguageChange: (language: ConceptLanguage) => void;
}

export function ConceptHeader({ language, onLanguageChange }: ConceptHeaderProps) {
  const nextLanguage = language === "en" ? "zh" : "en";

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
      <div className="pt-header-actions">
        <span className="pt-showcase-status">
          <span aria-hidden="true" /> Personal project · Concept study
        </span>
        <button
          className="pt-language-button"
          type="button"
          data-no-localize
          lang={nextLanguage === "zh" ? "zh-CN" : "en"}
          aria-label={language === "en" ? "切换为中文" : "Switch to English"}
          title={language === "en" ? "切换为中文" : "Switch to English"}
          onClick={() => onLanguageChange(nextLanguage)}
        >
          <Languages aria-hidden="true" />
          <span>{language === "en" ? "中文" : "EN"}</span>
        </button>
      </div>
    </header>
  );
}
