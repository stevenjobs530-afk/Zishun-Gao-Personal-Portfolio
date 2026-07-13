import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PersonalTrainingConceptShowcase from "./components/personal-training-concept/PersonalTrainingConceptShowcase";
import "./styles/globals.css";

function isPersonalTrainingConceptRoute(hash: string) {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "");
  const normalizedHash = hash.replace(/^#\/?/, "");

  return normalizedPath.endsWith("/personal-training-concept") || normalizedHash === "personal-training-concept";
}

function RootRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return isPersonalTrainingConceptRoute(hash) ? <PersonalTrainingConceptShowcase /> : <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootRoute />
  </StrictMode>,
);
