import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { translateConceptText, type ConceptLanguage } from "./concept-i18n";

const STORAGE_KEY = "personal-training-concept-language";
const LOCALIZED_ATTRIBUTES = ["aria-label", "alt", "placeholder", "title"] as const;

function getInitialLanguage(): ConceptLanguage {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "en" || savedLanguage === "zh") return savedLanguage;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function useConceptLocalization() {
  const [language, setLanguage] = useState<ConceptLanguage>(getInitialLanguage);
  const rootRef = useRef<HTMLDivElement>(null);
  const originalText = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(new WeakMap<Element, Map<string, string>>());

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const localizeTextNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, [data-no-localize]")) return;

      const remembered = originalText.current.get(node);
      const isKnownRendering = remembered !== undefined && (
        node.data === translateConceptText(remembered, "en")
        || node.data === translateConceptText(remembered, "zh")
      );
      const source = remembered === undefined || !isKnownRendering ? node.data : remembered;
      originalText.current.set(node, source);

      const translated = translateConceptText(source, language);
      if (node.data !== translated) node.data = translated;
    };

    const localizeElementAttributes = (element: Element) => {
      if (element.closest("[data-no-localize]")) return;

      let rememberedAttributes = originalAttributes.current.get(element);
      if (!rememberedAttributes) {
        rememberedAttributes = new Map();
        originalAttributes.current.set(element, rememberedAttributes);
      }

      for (const attribute of LOCALIZED_ATTRIBUTES) {
        const current = element.getAttribute(attribute);
        if (current === null) continue;

        const remembered = rememberedAttributes.get(attribute);
        const isKnownRendering = remembered !== undefined && (
          current === translateConceptText(remembered, "en")
          || current === translateConceptText(remembered, "zh")
        );
        const source = remembered === undefined || !isKnownRendering ? current : remembered;
        rememberedAttributes.set(attribute, source);

        const translated = translateConceptText(source, language);
        if (current !== translated) element.setAttribute(attribute, translated);
      }
    };

    const localizeSubtree = (subtree: Node) => {
      if (subtree.nodeType === Node.TEXT_NODE) {
        localizeTextNode(subtree as Text);
        return;
      }

      if (!(subtree instanceof Element)) return;
      localizeElementAttributes(subtree);

      const walker = document.createTreeWalker(subtree, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.nodeType === Node.TEXT_NODE) localizeTextNode(node as Text);
        else localizeElementAttributes(node as Element);
        node = walker.nextNode();
      }
    };

    localizeSubtree(root);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") localizeTextNode(mutation.target as Text);
        if (mutation.type === "attributes") localizeElementAttributes(mutation.target as Element);
        for (const node of mutation.addedNodes) localizeSubtree(node);
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: [...LOCALIZED_ATTRIBUTES],
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The language still works for the current visit when storage is blocked.
    }
  }, [language]);

  return { language, rootRef, setLanguage };
}
