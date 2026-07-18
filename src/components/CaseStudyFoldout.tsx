import { ArrowLeft, ArrowUpRight, ChevronDown, Code2, Database, Eye, ImageIcon, ListChecks, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { RevealArticle } from "@/components/ui/text-animations";
import { ProjectEmblem } from "@/components/ProjectEmblems";
import { type CaseStudy, type PortfolioContent } from "@/data/portfolio";

const detailTargets = [
  { id: "screenshots", Icon: ImageIcon },
  { id: "code", Icon: Code2 },
  { id: "conclusion", Icon: ListChecks },
] as const;

const metricIcons = [Database, ShieldCheck, TrendingUp, Eye] as const;

function publicAssetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function screenshotPath(path: string) {
  return `${publicAssetPath(path)}?v=20260621`;
}

function DetailMenu({ studyId, labels }: { studyId: string; labels: PortfolioContent["caseStudyLabels"] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {detailTargets.map(({ id, Icon }) => (
        <Button key={id} asChild variant="glass" size="sm" className="gap-2 px-3">
          <a href={`#case-${studyId}-${id}`}>
            <Icon className="size-4" aria-hidden="true" />
            {labels[id]}
          </a>
        </Button>
      ))}
    </div>
  );
}

function Evidence({ study, labels }: { study: CaseStudy; labels: PortfolioContent["caseStudyLabels"] }) {
  return (
    <div className="min-w-0">
      <h4 className="apple-display-text text-lg text-neutral-900">{labels.evidence}</h4>
      <div className="mt-4 grid gap-4">
        {study.evidence.map((item) => (
          <article key={item.title}>
            <h5 className="text-sm font-semibold text-neutral-900">{item.title}</h5>
            <p className="mt-1 text-[0.95rem] leading-7 text-neutral-600">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CodeSamples({ study, labels }: { study: CaseStudy; labels: PortfolioContent["caseStudyLabels"] }) {
  return (
    <div id={`case-${study.id}-code`} className="min-w-0 scroll-mt-96">
      <h4 className="apple-display-text text-lg text-neutral-900">{labels.code}</h4>
      <div className="mt-4 grid min-w-0 gap-4">
        {study.codeSamples.map((sample) => (
          <div
            key={`${study.id}-${sample.label}`}
            className="min-w-0 overflow-hidden rounded-lg border border-white/65 bg-white/42 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_18px_42px_rgba(46,61,82,.1)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/55 px-4 py-3">
              <span className="text-xs font-semibold text-neutral-600">{sample.label}</span>
              <span className="text-xs text-blue-600">{sample.language}</span>
            </div>
            <pre className="max-w-full overflow-x-auto px-4 py-3 text-[0.76rem] leading-6 text-neutral-700">
              <code>{sample.lines.join("\n")}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyFoldout({
  study,
  labels,
  expanded,
  onToggle,
  delay = 0,
}: {
  study: CaseStudy;
  labels: PortfolioContent["caseStudyLabels"];
  expanded: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  const detailsId = `case-${study.id}-details`;

  return (
    <RevealArticle delay={delay}>
      <article className={`case-study-foldout ${expanded ? "is-expanded" : ""}`}>
        <LiquidGlass className="case-study-foldout__cover overflow-visible p-0">
          <div className="relative z-[1] grid min-h-[430px] grid-cols-[minmax(0,1.08fr)_minmax(320px,.92fr)] items-center gap-10 px-7 pb-20 pt-8 md:px-10 md:pb-24 md:pt-10 max-lg:grid-cols-1 max-lg:gap-8 max-sm:min-h-0 max-sm:px-5 max-sm:pb-20 max-sm:pt-6">
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <ProjectEmblem caseStudyId={study.id} size="lg" />
                <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">{study.eyebrow}</p>
              </div>
              <h3 className="apple-display-text mt-5 max-w-[720px] break-words text-[clamp(2rem,4vw,4rem)] leading-[1.02] text-neutral-950">
                {study.title}
              </h3>
              <p className="mt-6 max-w-3xl text-[0.98rem] leading-8 text-neutral-600 md:text-[1.05rem]">{study.summary}</p>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-x-7 gap-y-8 max-sm:gap-x-4 max-sm:gap-y-6">
              {study.metrics.map((metric, index) => {
                const MetricIcon = metricIcons[index % metricIcons.length];

                return (
                  <div key={`${study.id}-${metric.label}`} className="case-study-foldout__metric border-t border-white/65 pt-4">
                    <span className={`case-study-foldout__metric-dot case-study-foldout__metric-dot--${(index % 4) + 1}`} aria-hidden="true">
                      <MetricIcon className="size-5" />
                    </span>
                    <span className="apple-display-text mt-3 block break-words text-[clamp(1.45rem,3vw,2.55rem)] leading-none text-neutral-950">
                      {metric.value}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-neutral-500">{metric.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="case-study-foldout__toggle"
            aria-expanded={expanded}
            aria-controls={expanded ? detailsId : undefined}
            onClick={onToggle}
          >
            <span className="case-study-foldout__toggle-icon">
              <ChevronDown className="size-5" aria-hidden="true" />
            </span>
            <span>{expanded ? labels.collapseDetails : labels.expandDetails}</span>
          </button>
        </LiquidGlass>

        {expanded ? (
          <div id={detailsId} className="case-study-foldout__details">
            <LiquidGlass className="grid grid-cols-[minmax(0,1.08fr)_minmax(320px,.92fr)] items-start gap-8 p-7 md:p-9 max-lg:grid-cols-1">
              <div className="flex min-w-0 flex-col max-lg:contents">
                <div className="relative z-[1] min-w-0 max-lg:order-1">
                  <div>
                    <h4 className="apple-display-text text-lg text-neutral-900">{labels.businessQuestion}</h4>
                    <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{study.businessQuestion}</p>
                  </div>

                  <DetailMenu studyId={study.id} labels={labels} />

                  <div className="mt-8 border-t border-white/55 pt-6">
                    <h4 className="apple-display-text text-lg text-neutral-900">{labels.problem}</h4>
                    <p className="mt-3 text-[0.95rem] leading-7 text-neutral-600 md:text-base md:leading-8">{study.problem}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-8 max-md:grid-cols-1">
                    <div>
                      <h4 className="apple-display-text text-lg text-neutral-900">{labels.method}</h4>
                      <ul className="mt-3 grid gap-3 text-[0.95rem] leading-7 text-neutral-600">
                        {study.method.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/70" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="apple-display-text text-lg text-neutral-900">{labels.result}</h4>
                      <ul className="mt-3 grid gap-3 text-[0.95rem] leading-7 text-neutral-600">
                        {study.results.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id={`case-${study.id}-conclusion`} className="mt-8 scroll-mt-96 border-t border-white/55 pt-6">
                    <h4 className="apple-display-text text-lg text-neutral-900">{labels.conclusion}</h4>
                    <ul className="mt-3 grid gap-3 text-[0.95rem] leading-7 text-neutral-600">
                      {study.conclusion.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/70" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="glass" size="sm" className="mt-6 w-fit gap-2">
                      <a href="#projects">
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        {labels.backToProjects}
                      </a>
                    </Button>
                  </div>

                  {study.href && study.linkLabel ? (
                    <Button asChild variant="glass" size="sm" className="mt-6 w-fit gap-2">
                      <a href={study.href} target="_blank" rel="noreferrer">
                        {study.linkLabel} <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : null}
                </div>

                <div className="relative z-[1] mt-8 min-w-0 border-t border-white/55 pt-6 max-lg:order-3 max-lg:mt-0">
                  <Evidence study={study} labels={labels} />
                </div>
              </div>

              <div className="flex min-w-0 flex-col max-lg:contents">
                <div className="relative z-[1] flex min-w-0 flex-col gap-6 max-lg:order-2">
                  <div id={`case-${study.id}-screenshots`} className="scroll-mt-96">
                    <h4 className="apple-display-text text-lg text-neutral-900">{labels.screenshots}</h4>
                    <div className="mt-4 grid gap-5">
                      {study.screenshots.map((screenshot) => (
                        <figure key={screenshot.src} className="group/shot">
                          <div className="overflow-hidden rounded-lg border border-white/65 bg-white/42 shadow-[inset_0_1px_1px_rgba(255,255,255,.9),0_18px_42px_rgba(46,61,82,.1)] backdrop-blur-2xl">
                            <img
                              className="media-fade-in max-h-[360px] w-full object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/shot:scale-[1.025]"
                              src={screenshotPath(screenshot.src)}
                              alt={screenshot.alt}
                              loading="lazy"
                            />
                          </div>
                          <figcaption className="mt-3">
                            <span className="text-[0.95rem] font-semibold text-neutral-900">{screenshot.title}</span>
                            <p className="mt-1 text-[0.95rem] leading-7 text-neutral-600">{screenshot.caption}</p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-[1] mt-8 min-w-0 border-t border-white/55 pt-6 max-lg:order-4 max-lg:mt-0">
                  <CodeSamples study={study} labels={labels} />
                </div>
              </div>
            </LiquidGlass>
          </div>
        ) : null}
      </article>
    </RevealArticle>
  );
}
