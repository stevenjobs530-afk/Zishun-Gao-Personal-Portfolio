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
    downloadWordCV: string;
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
      "In-progress University of Bristol dissertation collaboration researching early-career professionals' workplace wellbeing needs and employer-facing support.",
    tags: ["In Progress", "Research", "Business insight"],
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
      "The strongest professional signal is the full path from dirty operational data to a cleaned analysis table and reporting visuals.",
      "For HR or interview review, this project demonstrates SQL validation, reproducible cleaning logic, and business-friendly chart outputs.",
      "A next improvement could be a Power BI-style dashboard layer, but the current project already proves the ETL and reporting foundation.",
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
      "The strongest signal is scale: the workflow handles 1.2M+ records with SQL/Python checks rather than manual spreadsheet inspection.",
      "The project is useful for data analyst roles because it combines cleaning, validation, feature derivation, grouped analysis, and visual communication.",
      "The analysis remains conservative: uncertain records are flagged and documented instead of silently overwritten.",
    ],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    linkLabel: "Open GitHub project",
  },
  {
    id: "aep",
    eyebrow: "Research design + prototype logic",
    title: "Applied Extended Project: early-career wellbeing and employer support",
    summary:
      "An in-progress University of Bristol applied research project exploring education-to-employment transition challenges and employer-facing support needs.",
    businessQuestion:
      "How can early-career transition challenges and employer support needs be understood through an ethical, discussion-ready research prototype?",
    problem:
      "The project needed a careful public-facing research prototype that could explore wellbeing, job-search pressure, workplace connectedness, AI-related pressure, cross-cultural adjustment and employer support without overclaiming final findings or collecting live responses.",
    metrics: [
      { value: "V6", label: "draft prototype iteration reviewed" },
      { value: "7-8 min", label: "target questionnaire length" },
      { value: "2", label: "main routed participant paths" },
      { value: "0", label: "live response storage in prototype" },
    ],
    method: [
      "Mapped a consent and screening flow before the main questionnaire path.",
      "Separated expected challenges for students/recent graduates from actual experience for early-career professionals.",
      "Combined Likert items, top-challenge selection, support-option ranking and open-text explanation.",
      "Kept the ethics boundary explicit: discussion prototype only, no submit, no storage and no formal release without approval.",
    ],
    results: [
      "Created a clearer prototype structure for group discussion and supervisor review.",
      "Strengthened the research scope around job-search pressure, belonging, AI, cross-cultural adjustment and accessible support.",
      "Produced a public-safe narrative that shows research judgement while keeping the project marked as in progress.",
    ],
    evidence: [
      {
        title: "Branching logic",
        body: "The prototype routes participants into expected-challenge or actual-experience paths based on their current situation.",
      },
      {
        title: "Research boundary",
        body: "The prototype states that it does not submit, transmit, store or save responses.",
      },
    ],
    code: {
      label: "Questionnaire flow sample",
      language: "Flow",
      lines: [
        "Introduction -> Consent and screening",
        "A2 student/recent graduate -> expected challenges",
        "A2 early-career experience -> actual experience",
        "Challenges -> support needs -> optional comment -> complete",
      ],
    },
    screenshots: [
      {
        title: "Questionnaire prototype preview",
        caption: "Public-safe view of the V6 discussion prototype, showing the purpose, methods note and ethics boundary.",
        src: "project-assets/aep/prototype-preview.png",
        alt: "AEP questionnaire prototype introduction screen.",
      },
    ],
    codeSamples: [
      {
        label: "Branching flow",
        language: "Flow",
        lines: [
          "Introduction -> Consent and screening",
          "A2 student/recent graduate -> expected challenges",
          "A2 early-career experience -> actual experience",
          "Challenges -> support needs -> optional comment -> complete",
        ],
      },
      {
        label: "Prototype boundary",
        language: "Text",
        lines: [
          "Prototype only: no submit, no storage.",
          "Use for discussion and supervisor review before formal release.",
          "Keep participant information, consent and ethics approval outside this public preview.",
        ],
      },
    ],
    conclusion: [
      "The project is strongest when presented as applied research design, not as final findings.",
      "The public portfolio can show careful problem framing, routing logic and ethics awareness without exposing internal research documents.",
      "The next step is to keep refining the dissertation materials privately while the website shows a polished, safe summary of the work.",
    ],
    href: "https://stevenjobs530-afk.github.io/Zishun-Gao-Personal-Portfolio/aep-questionnaire-v6-preview/",
    linkLabel: "Open prototype preview",
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
      "布里斯托大学进行中的 dissertation collaboration，研究初入职场人群的 workplace wellbeing 需求和雇主侧支持方案。",
    tags: ["进行中", "研究", "商业洞察"],
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
      "这个项目最强的信号是完整链路：从混乱运营数据，到清洗后的分析表，再到可展示的报告图表。",
      "对 HR 或面试官来说，它能证明 SQL 验证、可复现清洗逻辑和业务友好的图表输出能力。",
      "后续可以继续补一个 Power BI 风格的 dashboard，但当前版本已经能证明 ETL 和报告基础。",
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
      "这个项目最强的信号是规模：用 SQL/Python 处理 120 万级记录，而不是靠手工表格检查。",
      "它适合数据分析岗位展示，因为同时覆盖清洗、验证、派生字段、分组分析和可视化表达。",
      "分析口径保持保守：不确定记录会被标记和记录，而不是被静默覆盖。",
    ],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    linkLabel: "打开 GitHub 项目",
  },
  {
    id: "aep",
    eyebrow: "研究设计 + 原型逻辑",
    title: "应用型拓展项目：初入职场 wellbeing 与雇主支持",
    summary:
      "布里斯托大学进行中的应用型研究项目，关注 education-to-employment transition 中的挑战和雇主侧支持需求。",
    businessQuestion:
      "如何通过符合伦理边界的讨论原型，理解 early-career 人群的过渡挑战和雇主支持需求？",
    problem:
      "项目需要一个谨慎的公开研究原型，能够探索 wellbeing、求职压力、职场连接感、AI 相关压力、跨文化适应和雇主支持，同时不能提前声称最终结论或收集真实回答。",
    metrics: [
      { value: "V6", label: "已复查的问卷原型版本" },
      { value: "7-8 min", label: "目标填写时长" },
      { value: "2", label: "主要参与者分支路径" },
      { value: "0", label: "原型中的实时回答存储" },
    ],
    method: [
      "先设计 consent 与 screening，再进入主要问卷路径。",
      "区分学生/近期毕业生的 expected challenges 和 early-career professionals 的 actual experience。",
      "组合 Likert 题、Top challenges 选择、support option 排序和开放题。",
      "明确伦理边界：仅讨论原型，无提交、无存储，正式发布前需要审批。",
    ],
    results: [
      "为小组讨论和 supervisor review 形成更清晰的原型结构。",
      "强化求职压力、belonging、AI、跨文化适应和可获得支持等研究主题。",
      "在公开网站中可以展示研究判断，但仍保持 in progress 表述。",
    ],
    evidence: [
      {
        title: "分支逻辑",
        body: "原型根据参与者当前状态，进入 expected challenges 或 actual experience 路径。",
      },
      {
        title: "研究边界",
        body: "原型明确说明不提交、不传输、不存储、不保存任何回答。",
      },
    ],
    code: {
      label: "问卷流程示例",
      language: "Flow",
      lines: [
        "Introduction -> Consent and screening",
        "A2 student/recent graduate -> expected challenges",
        "A2 early-career experience -> actual experience",
        "Challenges -> support needs -> optional comment -> complete",
      ],
    },
    screenshots: [
      {
        title: "问卷原型预览",
        caption: "V6 讨论原型的公开安全视图，展示研究目的、方法说明和伦理边界。",
        src: "project-assets/aep/prototype-preview.png",
        alt: "AEP 问卷原型介绍页面。",
      },
    ],
    codeSamples: [
      {
        label: "分支流程",
        language: "Flow",
        lines: [
          "Introduction -> Consent and screening",
          "A2 student/recent graduate -> expected challenges",
          "A2 early-career experience -> actual experience",
          "Challenges -> support needs -> optional comment -> complete",
        ],
      },
      {
        label: "原型边界",
        language: "Text",
        lines: [
          "Prototype only: no submit, no storage.",
          "Use for discussion and supervisor review before formal release.",
          "Keep participant information, consent and ethics approval outside this public preview.",
        ],
      },
    ],
    conclusion: [
      "这个项目最适合被展示为应用型研究设计，而不是最终研究结论。",
      "公开作品集可以展示问题框架、问卷分支逻辑和伦理意识，同时不暴露内部研究材料。",
      "下一步应继续在私有 dissertation 材料中完善细节，网站只展示 polished 且安全的项目摘要。",
    ],
    href: "https://stevenjobs530-afk.github.io/Zishun-Gao-Personal-Portfolio/aep-questionnaire-v6-preview/",
    linkLabel: "打开原型预览",
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
      downloadWordCV: "Word CV",
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
      about: "关于",
      projects: "项目",
      experience: "经历",
      skills: "技能",
      education: "教育",
      contact: "联系",
    },
    actions: {
      viewProjects: "查看项目",
      downloadCV: "下载简历",
      downloadWordCV: "Word 简历",
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
  },
};
