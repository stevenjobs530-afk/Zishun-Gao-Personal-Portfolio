export type Project = {
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  caseStudyId?: string;
  visual: "bars" | "apps" | "wave" | "code";
};

export type Experience = {
  date: string;
  role: string;
  company: string;
  bullets: string[];
  badges?: string[];
  caseStudy?: {
    title: string;
    body: string;
    details: {
      title: string;
      body: string;
    }[];
  };
};

export type Interest = {
  title: string;
  body: string;
};

export type AwardPreview = {
  id: string;
  title: string;
  year: string;
  category: string;
  note: string;
  image: string;
  alt: string;
  privacy: string;
};

export type AwardsGallery = {
  title: string;
  body: string;
  proofCountLabel: string;
  yearLabel: string;
  categoryLabel: string;
  previousLabel: string;
  nextLabel: string;
  dotLabel: string;
  cards: AwardPreview[];
};

export type AcademicTranscript = {
  id: string;
  title: string;
  body: string;
  previewImage: string;
  previewAlt: string;
  downloadHref: string;
  downloadLabel: string;
  privacy: string;
};

export type AcademicTranscripts = {
  title: string;
  body: string;
  proofCountLabel: string;
  cards: AcademicTranscript[];
};

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyEvidence = {
  title: string;
  body: string;
};

export type CaseStudyCode = {
  label: string;
  language: string;
  lines: string[];
};

export type CaseStudyScreenshot = {
  title: string;
  caption: string;
  src: string;
  alt: string;
};

export type CaseStudy = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  businessQuestion: string;
  problem: string;
  metrics: CaseStudyMetric[];
  method: string[];
  results: string[];
  evidence: CaseStudyEvidence[];
  code: CaseStudyCode;
  screenshots: CaseStudyScreenshot[];
  codeSamples: CaseStudyCode[];
  conclusion: string[];
  href?: string;
  linkLabel?: string;
};

export const languageOptions = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "zh-CN", label: "简体中文", shortLabel: "中文" },
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

export type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brandPrimary: string;
    brandSecondary: string;
    languageLabel: string;
  };
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
  };
  actions: {
    viewProjects: string;
    downloadCV: string;
    cvPendingTitle: string;
    emailMe: string;
    viewGithub: string;
    viewProject: string;
    viewCaseStudy: string;
    discussProject: string;
    backToTop: string;
  };
  sections: {
    about: {
      label: string;
      title: string;
    };
    projects: {
      label: string;
      title: string;
    };
    caseStudies: {
      label: string;
      title: string;
      body: string;
    };
    experience: {
      label: string;
      title: string;
    };
    skills: {
      label: string;
      title: string;
    };
    education: {
      label: string;
    };
    awards: {
      label: string;
    };
    interests: {
      label: string;
      title: string;
    };
    contact: {
      label: string;
      title: string;
      body: string;
    };
  };
  caseStudyLabels: {
    businessQuestion: string;
    problem: string;
    method: string;
    result: string;
    evidence: string;
    screenshots: string;
    code: string;
    conclusion: string;
    backToProjects: string;
  };
  footer: {
    rights: string;
  };
  profile: typeof profile;
  metrics: typeof metrics;
  recruiterQuickView: typeof recruiterQuickView;
  targetRoles: typeof targetRoles;
  projects: Project[];
  caseStudies: CaseStudy[];
  experiences: Experience[];
  skills: typeof skills;
  education: typeof education;
  awards: string[];
  awardsGallery: AwardsGallery;
  academicTranscripts: AcademicTranscripts;
  interests: Interest[];
  projectShowcase?: ProjectShowcaseCopy;
};

