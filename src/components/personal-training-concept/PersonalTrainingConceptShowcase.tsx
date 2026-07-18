import { useEffect, useRef, useState } from "react";
import { CardioSection } from "./CardioSection";
import { ConceptHeader } from "./ConceptHeader";
import { HeroSection } from "./HeroSection";
import { LibrarySection } from "./LibrarySection";
import { PhilosophySection } from "./PhilosophySection";
import { ProgressSection } from "./ProgressSection";
import { StrengthSection } from "./StrengthSection";
import { TechnologySection } from "./TechnologySection";
import { defaultProgressDefinitions, defaultTrainingLibraryItems } from "./concept-data";
import type { CustomProgressDefinition, TrainingLibraryItem } from "./concept-model";
import { useConceptLocalization } from "./useConceptLocalization";
import "./personal-training-concept.css";

export default function PersonalTrainingConceptShowcase() {
  const [libraryItems, setLibraryItems] = useState<TrainingLibraryItem[]>(() => defaultTrainingLibraryItems);
  const [progressDefinitions, setProgressDefinitions] = useState<CustomProgressDefinition[]>(() => defaultProgressDefinitions);
  const { language, rootRef, setLanguage } = useConceptLocalization();
  const previousDocumentMetadata = useRef<{ title: string; language: string } | null>(null);

  useEffect(() => {
    previousDocumentMetadata.current = {
      title: document.title,
      language: document.documentElement.lang,
    };
    document.documentElement.classList.add("pt-concept-page");

    return () => {
      if (previousDocumentMetadata.current) {
        document.title = previousDocumentMetadata.current.title;
        document.documentElement.lang = previousDocumentMetadata.current.language;
      }
      document.documentElement.classList.remove("pt-concept-page");
    };
  }, []);

  useEffect(() => {
    document.title = language === "zh"
      ? "个人训练网站 V2 · 个人项目与界面研究"
      : "Personal Training Website V2 · Personal Project and Interface Study";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return (
    <div className="pt-concept" ref={rootRef} lang={language === "zh" ? "zh-CN" : "en"}>
      <a
        className="pt-skip-link"
        href="#/personal-training-concept"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.scrollIntoView({ behavior: "auto", block: "start" });
          main?.focus({ preventScroll: true });
        }}
      >
        Skip to main content
      </a>
      <ConceptHeader language={language} onLanguageChange={setLanguage} />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <PhilosophySection />
        <LibrarySection
          language={language}
          items={libraryItems}
          onAddItem={(item) => setLibraryItems((current) => [...current, item])}
          onDeleteItem={(id) => setLibraryItems((current) => current.filter((item) => item.id !== id || item.source === "default"))}
        />
        <StrengthSection />
        <CardioSection />
        <ProgressSection
          language={language}
          libraryItems={libraryItems}
          definitions={progressDefinitions}
          onAddDefinition={(definition) => setProgressDefinitions((current) => [...current, definition])}
          onDeleteDefinition={(id) =>
            setProgressDefinitions((current) =>
              current.filter((definition) => definition.id !== id || definition.source === "default"),
            )
          }
        />
        <TechnologySection />
      </main>
    </div>
  );
}
