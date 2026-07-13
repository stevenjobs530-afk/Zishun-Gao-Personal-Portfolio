import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PersonalTrainingConceptShowcase from "./components/personal-training-concept/PersonalTrainingConceptShowcase";
import "./styles/globals.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "");
const normalizedHash = window.location.hash.replace(/^#\/?/, "");
const isPersonalTrainingConcept =
  normalizedPath.endsWith("/personal-training-concept") || normalizedHash === "personal-training-concept";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isPersonalTrainingConcept ? <PersonalTrainingConceptShowcase /> : <App />}
  </StrictMode>,
);