export type ProjectShowcaseCopy = {
  eyebrow: string;
  description: string;
  focusLabel: string;
  dragHint: string;
  prevLabel: string;
  nextLabel: string;
  slideLabel: string;
  caseStudyCta: string;
  exploreCta: string;
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

export const recruiterQuickView = {
  label: "Recruiter Quick View",
  title: "30-second fit for analyst roles.",
  body:
    "A finance-background analyst who connects business questions with practical SQL, Python, data cleaning and reporting work.",
  items: [
    {
      title: "Finance background",
      body: "International trade and financial risk management training, useful for reporting, KPI interpretation and commercial context.",
    },
    {
      title: "SQL/Python data cleaning",
      body: "Portfolio workflows cover million-row datasets, validation rules, issue flags and analysis-ready tables.",
    },
    {
      title: "Business insight",
      body: "Projects are framed around business questions, reporting outputs and interview-ready decision narratives.",
    },
    {
      title: "Bilingual communication",
      body: "Chinese native speaker with professional English communication for cross-cultural teams and stakeholder work.",
    },
  ],
};

export const targetRoles = {
  label: "Target Roles",
  title: "Currently seeking graduate or entry-level analyst roles.",
  body:
    "Open to industries where financial awareness, data cleaning, reporting, business process understanding and stakeholder communication support better decisions.",
  roles: ["Data Analyst", "Business Analyst", "BI Analyst", "Finance Data Analyst", "Graduate Analyst"],
};

export const projects: Project[] = [
  {
    title: "UK Retail Transactions ETL, SQL Analysis & BI Reporting",
    summary:
      "Cleaned and validated 524,878 analysis-ready transactions from approximately 1.6M raw UK retail records, then analysed £10.6M+ in sales value.",
    tags: ["SQL", "MySQL", "Python", "pandas", "BI"],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    caseStudyId: "uk-retail",
    visual: "bars",
  },
  {
    title: "Apple App Store SQL & Python Analysis",
    summary:
      "Cleaned and analysed 1,229,886 App Store records using SQLite, SQL, Python, pandas, matplotlib and seaborn for data quality checks and market-style analysis.",
    tags: ["SQLite", "Python", "seaborn", "Data validation"],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    caseStudyId: "apple-app-store",
    visual: "apps",
  },
  {
    title: "Applied Extended Project",
    summary:
      "A live University of Bristol research questionnaire connecting a public frontend to validated Supabase submission, protected storage and analysis-ready export.",
    tags: ["Live questionnaire", "Supabase", "Research"],
    caseStudyId: "aep",
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

export const caseStudies: CaseStudy[] = [
  {
    id: "uk-retail",
    eyebrow: "ETL + SQL + BI reporting",
    title: "UK Retail Transactions: from raw export to analysis-ready reporting",
    summary:
      "A practical cleaning and reporting workflow for online retail transactions, connecting SQL validation in MySQL/DataGrip with Python chart outputs.",
    businessQuestion:
      "How can raw retail transactions be cleaned into an analysis-ready dataset that supports monthly revenue tracking, product performance review and business reporting?",
    problem:
      "The raw transaction export needed basic data discipline before analysis: Excel-style serial dates, missing descriptions and customer IDs, invalid quantity or unit-price values, and duplicate transaction rows all had to be checked before any business interpretation.",
    metrics: [
      { value: "1.6M", label: "raw retail records reviewed" },
      { value: "524,878", label: "cleaned transactions used for analysis" },
      { value: "£10.6M+", label: "sales value analysed" },
      { value: "2", label: "reporting views generated in Python" },
    ],
    method: [
      "Converted Excel serial dates into SQL datetime values before analysis.",
      "Used SQL checks for missing values, invalid transactions and duplicate records.",
      "Created a final distinct table with positive quantity, positive unit price and non-missing descriptions.",
      "Queried monthly revenue and top product revenue, then visualised results with pandas and matplotlib.",
    ],
    results: [
      "Built a reproducible cleaning path from raw retail rows to a valid reporting table.",
      "Produced monthly revenue trend and top-product revenue outputs for business-style discussion.",
      "Showed the ability to connect SQL database work with Python-based reporting assets.",
    ],
    evidence: [
      {
        title: "SQL validation",
        body: "Missing values, invalid price/quantity records and duplicates were checked before building the final table.",
      },
      {
        title: "Python reporting",
        body: "The cleaned MySQL table fed pandas scripts that saved monthly trend and top-product chart outputs.",
      },
    ],
    code: {
      label: "Cleaning logic sample",
      language: "SQL",
      lines: [
        "CREATE TABLE Online_Retail_Final AS",
        "SELECT DISTINCT *",
        "FROM Online_Retail",
        "WHERE Quantity > 0",
        "  AND UnitPrice > 0",
        "  AND Description IS NOT NULL;",
      ],
    },
    screenshots: [
      {
        title: "Monthly revenue trend",
        caption: "Python reporting output created from the cleaned MySQL table.",
        src: "project-assets/uk-retail/monthly-revenue-trend.png",
        alt: "Line chart showing UK retail monthly revenue trend.",
      },
      {
        title: "Top products by revenue",
        caption: "Top-product view used to connect cleaned transactions with business discussion.",
        src: "project-assets/uk-retail/top-products-revenue.png",
        alt: "Horizontal bar chart showing top UK retail products by revenue.",
      },
    ],
    codeSamples: [
      {
        label: "SQL cleaning table",
        language: "SQL",
        lines: [
          "CREATE TABLE Online_Retail_Final AS",
          "SELECT DISTINCT *",
          "FROM Online_Retail",
          "WHERE Quantity > 0",
          "  AND UnitPrice > 0",
          "  AND Description IS NOT NULL;",
        ],
      },
      {
        label: "Python reporting query",
        language: "Python",
        lines: [
          "query = \"\"\"",
          "SELECT DATE_FORMAT(InvoiceDate, '%Y-%m') AS Month,",
          "       ROUND(SUM(Quantity * UnitPrice), 2) AS Monthly_Revenue",
          "FROM Online_Retail_Final",
          "GROUP BY Month",
          "ORDER BY Month;",
          "\"\"\"",
          "df = pd.read_sql(query, conn)",
        ],
      },
    ],
    conclusion: [
      "In this project, I built the full analytical path from messy operational data to a cleaned analysis table and presentation-ready reporting visuals.",
      "I used SQL validation and reproducible cleaning logic to keep the data reliable, then translated the results into charts designed for business discussion.",
      "The finished workflow demonstrates my practical ability across ETL, data validation and reporting.",
    ],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    linkLabel: "Open GitHub project",
  },
  {
    id: "apple-app-store",
    eyebrow: "SQLite + Python + quality flags",
    title: "Apple App Store: large-scale data cleaning and market-style analysis",
    summary:
      "A full SQL and Python workflow for a 1.2M+ row App Store dataset, focused on conservative data quality checks and analysis-ready structures.",
    businessQuestion:
      "How can a large app-market dataset be cleaned, validated and structured to compare free/paid models, genre distribution, developer activity and update behaviour?",
    problem:
      "The source dataset was large enough to require a repeatable workflow rather than manual inspection. Key risks included blank developer links, invalid timestamps, missing prices, price/free mismatches, missing app sizes and fields that needed consistent derived logic.",
    metrics: [
      { value: "1,229,886", label: "analysis-ready App Store records" },
      { value: "1,127,384", label: "free apps identified" },
      { value: "102,502", label: "paid apps identified" },
      { value: "193,328", label: "Games category apps" },
    ],
    method: [
      "Converted source JSON into CSV and SQLite for SQL inspection and downstream processing.",
      "Normalised text, numeric, boolean and date fields using Python cleaning logic.",
      "Added derived fields such as Size_MB, Free_By_Price and Quality_Issue_Count.",
      "Validated the cleaned table with SQL, then used pandas, matplotlib and seaborn for exploratory analysis.",
    ],
    results: [
      "Flagged uncertain records instead of silently overwriting unclear business cases.",
      "Compared category mix, pricing models, developer performance, rating patterns and update activity.",
      "Documented a clear interview-ready workflow from raw data to cleaned structures to business insight.",
    ],
    evidence: [
      {
        title: "Quality flags",
        body: "The cleaning script created issue flags for blank app names, missing prices, invalid release dates and non-positive sizes.",
      },
      {
        title: "Market analysis",
        body: "The analysis compared free and paid apps, top genres, developer review volume and app update trends.",
      },
    ],
    code: {
      label: "Feature derivation sample",
      language: "Python",
      lines: [
        "df['Size_MB'] = (df['Size_Bytes'] / (1024 * 1024)).round(2)",
        "df['Free_By_Price'] = df['Price'].fillna(0).eq(0)",
        "df['Issue_Missing_Price'] = df['Price'].isna()",
        "df['Quality_Issue_Count'] = df[issue_columns].sum(axis=1)",
      ],
    },
    screenshots: [
      {
        title: "Top app genres",
        caption: "Category mix view showing Games as the largest app group in the analysis-ready dataset.",
        src: "project-assets/apple-app-store/top-genres.png",
        alt: "Bar chart showing top 10 App Store genres by app count.",
      },
      {
        title: "Free vs paid apps",
        caption: "Pricing model comparison used to explain the dataset's free-app dominance.",
        src: "project-assets/apple-app-store/free-vs-paid.png",
        alt: "Bar chart comparing paid and free App Store app counts.",
      },
      {
        title: "Update activity trend",
        caption: "Yearly update activity chart supporting the market-style analysis narrative.",
        src: "project-assets/apple-app-store/update-trend.png",
        alt: "Line chart showing App Store app update trend by year.",
      },
    ],
    codeSamples: [
      {
        label: "Quality issue flags",
        language: "Python",
        lines: [
          "df['Size_MB'] = (df['Size_Bytes'] / (1024 * 1024)).round(2)",
          "df['Free_By_Price'] = df['Price'].fillna(0).eq(0)",
          "df['Issue_Missing_Price'] = df['Price'].isna()",
          "df['Quality_Issue_Count'] = df[issue_columns].sum(axis=1)",
        ],
      },
      {
        label: "Genre aggregation",
        language: "Python",
        lines: [
          "genre_summary = (",
          "    df.groupby('Primary_Genre')",
          "      .agg(app_count=('App_Id', 'count'),",
          "           avg_rating=('Average_User_Rating', 'mean'),",
          "           avg_reviews=('Reviews', 'mean'))",
          "      .sort_values('app_count', ascending=False)",
          ")",
        ],
      },
    ],
    conclusion: [
      "In this project, I used SQL and Python to process more than 1.2 million records through a reproducible workflow instead of relying on manual spreadsheet checks.",
      "I brought data cleaning, validation, feature derivation, grouped analysis and visual communication together in one end-to-end process.",
      "I kept the analysis transparent and conservative by flagging and documenting uncertain records rather than silently overwriting them.",
    ],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    linkLabel: "Open GitHub project",
  },
  {
    id: "aep",
    eyebrow: "Live questionnaire + Supabase backend",
    title: "Applied Extended Project: early-career wellbeing and employer support",
    summary:
      "A live University of Bristol applied research questionnaire that connects a public frontend to a validated Supabase Edge Function, RLS-protected storage and export-ready data.",
    businessQuestion:
      "How can an accessible public questionnaire capture early-career transition challenges and employer support needs through a secure, analysis-ready frontend-to-backend workflow?",
    problem:
      "The project needed more than a public form: consent, routing and optional answers had to reach the backend reliably without exposing privileged credentials or opening the response table to public access. The wider research remains in progress, but the questionnaire is now live for approved collection.",
    metrics: [
      { value: "Live", label: "validated questionnaire collection" },
      { value: "8-10 min", label: "estimated completion time" },
      { value: "3", label: "routed participant paths" },
      { value: "RLS", label: "protected response storage" },
    ],
    method: [
      "Designed consent and screening before routing students/recent graduates, early-career professionals and other participants through relevant question paths.",
      "Combined Likert ratings, controlled multi-select responses and optional open text into one structured submission payload.",
      "Connected the public questionnaire to the submit-aep-questionnaire Edge Function for origin, consent, route, option and length validation.",
      "Stored accepted submissions in a dedicated RLS-protected table, with integrity checks and a flattened CSV export path for later analysis.",
    ],
    results: [
      "Delivered a working frontend-to-backend flow: the public questionnaire now saves validated live submissions through Supabase.",
      "Added protection against missing consent, invalid routes and values, unapproved origins and duplicate retries before data reaches storage.",
      "Kept the resulting dataset analysis-ready through controlled fields, integrity checks and administrator-managed CSV export.",
    ],
    evidence: [
      {
        title: "Validated submission path",
        body: "The frontend sends a structured payload to an active Edge Function; a completion reference appears only after the backend confirms the save.",
      },
      {
        title: "Protected, export-ready storage",
        body: "The response table has RLS enabled with no public table access, while controlled fields and integrity checks support administrator-managed CSV export.",
      },
    ],
    code: {
      label: "Live submission flow",
      language: "Flow",
      lines: [
        "Public questionnaire -> structured JSON payload",
        "-> Supabase Edge Function validation",
        "-> RLS-protected Postgres response table",
        "-> integrity checks and CSV export",
      ],
    },
    screenshots: [
      {
        title: "Live questionnaire frontend",
        caption: "The public seven-step questionnaire now supports consent, participant routing and secure submission.",
        src: "project-assets/aep/questionnaire-live.png",
        alt: "Live AEP early-career transition and workplace wellbeing questionnaire introduction screen.",
      },
      {
        title: "Verified Supabase backend",
        caption: "Privacy-safe configuration snapshot of the active Edge Function, validated data path and RLS-protected response table.",
        src: "project-assets/aep/supabase-backend.png",
        alt: "Verified Supabase architecture showing the questionnaire frontend connected to an Edge Function and protected Postgres storage.",
      },
    ],
    codeSamples: [
      {
        label: "Frontend-to-backend path",
        language: "Flow",
        lines: [
          "Consent + routed answers",
          "-> POST /functions/v1/submit-aep-questionnaire",
          "-> server-side validation",
          "-> live response save -> completion reference",
        ],
      },
      {
        label: "Backend guardrails",
        language: "Security",
        lines: [
          "COLLECTION_MODE = 'live'",
          "No privileged database key in the browser.",
          "RLS enabled; no public response-table access.",
          "Validated, idempotent submissions; admin-only export.",
        ],
      },
    ],
    conclusion: [
      "I translated an applied research design into a working digital collection system, connecting the participant-facing experience to server-side validation and protected database storage.",
      "The implementation separates the public interface from privileged backend access, while keeping data structured for integrity review and later analysis.",
      "The questionnaire is now live; the wider applied research and interpretation of findings remain in progress.",
    ],
    href: "https://stevenjobs530-afk.github.io/AEP-Workplace-Wellbeing-Questionnaire-Formal/",
    linkLabel: "Open live questionnaire",
  },
];

export const experiences: Experience[] = [
  {
    date: "Jan 2025 - Mar 2025",
    role: "Data Analysis Intern",
    company: "Licheng Holdings Group Co., Ltd.",
    bullets: [
      "Supported early-stage research, design and testing work for a DMS data management and analysis platform in the Data Asset Department.",
      "Benchmarked Minitab, SPSS and SAS-style statistical functions to help decompose interface logic, workflows and user requirements.",
      "Supported documentation and requirement understanding around a DeepSeek-enabled analysis/explanation module, while observing deployment and integration discussions.",
      "Contributed to workflow analysis for a reporting module targeting a 40% report generation speed improvement and an estimated 20% reduction in repetitive chart-explanation work.",
    ],
    badges: [
      "DMS design/testing support",
      "DeepSeek module research support",
      "Workflow optimisation research",
      "Multi-source data requirements",
      "Data governance awareness",
      "40% speed target",
    ],
    caseStudy: {
      title: "Internship case study: DMS and DeepSeek research support",
      body:
        "This internship strengthened my understanding of how enterprise data platforms are shaped by business needs, user experience, technical feasibility and governance requirements.",
      details: [
        {
          title: "Context",
          body: "The team was exploring a DMS platform that could move enterprise users from data input to statistical analysis, explanation and reporting.",
        },
        {
          title: "My role",
          body: "As a Data Analysis Intern, I supported research, documentation, function decomposition, testing preparation and workflow understanding rather than senior ownership.",
        },
        {
          title: "Key workstreams",
          body: "I benchmarked statistical analysis tools, reviewed interface/function logic and helped translate platform behaviour into clearer requirements and test notes.",
        },
        {
          title: "DeepSeek/DMS contribution",
          body: "I supported early research around a localized DeepSeek explanation layer and observed deployment/API-related discussions; I did not independently implement the API interface.",
        },
        {
          title: "Governance awareness",
          body: "The work included data permissions, platform workflow documentation and compliance-aware thinking for enterprise data use.",
        },
      ],
    },
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
    tags: ["SQL", "MySQL", "SQLite", "DataGrip", "ETL rules"],
  },
  {
    title: "Python Analytics",
    body: "pandas, data profiling, missing and duplicate handling, extraction scripts, matplotlib and seaborn.",
    tags: ["Python", "pandas", "matplotlib", "seaborn", "Data cleaning"],
  },
  {
    title: "BI & Reporting",
    body: "Power BI concepts, KPI cards, slicers, trend charts, Power Query, Excel PivotTables and reporting narratives.",
    tags: ["Excel", "Power BI", "Power Query", "KPI reporting", "PivotTables"],
  },
  {
    title: "Business Analysis",
    body: "Business-question framing, KPI design, stakeholder communication, process improvement and insight storytelling.",
    tags: ["Business analysis", "Stakeholder communication", "Research design", "Insight storytelling", "Process improvement"],
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

export const awardsGallery: AwardsGallery = {
  title: "Selected Award Proofs",
  body:
    "Privacy-safe previews that support the award list while keeping detailed certificate scans out of the public portfolio.",
  proofCountLabel: "selected proofs",
  yearLabel: "Year",
  categoryLabel: "Category",
  previousLabel: "Previous certificate",
  nextLabel: "Next certificate",
  dotLabel: "Show certificate",
  cards: [
    {
      id: "sanchuang",
      title: "National College Student E-commerce Challenge - University Level Awards",
      year: "2023",
      category: "Innovation / Creativity / Entrepreneurship",
      note: "Demonstrates business planning, team collaboration and entrepreneurship exposure.",
      image: "certificates/sandbox/sanchuang-awards-2023.webp",
      alt: "Privacy-safe preview of three Sanchuang university-level award certificates from 2023.",
      privacy: "Certificate numbers hidden",
    },
    {
      id: "cufe-scholarship",
      title: "Central University of Finance and Economics Scholarship",
      year: "2022 / 2023",
      category: "Academic scholarship",
      note: "Recognises consistent academic performance during undergraduate study.",
      image: "certificates/sandbox/cufe-scholarship-2022-2023.webp",
      alt: "Preview of Central University of Finance and Economics scholarship and honour certificates.",
      privacy: "Low-resolution preview",
    },
    {
      id: "cmau",
      title: "CMAU Market Research and Business Planning Competition",
      year: "2023",
      category: "Market research / business planning",
      note: "Supports business analysis, research thinking and presentation skills.",
      image: "certificates/sandbox/cmau-2023.webp",
      alt: "Privacy-safe preview of the 2023 CMAU market research and business planning competition certificate.",
      privacy: "QR and certificate number hidden",
    },
    {
      id: "research",
      title: "Urban Residents Housing and Travel Trends Research Participation",
      year: "2024",
      category: "Questionnaire survey / research participation",
      note: "Shows experience with survey research and field data collection.",
      image: "certificates/sandbox/research-participation-2024.webp",
      alt: "Low-resolution preview of a 2024 research participation certificate for housing and travel trend survey work.",
      privacy: "Low-resolution preview",
    },
  ],
};

export const academicTranscripts: AcademicTranscripts = {
  title: "Academic Transcript",
  body: "CUFE undergraduate transcripts presenting coursework, grades and GPA.",
  proofCountLabel: "transcript files",
  cards: [
    {
      id: "cufe-transcript-cn",
      title: "Chinese transcript",
      body: "Chinese undergraduate transcript from the Central University of Finance and Economics.",
      previewImage: "transcripts/Zishun_Gao_CUFE_Transcript_CN_Redacted_2025.webp",
      previewAlt: "Preview of the Chinese CUFE undergraduate transcript.",
      downloadHref: "transcripts/Zishun_Gao_CUFE_Transcript_CN_Redacted_2025.pdf",
      downloadLabel: "Download Chinese transcript",
      privacy: "Transcript PDF",
    },
    {
      id: "cufe-transcript-en",
      title: "English transcript",
      body: "English undergraduate transcript from the Central University of Finance and Economics.",
      previewImage: "transcripts/Zishun_Gao_CUFE_Transcript_EN_Redacted_2025.webp",
      previewAlt: "Preview of the English CUFE undergraduate transcript.",
      downloadHref: "transcripts/Zishun_Gao_CUFE_Transcript_EN_Redacted_2025.pdf",
      downloadLabel: "Download English transcript",
      privacy: "Transcript PDF",
    },
  ],
};

export const interests: Interest[] = [
  {
    title: "Drums",
    body: "Currently learning drums as a way to build rhythm, focus and consistent practice habits.",
  },
  {
    title: "Drawing",
    body: "Use drawing and visual thinking to develop patience, observation and design sensitivity.",
  },
  {
    title: "Photography",
    body: "Interested in composition, light and storytelling, which also supports visual communication.",
  },
  {
    title: "Sports",
    body: "Keep regular exercise as part of a balanced, resilient and energetic lifestyle.",
  },
];

const chineseProfile: typeof profile = {
  name: "高子舜",
  title: "金融背景的数据分析师",
  email: profile.email,
  location: "英国布里斯托",
  github: profile.github,
  linkedin: profile.linkedin,
  intro:
    "布里斯托大学 Management (Digitalisation and Big Data) 硕士在读，具备金融、国际贸易与数据分析背景，熟悉 SQL、Python 与 BI 报告。",
  introSecondary:
    "我擅长把真实业务中的混乱数据整理为可分析数据集，作品集覆盖 160 万条英国零售原始记录、123 万条 Apple App Store 记录与应用型商业研究。",
  about: [
    "我目前就读于布里斯托大学 Management (Digitalisation and Big Data) 硕士项目，本科背景横跨国际经济与贸易、金融风险管理。我的优势位于业务理解与数据分析之间：能把零散、复杂的运营数据转化为更清晰的报告、洞察和决策依据。",
    "近期项目主要结合 SQL、Python、Power BI 思维和 Excel，覆盖数据清洗、KPI 分析、报告叙事和业务流程优化。",
  ],
};

const chineseMetrics: typeof metrics = [
  { value: "160万", label: "英国零售原始记录" },
  { value: "52.5万", label: "清洗后的可分析交易" },
  { value: "1,060万英镑+", label: "已分析销售额" },
  { value: "123万", label: "App Store 记录" },
];

const chineseRecruiterQuickView: typeof recruiterQuickView = {
  label: "HR 快速判断",
  title: "30 秒理解我的分析岗位匹配度。",
  body: "我有金融背景，也能把业务问题连接到 SQL、Python、数据清洗和报告产出。",
  items: [
    {
      title: "金融与商业背景",
      body: "国际贸易和金融风险管理训练，适合做报告解读、KPI 分析和商业语境判断。",
    },
    {
      title: "SQL/Python 数据清洗",
      body: "作品集覆盖百万级数据、验证规则、质量标记和可分析数据表构建。",
    },
    {
      title: "业务洞察表达",
      body: "项目以业务问题、报告输出和面试可解释的决策叙事为核心。",
    },
    {
      title: "中英文沟通",
      body: "中文母语，具备专业英语沟通能力，适合跨文化团队和 stakeholder 沟通场景。",
    },
  ],
};

const chineseTargetRoles: typeof targetRoles = {
  label: "目标岗位",
  title: "正在寻找 graduate 或 entry-level 分析岗位。",
  body: "我对需要金融意识、数据清洗、报告能力、业务流程理解和沟通能力的行业保持开放。",
  roles: ["Data Analyst", "Business Analyst", "BI Analyst", "Finance Data Analyst", "Graduate Analyst"],
};

const chineseProjects: Project[] = [
  {
    title: "英国零售交易 ETL、SQL 分析与 BI 报告",
    summary:
      "从约 160 万条英国零售原始记录中清洗并验证出约 52.5 万条可分析交易，并进一步分析超过 1,060 万英镑的销售数据。",
    tags: ["SQL", "MySQL", "Python", "pandas", "BI"],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    caseStudyId: "uk-retail",
    visual: "bars",
  },
  {
    title: "Apple App Store SQL 与 Python 分析",
    summary:
      "使用 SQLite、SQL、Python、pandas、matplotlib 和 seaborn 清洗并分析约 123 万条 App Store 记录，完成数据质量检查和市场分析。",
    tags: ["SQLite", "Python", "seaborn", "数据验证"],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    caseStudyId: "apple-app-store",
    visual: "apps",
  },
  {
    title: "应用型拓展项目",
    summary:
      "布里斯托大学应用型研究问卷已上线，公开前端现已连接 Supabase 验证、受保护存储和可分析导出流程。",
    tags: ["在线问卷", "Supabase", "研究"],
    caseStudyId: "aep",
    visual: "wave",
  },
  {
    title: "GitHub 工具与小型项目精选",
    summary:
      "自动化工具和小型应用，包括 Pomodoro timer、自动壁纸流程和 Drinking Project 提醒应用。",
    tags: ["自动化", "应用", "GitHub"],
    href: "https://github.com/stevenjobs530-afk",
    visual: "code",
  },
];

const chineseCaseStudies: CaseStudy[] = [
  {
    id: "uk-retail",
    eyebrow: "ETL + SQL + BI 报告",
    title: "英国零售交易：从原始导出到可分析报表",
    summary:
      "一个完整的零售交易清洗与报告流程，把 MySQL/DataGrip 中的 SQL 验证和 Python 图表输出连接起来。",
    businessQuestion:
      "如何把原始零售交易清洗成可分析数据集，用于月度收入跟踪、产品表现复盘和业务报告？",
    problem:
      "原始交易数据在分析前需要先建立数据纪律：Excel 序列日期、缺失描述和客户 ID、无效数量或单价、重复交易行都需要先检查，不能直接进入图表分析。",
    metrics: [
      { value: "160万", label: "已检查原始零售记录" },
      { value: "52.5万", label: "清洗后的可分析交易" },
      { value: "1,060万英镑+", label: "已分析销售额" },
      { value: "2", label: "Python 报告输出视图" },
    ],
    method: [
      "先把 Excel 序列日期转换为 SQL datetime。",
      "用 SQL 检查缺失值、无效交易和重复记录。",
      "创建最终去重表，只保留正数量、正单价和非空商品描述。",
      "查询月度收入和 Top 产品收入，再用 pandas 与 matplotlib 输出图表。",
    ],
    results: [
      "从原始零售行到有效报表表，形成了可复现的清洗路径。",
      "产出月度销售趋势和 Top 产品收入视图，适合业务讨论。",
      "展示了把 SQL 数据库工作连接到 Python 报告资产的能力。",
    ],
    evidence: [
      {
        title: "SQL 验证",
        body: "在创建最终表之前，先检查缺失值、无效价格/数量记录和重复项。",
      },
      {
        title: "Python 报告",
        body: "清洗后的 MySQL 表进入 pandas 脚本，并保存月度趋势与产品收入图表。",
      },
    ],
    code: {
      label: "清洗逻辑示例",
      language: "SQL",
      lines: [
        "CREATE TABLE Online_Retail_Final AS",
        "SELECT DISTINCT *",
        "FROM Online_Retail",
        "WHERE Quantity > 0",
        "  AND UnitPrice > 0",
        "  AND Description IS NOT NULL;",
      ],
    },
    screenshots: [
      {
        title: "月度收入趋势",
        caption: "基于清洗后的 MySQL 表生成的 Python 报告输出。",
        src: "project-assets/uk-retail/monthly-revenue-trend.png",
        alt: "英国零售月度收入趋势折线图。",
      },
      {
        title: "Top 产品收入",
        caption: "用于把清洗后的交易数据转化为业务讨论的产品收入视图。",
        src: "project-assets/uk-retail/top-products-revenue.png",
        alt: "英国零售产品收入 Top 10 横向柱状图。",
      },
    ],
    codeSamples: [
      {
        label: "SQL 清洗表",
        language: "SQL",
        lines: [
          "CREATE TABLE Online_Retail_Final AS",
          "SELECT DISTINCT *",
          "FROM Online_Retail",
          "WHERE Quantity > 0",
          "  AND UnitPrice > 0",
          "  AND Description IS NOT NULL;",
        ],
      },
      {
        label: "Python 报告查询",
        language: "Python",
        lines: [
          "query = \"\"\"",
          "SELECT DATE_FORMAT(InvoiceDate, '%Y-%m') AS Month,",
          "       ROUND(SUM(Quantity * UnitPrice), 2) AS Monthly_Revenue",
          "FROM Online_Retail_Final",
          "GROUP BY Month",
          "ORDER BY Month;",
          "\"\"\"",
          "df = pd.read_sql(query, conn)",
        ],
      },
    ],
    conclusion: [
      "项目从原始零售数据出发，依次完成清洗、验证、分析和图表呈现，形成一套连贯的分析流程。",
      "SQL 验证和可复现的清洗规则保证了数据口径一致，Python 图表则让结果更便于业务讨论。",
      "整套流程覆盖 ETL、数据验证和报告呈现，并保留了清晰、可追溯的处理路径。",
    ],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    linkLabel: "打开 GitHub 项目",
  },
  {
    id: "apple-app-store",
    eyebrow: "SQLite + Python + 质量标记",
    title: "Apple App Store：大规模数据清洗与市场分析",
    summary:
      "围绕 120 万级 App Store 数据集构建 SQL + Python 工作流，重点是保守的数据质量检查和可分析数据结构。",
    businessQuestion:
      "如何清洗、验证并组织大规模应用市场数据，用于比较免费/付费模式、类别分布、开发者活跃度和更新行为？",
    problem:
      "数据规模较大，不能依赖手工检查。主要风险包括开发者链接缺失、App 名称空白、无效时间戳、价格逻辑不一致、App 大小缺失，以及需要统一派生逻辑的字段。",
    metrics: [
      { value: "123万", label: "可分析 App Store 记录" },
      { value: "112.7万", label: "识别出的免费应用" },
      { value: "10.3万", label: "识别出的付费应用" },
      { value: "19.3万", label: "Games 类别应用" },
    ],
    method: [
      "将源 JSON 转换为 CSV 和 SQLite，便于 SQL 检查和后续处理。",
      "使用 Python 清洗逻辑规范文本、数值、布尔值和日期字段。",
      "增加 Size_MB、Free_By_Price 和 Quality_Issue_Count 等派生字段。",
      "用 SQL 验证清洗结果，再用 pandas、matplotlib、seaborn 做探索性分析。",
    ],
    results: [
      "对不确定记录采用标记而不是静默覆盖，保留分析透明度。",
      "比较了类别结构、定价模式、开发者表现、评分模式和更新活跃度。",
      "形成了从原始数据到清洗结构再到商业洞察的面试可解释流程。",
    ],
    evidence: [
      {
        title: "质量标记",
        body: "清洗脚本为 App 名称空白、价格缺失、发布日期无效和大小异常等问题创建 issue flags。",
      },
      {
        title: "市场分析",
        body: "分析覆盖免费/付费应用、Top 类别、开发者评论量和应用更新趋势。",
      },
    ],
    code: {
      label: "派生字段示例",
      language: "Python",
      lines: [
        "df['Size_MB'] = (df['Size_Bytes'] / (1024 * 1024)).round(2)",
        "df['Free_By_Price'] = df['Price'].fillna(0).eq(0)",
        "df['Issue_Missing_Price'] = df['Price'].isna()",
        "df['Quality_Issue_Count'] = df[issue_columns].sum(axis=1)",
      ],
    },
    screenshots: [
      {
        title: "Top App 类别",
        caption: "类别结构视图，显示 Games 是分析数据集中最大的应用类别。",
        src: "project-assets/apple-app-store/top-genres.png",
        alt: "App Store 应用数量 Top 10 类别柱状图。",
      },
      {
        title: "免费与付费应用",
        caption: "定价模式对比，用来说明数据集中免费应用占主导。",
        src: "project-assets/apple-app-store/free-vs-paid.png",
        alt: "App Store 免费应用与付费应用数量对比柱状图。",
      },
      {
        title: "应用更新趋势",
        caption: "按年份展示更新活跃度，支撑市场分析叙事。",
        src: "project-assets/apple-app-store/update-trend.png",
        alt: "App Store 应用按年份更新趋势折线图。",
      },
    ],
    codeSamples: [
      {
        label: "质量问题标记",
        language: "Python",
        lines: [
          "df['Size_MB'] = (df['Size_Bytes'] / (1024 * 1024)).round(2)",
          "df['Free_By_Price'] = df['Price'].fillna(0).eq(0)",
          "df['Issue_Missing_Price'] = df['Price'].isna()",
          "df['Quality_Issue_Count'] = df[issue_columns].sum(axis=1)",
        ],
      },
      {
        label: "类别聚合分析",
        language: "Python",
        lines: [
          "genre_summary = (",
          "    df.groupby('Primary_Genre')",
          "      .agg(app_count=('App_Id', 'count'),",
          "           avg_rating=('Average_User_Rating', 'mean'),",
          "           avg_reviews=('Reviews', 'mean'))",
          "      .sort_values('app_count', ascending=False)",
          ")",
        ],
      },
    ],
    conclusion: [
      "120 万级 App Store 记录通过 SQL 和 Python 完成批量清洗与分析，避免依赖手工表格检查。",
      "数据清洗、验证、派生字段、分组分析和可视化被整合在同一套可复现流程中。",
      "对于不确定记录，保留问题标记和处理记录，不做静默覆盖，使分析口径保持透明、审慎。",
    ],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    linkLabel: "打开 GitHub 项目",
  },
  {
    id: "aep",
    eyebrow: "在线问卷 + Supabase 后端",
    title: "应用型拓展项目：初入职场 wellbeing 与雇主支持",
    summary:
      "布里斯托大学应用型研究问卷已正式上线：公开前端连接 Supabase Edge Function，经验证后写入受 RLS 保护的数据表，并保留后续分析所需的导出能力。",
    businessQuestion:
      "如何通过安全、可分析的前后端流程，让公开问卷有效收集 early-career 人群的过渡挑战和雇主支持需求？",
    problem:
      "项目需要的不只是一个公开表单：consent、分支和可选回答必须可靠地进入后端，同时不能在浏览器暴露高权限凭据，也不能让公众直接访问回答表。整体研究仍在进行中，但问卷目前已经进入获批的在线收集阶段。",
    metrics: [
      { value: "Live", label: "已验证的在线问卷收集" },
      { value: "8-10 min", label: "预计填写时长" },
      { value: "3", label: "参与者分支路径" },
      { value: "RLS", label: "受保护的回答存储" },
    ],
    method: [
      "先完成 consent 与 screening，再把学生/近期毕业生、early-career professionals 和其他参与者引导到对应分支。",
      "把 Likert 评分、受控多选和可选开放题整理成统一的结构化提交数据。",
      "公开问卷连接 submit-aep-questionnaire Edge Function，在后端校验来源、同意状态、分支、选项和值域。",
      "通过验证的回答写入专用 RLS 数据表，并保留完整性检查和扁平化 CSV 导出流程。",
    ],
    results: [
      "打通了公开问卷前端与 Supabase 后端：通过验证的在线提交可以被安全保存。",
      "在数据入库前处理未同意、无效分支和值、非允许来源与重复重试等风险。",
      "通过受控字段、完整性检查和管理员导出，让后续分析继续保持可追溯。",
    ],
    evidence: [
      {
        title: "已验证的提交路径",
        body: "前端把结构化数据发送到已启用的 Edge Function；只有后端确认保存成功后，页面才显示完成编号。",
      },
      {
        title: "受保护且可导出的存储",
        body: "回答表启用 RLS 且不开放公众直接访问；受控字段和完整性检查支持管理员进行 CSV 导出。",
      },
    ],
    code: {
      label: "在线提交路径",
      language: "Flow",
      lines: [
        "公开问卷 -> 结构化 JSON 数据",
        "-> Supabase Edge Function 后端验证",
        "-> 受 RLS 保护的 Postgres 回答表",
        "-> 完整性检查与 CSV 导出",
      ],
    },
    screenshots: [
      {
        title: "在线问卷前端",
        caption: "公开七步问卷目前支持 consent、参与者分支和安全提交。",
        src: "project-assets/aep/questionnaire-live.png",
        alt: "AEP 初入职场过渡与 workplace wellbeing 在线问卷介绍页面。",
      },
      {
        title: "已核验的 Supabase 后端",
        caption: "不含参与者数据的配置快照，展示启用中的 Edge Function、验证路径和受 RLS 保护的回答表。",
        src: "project-assets/aep/supabase-backend.png",
        alt: "已核验的 Supabase 架构图，显示问卷前端连接 Edge Function 与受保护的 Postgres 存储。",
      },
    ],
    codeSamples: [
      {
        label: "前端到后端路径",
        language: "Flow",
        lines: [
          "Consent + 分支回答",
          "-> POST /functions/v1/submit-aep-questionnaire",
          "-> 后端验证",
          "-> 在线保存 -> 返回完成编号",
        ],
      },
      {
        label: "后端保护措施",
        language: "Security",
        lines: [
          "COLLECTION_MODE = 'live'",
          "浏览器中不包含高权限数据库密钥。",
          "已启用 RLS；公众无法直接访问回答表。",
          "提交经过验证并支持安全重试；导出仅限管理员。",
        ],
      },
    ],
    conclusion: [
      "项目已经从研究设计推进到可实际运行的数字收集系统，把参与者看到的问卷连接到后端验证与受保护数据库。",
      "实现中明确分离公开界面和高权限后端访问，同时让数据继续适用于完整性复核和后续分析。",
      "问卷目前已经上线；整体应用型研究和最终结果解释仍在持续进行中。",
    ],
    href: "https://stevenjobs530-afk.github.io/AEP-Workplace-Wellbeing-Questionnaire-Formal/",
    linkLabel: "打开在线问卷",
  },
];

const chineseExperiences: Experience[] = [
  {
    date: "2025 年 1 月 - 2025 年 3 月",
    role: "数据分析实习生",
    company: "Licheng Holdings Group Co., Ltd.",
    bullets: [
      "在 Data Asset Department 支持 DMS 数据管理与分析平台的早期研究、设计和测试工作。",
      "对标 Minitab、SPSS、SAS 等统计分析工具，辅助拆解界面逻辑、功能流程和用户需求。",
      "围绕 DeepSeek-enabled 分析/解释模块支持资料理解、需求梳理和文档工作，并观察部署与集成讨论。",
      "参与报告模块流程分析；该项目阶段目标是提升约 40% 报告生成速度，并预计减少约 20% 重复图表解释工作。",
    ],
    badges: [
      "DMS 设计/测试支持",
      "DeepSeek 模块研究支持",
      "流程优化研究",
      "多源数据需求理解",
      "数据治理意识",
      "40% 速度目标",
    ],
    caseStudy: {
      title: "实习案例：DMS 与 DeepSeek 研究支持",
      body: "这段实习让我更理解企业数据平台如何同时受到业务需求、用户体验、技术可行性和数据治理要求的影响。",
      details: [
        {
          title: "背景",
          body: "团队在探索一个 DMS 平台，帮助企业用户从数据输入进入统计分析、解释和报告输出。",
        },
        {
          title: "我的角色",
          body: "我作为数据分析实习生，支持研究、文档、功能拆解、测试准备和流程理解，而不是项目的主要负责人。",
        },
        {
          title: "关键工作",
          body: "我对标统计分析软件，梳理界面和功能逻辑，并把平台行为转化为更清楚的需求和测试记录。",
        },
        {
          title: "DeepSeek/DMS 贡献",
          body: "我支持本地化 DeepSeek 解释层的早期研究，并观察部署/API 相关讨论；不把自己表述为独立 API 实现者。",
        },
        {
          title: "治理意识",
          body: "工作涉及数据权限、平台流程文档和企业数据使用中的合规意识。",
        },
      ],
    },
  },
  {
    date: "2021 年 7 月 - 2021 年 8 月",
    role: "销售实习生",
    company: "Aerospace Information (Shandong) Technology Co., Ltd.",
    bullets: [
      "一个月内追回 10 万元以上订阅与服务应收款。",
      "维护覆盖 4,000+ 客户记录的 Excel 跟踪表。",
      "为财务团队准备每日对账记录和每周应收账款汇总。",
    ],
  },
];

const chineseSkills: typeof skills = [
  {
    title: "SQL 与数据库",
    body: "SQL、MySQL、SQLite、DataGrip、表连接、聚合分析、验证规则和 ETL 清洗逻辑。",
    tags: ["SQL", "MySQL", "SQLite", "DataGrip", "ETL 清洗"],
  },
  {
    title: "Python 数据分析",
    body: "pandas、数据画像、缺失值与重复值处理、数据抽取脚本、matplotlib 和 seaborn。",
    tags: ["Python", "pandas", "matplotlib", "seaborn", "数据清洗"],
  },
  {
    title: "BI 与报告",
    body: "Power BI 思维、KPI 卡片、筛选器、趋势图、Power Query、Excel PivotTables 和报告叙事。",
    tags: ["Excel", "Power BI", "Power Query", "KPI 报告", "透视表"],
  },
  {
    title: "业务分析",
    body: "业务问题拆解、KPI 设计、利益相关方沟通、流程优化和洞察表达。",
    tags: ["业务分析", "Stakeholder communication", "Research design", "洞察表达", "流程优化"],
  },
];

const chineseEducation: typeof education = [
  {
    school: "University of Bristol",
    detail: "Management (Digitalisation and Big Data) 理学硕士",
    meta: "2025 年 9 月 - 2026 年 9 月（预计）· 英国布里斯托",
  },
  {
    school: "中央财经大学 & Victoria University",
    detail: "国际经济与贸易 / 金融风险管理 本科",
    meta: "2021 年 9 月 - 2025 年 7 月 · GPA 87.36/100",
  },
];

const chineseAwards: string[] = [
  "中央财经大学优秀毕业生（2025）",
  "全国大学生创新创业大赛一等奖（2023）",
  "中国市场调查与分析大赛二等奖（2023）",
  "二等学业奖学金（2022、2023）",
];

const chineseAwardsGallery: AwardsGallery = {
  title: "奖项证明预览墙",
  body: "用隐私安全、低分辨率的预览图补充荣誉列表，不直接公开原始高清扫描件。",
  proofCountLabel: "项精选证明",
  yearLabel: "年份",
  categoryLabel: "类别",
  previousLabel: "上一张证书",
  nextLabel: "下一张证书",
  dotLabel: "查看证书",
  cards: [
    {
      id: "sanchuang",
      title: "全国大学生电子商务“三创赛”校级奖项",
      year: "2023",
      category: "创新 / 创意 / 创业",
      note: "体现商业策划、团队协作和创业项目参与经历。",
      image: "certificates/sandbox/sanchuang-awards-2023.webp",
      alt: "2023 年三创赛校级创业、创新、创意奖项证书的隐私安全预览图。",
      privacy: "已隐藏证书编号",
    },
    {
      id: "cufe-scholarship",
      title: "中央财经大学奖学金 / 荣誉证明",
      year: "2022 / 2023",
      category: "学业奖学金",
      note: "体现本科阶段稳定的学业表现。",
      image: "certificates/sandbox/cufe-scholarship-2022-2023.webp",
      alt: "中央财经大学奖学金和荣誉证书预览图。",
      privacy: "低分辨率预览",
    },
    {
      id: "cmau",
      title: "CMAU 全国大学生市场研究与商业策划大赛",
      year: "2023",
      category: "市场研究 / 商业策划",
      note: "体现商业分析、研究思维和展示表达能力。",
      image: "certificates/sandbox/cmau-2023.webp",
      alt: "2023 年 CMAU 市场研究与商业策划大赛证书的隐私安全预览图。",
      privacy: "已隐藏二维码和证书编号",
    },
    {
      id: "research",
      title: "城市居民住房与出行趋势调研参与证明",
      year: "2024",
      category: "问卷调查 / 研究参与",
      note: "体现问卷调研和数据收集相关经历。",
      image: "certificates/sandbox/research-participation-2024.webp",
      alt: "2024 年住房与出行趋势问卷调研参与证明的低分辨率预览图。",
      privacy: "低分辨率预览",
    },
  ],
};

const chineseAcademicTranscripts: AcademicTranscripts = {
  title: "成绩单",
  body: "中央财经大学本科成绩单，展示主要课程、成绩与 GPA。",
  proofCountLabel: "份成绩单",
  cards: [
    {
      id: "cufe-transcript-cn",
      title: "中文成绩单",
      body: "中央财经大学本科中文成绩单。",
      previewImage: "transcripts/Zishun_Gao_CUFE_Transcript_CN_Redacted_2025.webp",
      previewAlt: "中央财经大学本科中文成绩单预览图。",
      downloadHref: "transcripts/Zishun_Gao_CUFE_Transcript_CN_Redacted_2025.pdf",
      downloadLabel: "下载中文成绩单",
      privacy: "PDF 成绩单",
    },
    {
      id: "cufe-transcript-en",
      title: "英文成绩单",
      body: "中央财经大学本科英文成绩单。",
      previewImage: "transcripts/Zishun_Gao_CUFE_Transcript_EN_Redacted_2025.webp",
      previewAlt: "中央财经大学本科英文成绩单预览图。",
      downloadHref: "transcripts/Zishun_Gao_CUFE_Transcript_EN_Redacted_2025.pdf",
      downloadLabel: "下载英文成绩单",
      privacy: "PDF 成绩单",
    },
  ],
};

const chineseInterests: Interest[] = [
  {
    title: "架子鼓",
    body: "正在学习架子鼓，用持续练习培养节奏感、专注力和稳定投入的习惯。",
  },
  {
    title: "绘画",
    body: "通过绘画和视觉思考训练观察力、耐心和设计敏感度。",
  },
  {
    title: "摄影",
    body: "关注构图、光线和叙事，也帮助我提升可视化表达意识。",
  },
  {
    title: "运动",
    body: "保持规律运动，让自己维持积极、平衡和有韧性的生活状态。",
  },
];

export const portfolioByLanguage: Record<LanguageCode, PortfolioContent> = {
  en: {
    meta: {
      title: "Zishun Gao | Finance-Focused Data Analyst",
      description:
        "Zishun Gao is a finance-focused data analyst combining SQL, Python, BI reporting and business analysis experience.",
    },
    header: {
      brandPrimary: "Zishun",
      brandSecondary: "Gao",
      languageLabel: "Select language",
    },
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    actions: {
      viewProjects: "View Projects",
      downloadCV: "Download CV",
      cvPendingTitle: "CV download will be added later",
      emailMe: "Email Me",
      viewGithub: "View GitHub",
      viewProject: "View Project",
      viewCaseStudy: "View Case Study",
      discussProject: "Discuss Project",
      backToTop: "Back to top",
    },
    sections: {
      about: {
        label: "About",
        title: "Business context, data discipline and practical execution.",
      },
      projects: {
        label: "Featured Projects",
        title: "Evidence-led portfolio work.",
      },
      caseStudies: {
        label: "Case Studies",
        title: "What changed, how I worked, and what the evidence shows.",
        body:
          "These deeper notes are built from the real SQL, Python, reporting and research files behind the portfolio, so each project is easier to assess in an interview context.",
      },
      experience: {
        label: "Experience",
        title: "Experience shaped into practical reporting.",
      },
      skills: {
        label: "Skills",
        title: "A practical stack for analysis, reporting and business context.",
      },
      education: {
        label: "Education",
      },
      awards: {
        label: "Awards",
      },
      interests: {
        label: "Beyond Data",
        title: "A little rhythm, observation and balance outside the screen.",
      },
      contact: {
        label: "Contact",
        title: "Let's connect.",
        body: "I am open to data analyst, BI analyst, business analyst, finance analyst and graduate scheme opportunities.",
      },
    },
    footer: {
      rights: "© 2026 Zishun Gao. All rights reserved.",
    },
    caseStudyLabels: {
      businessQuestion: "Business Question",
      problem: "Problem",
      method: "Method",
      result: "Result",
      evidence: "Evidence",
      screenshots: "Screenshots",
      code: "Code",
      conclusion: "Conclusion",
      backToProjects: "Back to project cards",
    },
    profile,
    metrics,
    recruiterQuickView,
    targetRoles,
    projects,
    caseStudies,
    experiences,
    skills,
    education,
    awards,
    awardsGallery,
    academicTranscripts,
    interests,
    projectShowcase: {
      eyebrow: "Featured work",
      description:
        "Three analyst case studies built from real SQL, Python and research files — plus the smaller tools I build on the side. Drag, swipe or use the arrows to move through them.",
      focusLabel: "Focus areas",
      dragHint: "Drag to shuffle",
      prevLabel: "Previous project",
      nextLabel: "Next project",
      slideLabel: "Go to project",
      caseStudyCta: "Read case study",
      exploreCta: "View on GitHub",
    },
  },
  "zh-CN": {
    meta: {
      title: "高子舜 | 金融背景的数据分析师",
      description: "高子舜的个人作品集，展示 SQL、Python、BI 报告、业务分析与数据清洗项目经验。",
    },
    header: {
      brandPrimary: "高子舜",
      brandSecondary: "Portfolio",
      languageLabel: "选择语言",
    },
    nav: {
      about: "关于我",
      projects: "项目",
      experience: "经历",
      skills: "技能",
      education: "教育",
      contact: "联系",
    },
    actions: {
      viewProjects: "查看项目",
      downloadCV: "下载简历",
      cvPendingTitle: "公开版简历链接稍后添加",
      emailMe: "发送邮件",
      viewGithub: "查看 GitHub",
      viewProject: "查看项目",
      viewCaseStudy: "查看案例",
      discussProject: "交流项目",
      backToTop: "返回顶部",
    },
    sections: {
      about: {
        label: "关于",
        title: "业务理解、数据纪律与落地执行。",
      },
      projects: {
        label: "重点项目",
        title: "用可验证成果呈现分析能力。",
      },
      caseStudies: {
        label: "项目案例",
        title: "问题、方法、证据和结果。",
        body:
          "这些案例来自真实的 SQL、Python、报告和研究原型文件，用更适合面试和 HR 快速判断的方式说明项目价值。",
      },
      experience: {
        label: "经历",
        title: "把实习经历沉淀为可复用的报告能力。",
      },
      skills: {
        label: "技能",
        title: "面向分析、报告与业务语境的实用技术栈。",
      },
      education: {
        label: "教育",
      },
      awards: {
        label: "荣誉",
      },
      interests: {
        label: "数据之外",
        title: "在屏幕之外保留节奏、观察和生活平衡。",
      },
      contact: {
        label: "联系",
        title: "期待交流。",
        body: "我关注数据分析、BI 分析、业务分析、金融分析和 graduate scheme 相关机会，也适合需要中英文沟通背景的岗位。",
      },
    },
    footer: {
      rights: "© 2026 高子舜。保留所有权利。",
    },
    caseStudyLabels: {
      businessQuestion: "业务问题",
      problem: "问题",
      method: "方法",
      result: "结果",
      evidence: "证据",
      screenshots: "截图",
      code: "代码",
      conclusion: "结论",
      backToProjects: "返回项目卡片",
    },
    profile: chineseProfile,
    metrics: chineseMetrics,
    recruiterQuickView: chineseRecruiterQuickView,
    targetRoles: chineseTargetRoles,
    projects: chineseProjects,
    caseStudies: chineseCaseStudies,
    experiences: chineseExperiences,
    skills: chineseSkills,
    education: chineseEducation,
    awards: chineseAwards,
    awardsGallery: chineseAwardsGallery,
    academicTranscripts: chineseAcademicTranscripts,
    interests: chineseInterests,
    projectShowcase: {
      eyebrow: "重点项目",
      description:
        "三个基于真实 SQL、Python 与研究文件构建的数据分析案例，以及业余打造的小工具。可拖拽、滑动或使用箭头浏览。",
      focusLabel: "核心方向",
      dragHint: "拖动卡片切换",
      prevLabel: "上一个项目",
      nextLabel: "下一个项目",
      slideLabel: "跳转到项目",
      caseStudyCta: "查看案例",
      exploreCta: "在 GitHub 查看",
    },
  },
};
