export type Project = {
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  visual: "bars" | "apps" | "wave" | "code";
};

export type Experience = {
  date: string;
  role: string;
  company: string;
  bullets: string[];
};

export const profile = {
  name: "Zishun Gao",
  title: "Finance-Focused Data Analyst",
  email: "gzs20030423@gmail.com",
  location: "Bristol, UK",
  github: "https://github.com/stevenjobs530-afk",
  linkedin: "https://www.linkedin.com/in/zishun-gao-81a73a384/",
  intro:
    "MSc Management (Digitalisation and Big Data) candidate at the University of Bristol, combining a finance and international trade background with hands-on SQL, Python and BI experience.",
  introSecondary:
    "I build analysis-ready datasets from messy real-world data, with portfolio projects covering 1.6M UK retail records, 1.23M Apple App Store records and applied business research.",
  about: [
    "I am an MSc Management (Digitalisation and Big Data) candidate at the University of Bristol with a business, international trade and financial risk management background. My profile sits between business and analytics: I enjoy turning messy operational data into clearer reporting, practical insight and better decisions.",
    "My recent work combines SQL, Python, Power BI concepts and Excel across data cleaning, KPI analysis, reporting and business process improvement.",
  ],
};

export const metrics = [
  { value: "1.6M", label: "raw UK retail records" },
  { value: "524,878", label: "analysis-ready transactions" },
  { value: "£10.6M+", label: "sales value analysed" },
  { value: "1.23M", label: "App Store records" },
];

export const projects: Project[] = [
  {
    title: "UK Retail Transactions ETL, SQL Analysis & BI Reporting",
    summary:
      "Cleaned and validated 524,878 analysis-ready transactions from approximately 1.6M raw UK retail records, then analysed £10.6M+ in sales value.",
    tags: ["SQL", "MySQL", "Python", "pandas", "BI"],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    visual: "bars",
  },
  {
    title: "Apple App Store SQL & Python Analysis",
    summary:
      "Cleaned and analysed 1,229,886 App Store records using SQLite, SQL, Python, pandas, matplotlib and seaborn for data quality checks and market-style analysis.",
    tags: ["SQLite", "Python", "seaborn", "Data validation"],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    visual: "apps",
  },
  {
    title: "Applied Extended Project",
    summary:
      "In-progress University of Bristol dissertation collaboration researching early-career professionals' workplace wellbeing needs and employer-facing support.",
    tags: ["In Progress", "Research", "Business insight"],
    visual: "wave",
  },
  {
    title: "Selected GitHub Tools & Mini Projects",
    summary:
      "Automation tools and small applications, including a Pomodoro timer, automated wallpaper workflows and the Drinking Project reminder app.",
    tags: ["Automation", "Apps", "GitHub"],
    href: "https://github.com/stevenjobs530-afk",
    visual: "code",
  },
];

export const experiences: Experience[] = [
  {
    date: "Jan 2025 - Mar 2025",
    role: "Data Analysis Intern",
    company: "Licheng Holdings Group Co., Ltd.",
    bullets: [
      "Benchmarked six internal workflows and created baseline metrics for optimisation.",
      "Supported DeepSeek reporting module integration and rule tuning, improving report efficiency and field matching by 40%.",
      "Produced test cases and SOPs that contributed to a 20% reduction in manual rework.",
    ],
  },
  {
    date: "Jul 2021 - Aug 2021",
    role: "Sales Intern",
    company: "Aerospace Information (Shandong) Technology Co., Ltd.",
    bullets: [
      "Recovered RMB 100,000+ in subscription and service receivables within one month.",
      "Maintained an Excel tracker covering 4,000+ customer records.",
      "Prepared daily reconciliation records and weekly AR summaries for finance.",
    ],
  },
];

export const skills = [
  {
    title: "SQL & Databases",
    body: "SQL, MySQL, SQLite, DataGrip, joins, aggregations, validation rules and ETL cleaning logic.",
  },
  {
    title: "Python Analytics",
    body: "pandas, data profiling, missing and duplicate handling, extraction scripts, matplotlib and seaborn.",
  },
  {
    title: "BI & Reporting",
    body: "Power BI concepts, KPI cards, slicers, trend charts, Power Query, Excel PivotTables and reporting narratives.",
  },
  {
    title: "Business Analysis",
    body: "Business-question framing, KPI design, stakeholder communication, process improvement and insight storytelling.",
  },
];

export const education = [
  {
    school: "University of Bristol",
    detail: "MSc Management (Digitalisation and Big Data)",
    meta: "Sep 2025 - Sep 2026 (Expected) · Bristol, UK",
  },
  {
    school: "Central University of Finance and Economics & Victoria University",
    detail: "BSc International Trade and Economics / Financial Risk Management",
    meta: "Sep 2021 - Jul 2025 · GPA 87.36/100",
  },
];

export const awards = [
  "Outstanding Graduate, Central University of Finance and Economics (2025)",
  "First Prize, China National Undergraduate Innovation, Creativity and Entrepreneurship Challenge (2023)",
  "Second Prize, China Marketing Analysis and Research Competition (2023)",
  "Second Class Academic Scholarship (2022 and 2023)",
];
