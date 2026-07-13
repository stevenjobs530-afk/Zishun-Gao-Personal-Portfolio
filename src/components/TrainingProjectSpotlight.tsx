import {
  Activity,
  ChevronDown,
  Dumbbell,
  ExternalLink,
  Github,
  LockKeyhole,
  MonitorSmartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { type PortfolioContent } from "@/data/portfolio";

const trainingSpotlightCopy = {
  en: {
    eyebrow: "Independent product build",
    title: "Personal Training Website",
    teaser:
      "A private, login-protected training tracker for strength sessions, cardio and rest days.",
    openPrompt: "Open project preview",
    detailTitle: "Built for a real personal workflow, not as a static mock-up.",
    detailBody:
      "This project turns day-to-day gym logging into a structured product experience, combining focused workout entry with protected personal data and a responsive interface.",
    features: [
      "Strength sessions with exercise selection, warm-up sets and working sets.",
      "Cardio logging, rest-day tracking and day-level activity status.",
      "Supabase authentication, protected data access and Vercel deployment.",
    ],
    privacy:
      "The live product is login-protected. Portfolio visitors can explore the product story without gaining access to private training records.",
    liveCta: "Open live app",
    githubCta: "View GitHub",
    dashboardLabel: "Training dashboard",
    todayLabel: "Today's training",
    strengthLabel: "Strength",
    cardioLabel: "Cardio",
    privacyLabel: "Private data protected",
    stackLabel: "Product stack",
  },
  zh: {
    eyebrow: "独立产品开发",
    title: "Personal Training Website",
    teaser:
      "一个由登录系统保护的私人训练追踪产品，用于记录力量训练、有氧运动和休息日。",
    openPrompt: "点击展开项目预览",
    detailTitle: "这是为真实个人训练流程打造的产品，而不是静态展示模型。",
    detailBody:
      "这个项目把日常健身记录整理成一个结构清晰的产品体验，同时兼顾快速录入、响应式界面与私人训练数据保护。",
    features: [
      "记录力量训练，包括动作选择、热身组与正式训练组。",
      "记录有氧运动、休息日以及每日训练状态。",
      "使用 Supabase 身份验证、受保护的数据访问和 Vercel 部署。",
    ],
    privacy:
      "线上产品需要登录。访客可以了解产品设计与技术实现，但无法访问任何私人训练记录。",
    liveCta: "打开线上产品",
    githubCta: "查看 GitHub",
    dashboardLabel: "训练仪表盘",
    todayLabel: "今日训练",
    strengthLabel: "力量训练",
    cardioLabel: "有氧运动",
    privacyLabel: "私人数据已保护",
    stackLabel: "产品技术栈",
  },
} as const;

const trainingProjectLinks = {
  github: "https://github.com/stevenjobs530-afk/personal-training-website-v2",
  live: "https://personal-training-website-v2.vercel.app",
} as const;

function TrainingDashboardPreview({
  cardioLabel,
  dashboardLabel,
  privacyLabel,
  strengthLabel,
  todayLabel,
}: {
  cardioLabel: string;
  dashboardLabel: string;
  privacyLabel: string;
  strengthLabel: string;
  todayLabel: string;
}) {
  return (
    <div className="apple-inner-curve relative min-h-[230px] overflow-hidden border border-white/70 bg-white/55 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_20px_55px_rgba(46,61,82,.14)] backdrop-blur-3xl max-sm:min-h-[210px]">
      <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-56 rounded-full bg-cyan-300/25 blur-3xl" />

      <div className="relative z-[1] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-white/75 bg-white/65 text-blue-600 shadow-sm">
            <Dumbbell className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-blue-600">
              {dashboardLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-neutral-900">
              {todayLabel}
            </p>
          </div>
        </div>
        <LockKeyhole className="size-5 text-neutral-500" aria-hidden="true" />
      </div>

      <div className="relative z-[1] mt-6 grid grid-cols-[auto_1fr] items-center gap-5 max-sm:gap-4">
        <div className="grid size-28 place-items-center rounded-full bg-[conic-gradient(rgba(0,122,255,.95)_0_68%,rgba(0,122,255,.14)_68%_100%)] p-3 shadow-[0_16px_35px_rgba(0,122,255,.18)] max-sm:size-24">
          <div className="grid size-full place-items-center rounded-full bg-white/90 p-2">
            <div className="grid size-full place-items-center rounded-full bg-[conic-gradient(rgba(21,214,180,.9)_0_46%,rgba(21,214,180,.14)_46%_100%)] p-2">
              <div className="grid size-full place-items-center rounded-full bg-white/95 text-blue-600">
                <Activity className="size-6" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-lg border border-white/70 bg-white/55 p-3 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-neutral-800">
              <span>{strengthLabel}</span>
              <span className="text-blue-600">68%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blue-950/10">
              <div className="h-full w-[68%] rounded-full bg-blue-500" />
            </div>
          </div>
          <div className="rounded-lg border border-white/70 bg-white/55 p-3 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-neutral-800">
              <span>{cardioLabel}</span>
              <span className="text-cyan-600">46%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cyan-950/10">
              <div className="h-full w-[46%] rounded-full bg-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] mt-5 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <LockKeyhole className="size-3.5" aria-hidden="true" />
        <span>{privacyLabel}</span>
      </div>
    </div>
  );
}

function TrainingProjectSpotlight({ content }: { content: PortfolioContent }) {
  const locale = /[\u3400-\u9fff]/u.test(content.nav.projects) ? "zh" : "en";
  const copy = trainingSpotlightCopy[locale];

  return (
    <LiquidGlass className="mb-16 overflow-hidden p-0">
      <details className="group">
        <summary className="relative list-none cursor-pointer px-6 py-7 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-inset md:px-8 md:py-9 [&::-webkit-details-marker]:hidden">
          <div className="relative z-[1] grid items-center gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)]">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-normal text-blue-600">
                {copy.eyebrow}
              </p>
              <h3 className="apple-display-text mt-4 text-[clamp(2rem,4vw,4.15rem)] leading-[.98] text-neutral-950">
                {copy.title}
              </h3>
              <p className="mt-5 text-[0.98rem] leading-8 text-neutral-600 md:text-base">
                {copy.teaser}
              </p>
              <span className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/55 px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_10px_28px_rgba(46,61,82,.1)] backdrop-blur-2xl">
                {copy.openPrompt}
                <ChevronDown
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-open:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </div>

            <TrainingDashboardPreview
              cardioLabel={copy.cardioLabel}
              dashboardLabel={copy.dashboardLabel}
              privacyLabel={copy.privacyLabel}
              strengthLabel={copy.strengthLabel}
              todayLabel={copy.todayLabel}
            />
          </div>
        </summary>

        <div
          id="training-project-details"
          className="border-t border-white/55 px-6 py-8 md:px-8 md:py-10"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)] lg:gap-14">
            <div>
              <h4 className="apple-display-text text-[clamp(1.55rem,2.8vw,2.5rem)] leading-tight text-neutral-950">
                {copy.detailTitle}
              </h4>
              <p className="mt-5 text-[0.96rem] leading-8 text-neutral-600 md:text-base">
                {copy.detailBody}
              </p>
              <ul className="mt-7 grid gap-4 text-[0.95rem] leading-7 text-neutral-600">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-2.5 grid size-5 shrink-0 place-items-center rounded-full border border-blue-200/80 bg-blue-50/80 text-blue-600">
                      <Activity className="size-3" aria-hidden="true" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/60 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="flex items-center gap-3">
                <MonitorSmartphone
                  className="size-5 text-blue-600"
                  aria-hidden="true"
                />
                <h4 className="apple-display-text text-lg text-neutral-900">
                  {copy.stackLabel}
                </h4>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Supabase", "Vercel"].map(
                  (technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ),
                )}
              </div>

              <div className="mt-7 rounded-lg border border-white/70 bg-white/35 p-4 shadow-sm backdrop-blur-xl">
                <div className="flex gap-3">
                  <LockKeyhole
                    className="mt-0.5 size-5 shrink-0 text-neutral-600"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-neutral-600">
                    {copy.privacy}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="glass" size="sm" className="gap-2">
                  <a
                    href={trainingProjectLinks.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.liveCta}
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="glass" size="sm" className="gap-2">
                  <a
                    href={trainingProjectLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="size-4" aria-hidden="true" />
                    {copy.githubCta}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </details>
    </LiquidGlass>
  );
}

export { TrainingProjectSpotlight };
