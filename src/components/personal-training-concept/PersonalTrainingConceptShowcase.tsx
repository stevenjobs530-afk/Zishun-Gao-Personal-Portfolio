import { useEffect } from "react";
import { CardioSection } from "./CardioSection";
import { ConceptHeader } from "./ConceptHeader";
import { HeroSection } from "./HeroSection";
import { LibrarySection } from "./LibrarySection";
import { PhilosophySection } from "./PhilosophySection";
import { ProgressSection } from "./ProgressSection";
import { StrengthSection } from "./StrengthSection";
import { TechnologySection } from "./TechnologySection";
import "./personal-training-concept.css";

export default function PersonalTrainingConceptShowcase() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personal Training Website V2 · Concept Showcase";
    document.documentElement.classList.add("pt-concept-page");

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("pt-concept-page");
    };
  }, []);

  return (
    <div className="pt-concept">
      <a className="pt-skip-link" href="#main-content">Skip to main content</a>
      <ConceptHeader />
      <main id="main-content">
        <HeroSection />
        <PhilosophySection />
        <LibrarySection />
        <StrengthSection />
        <CardioSection />
        <ProgressSection />
        <TechnologySection />
      </main>
    </div>
  );
}
