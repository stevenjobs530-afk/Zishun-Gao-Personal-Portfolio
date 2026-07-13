import { ArrowUpRight, X } from "lucide-react";
import { type KeyboardEvent, type PointerEvent, useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import type { Project } from "@/data/portfolio";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function publicAssetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}?v=20260713`;
}

function projectUrl(href: string) {
  return href.startsWith("#/") ? `${import.meta.env.BASE_URL}${href}` : href;
}

export function ProjectPreviewDialog({
  project,
  returnFocusElement,
  onClosed,
}: {
  project: Project | null;
  returnFocusElement: HTMLButtonElement | null;
  onClosed: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const startedOnBackdropRef = useRef(false);
  const previousBodyOverflowRef = useRef("");
  const previousDocumentOverflowRef = useRef("");
  const savedScrollPositionRef = useRef({ x: 0, y: 0 });
  const removeScrollListenersRef = useRef<(() => void) | null>(null);
  const restoreScrollFrameRef = useRef<number | null>(null);
  const scrollLockActiveRef = useRef(false);
  const mountedRef = useRef(true);
  const titleId = useId();
  const descriptionId = useId();
  const disclosureId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;

    if (restoreScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(restoreScrollFrameRef.current);
      restoreScrollFrameRef.current = null;
    }

    savedScrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
    previousBodyOverflowRef.current = document.body.style.overflow;
    previousDocumentOverflowRef.current = document.documentElement.style.overflow;
    scrollLockActiveRef.current = true;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const isInsideDialogSurface = (target: EventTarget | null) =>
      target instanceof Element && target.closest(".project-preview-dialog__surface") !== null;
    const preventBackgroundWheel = (event: WheelEvent) => {
      if (!isInsideDialogSurface(event.target)) event.preventDefault();
    };
    const preventBackgroundTouchMove = (event: TouchEvent) => {
      if (!isInsideDialogSurface(event.target)) event.preventDefault();
    };

    document.addEventListener("wheel", preventBackgroundWheel, { capture: true, passive: false });
    document.addEventListener("touchmove", preventBackgroundTouchMove, { capture: true, passive: false });
    removeScrollListenersRef.current = () => {
      document.removeEventListener("wheel", preventBackgroundWheel, true);
      document.removeEventListener("touchmove", preventBackgroundTouchMove, true);
    };

    if (!dialog.open) dialog.showModal();
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));

    return () => {
      window.cancelAnimationFrame(frame);
      restoreDocumentScroll();
    };
  }, [project]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (restoreScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(restoreScrollFrameRef.current);
        restoreScrollFrameRef.current = null;
      }
    };
  }, []);

  function restoreDocumentScroll() {
    if (!scrollLockActiveRef.current) return;
    const savedScrollPosition = savedScrollPositionRef.current;
    removeScrollListenersRef.current?.();
    removeScrollListenersRef.current = null;
    document.body.style.overflow = previousBodyOverflowRef.current;
    document.documentElement.style.overflow = previousDocumentOverflowRef.current;
    scrollLockActiveRef.current = false;
    window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);

    if (mountedRef.current) {
      restoreScrollFrameRef.current = window.requestAnimationFrame(() => {
        window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);
        restoreScrollFrameRef.current = window.requestAnimationFrame(() => {
          window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);
          restoreScrollFrameRef.current = null;
        });
      });
    }
  }

  function requestClose() {
    dialogRef.current?.close();
  }

  function handleClosed() {
    restoreDocumentScroll();
    onClosed();
    window.requestAnimationFrame(() => returnFocusElement?.focus({ preventScroll: true }));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    const focusable = dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => !element.hidden)
      : [];
    if (focusable.length === 0) {
      event.preventDefault();
      dialog?.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) {
      event.preventDefault();
      last?.focus({ preventScroll: true });
    } else if (!event.shiftKey && (document.activeElement === last || !dialog?.contains(document.activeElement))) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDialogElement>) {
    startedOnBackdropRef.current = event.target === event.currentTarget;
  }

  if (!project?.preview || !project.href || !project.cover) return null;

  return (
    <dialog
      ref={dialogRef}
      className="project-preview-dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={`${descriptionId} ${disclosureId}`}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClose={handleClosed}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onClick={(event) => {
        if (startedOnBackdropRef.current && event.target === event.currentTarget) requestClose();
        startedOnBackdropRef.current = false;
      }}
    >
      <LiquidGlass className="project-preview-dialog__surface">
        <div className="project-preview-dialog__media">
          <img src={publicAssetUrl(project.cover.src)} alt={project.cover.alt} />
        </div>
        <div className="project-preview-dialog__content">
          <Button
            ref={closeButtonRef}
            type="button"
            variant="glass"
            size="sm"
            className="project-preview-dialog__icon-close"
            aria-label={project.preview.closeLabel}
            onClick={requestClose}
          >
            <X aria-hidden="true" />
          </Button>
          <p className="project-preview-dialog__label">{project.preview.label}</p>
          <h2 id={titleId}>{project.preview.title}</h2>
          <p id={descriptionId} className="project-preview-dialog__description">{project.preview.description}</p>
          <p id={disclosureId} className="project-preview-dialog__disclosure">{project.preview.disclosure}</p>
          <div className="project-preview-dialog__actions">
            <Button asChild variant="primary" className="project-preview-dialog__primary-action">
              <a href={projectUrl(project.href)} target="_blank" rel="noreferrer" onClick={requestClose}>
                {project.preview.ctaLabel} <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> ({project.preview.newTabLabel})</span>
              </a>
            </Button>
            <Button type="button" variant="glass" onClick={requestClose}>{project.preview.closeLabel}</Button>
          </div>
        </div>
      </LiquidGlass>
    </dialog>
  );
}
