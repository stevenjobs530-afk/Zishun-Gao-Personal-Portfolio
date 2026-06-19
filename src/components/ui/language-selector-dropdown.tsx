import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type LanguageOption<TCode extends string> = {
  code: TCode;
  label: string;
  shortLabel: string;
};

type LanguageSelectorDropdownProps<TCode extends string> = {
  value: TCode;
  options: readonly LanguageOption<TCode>[];
  onChange: (code: TCode) => void;
  ariaLabel?: string;
};

function LanguageSelectorDropdown<TCode extends string>({
  value,
  options,
  onChange,
  ariaLabel = "Select language",
}: LanguageSelectorDropdownProps<TCode>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.code === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex h-10 min-w-24 items-center justify-center gap-2 rounded-full border border-white/80 bg-white/55 px-3 text-xs font-semibold text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_12px_28px_rgba(46,61,82,.12)] backdrop-blur-[34px] backdrop-saturate-150 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/35",
        )}
      >
        <span>{selected.shortLabel}</span>
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-white/80 bg-white/85 py-1 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_18px_45px_rgba(46,61,82,.16)] backdrop-blur-[34px] backdrop-saturate-150 animate-fade-in"
        >
          {options.map((option) => {
            const active = option.code === value;

            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                  active ? "font-semibold text-blue-700" : "text-neutral-700 hover:bg-white/70 hover:text-neutral-950",
                )}
              >
                <span className="flex-1">{option.label}</span>
                {active ? <Check className="size-4 text-blue-600" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export { LanguageSelectorDropdown };
