import { useEffect, useState } from "react";
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
import "./personal-training-concept.css";

export default function PersonalTrainingConceptShowcase() {
  const [libraryItems, setLibraryItems] = useState<TrainingLibraryItem[]>(() => defaultTrainingLibraryItems);
  const [progressDefinitions, setProgressDefinitions] = useState<CustomProgressDefinition[]>(() => defaultProgressDefinitions);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personal Training Website V2 · Personal Project and Interface Study";
    document.documentElement.classList.add("pt-concept-page");

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("pt-concept-page");
    };
  }, []);

  return (
    <div className="pt-concept">
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
      <ConceptHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <PhilosophySection />
        <LibrarySection
          items={libraryItems}
          onAddItem={(item) => setLibraryItems((current) => [...current, item])}
          onDeleteItem={(id) => setLibraryItems((current) => current.filter((item) => item.id !== id || item.source === "default"))}
        />
        <StrengthSection />
        <CardioSection />
        <ProgressSection
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
