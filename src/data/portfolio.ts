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
  footer: {
    rights: string;
  };
  profile: typeof profile;
  metrics: typeof metrics;
  projects: Project[];
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
  { value: "1.6M", label: "英国零售原始记录" },
  { value: "524,878", label: "清洗后的可分析交易" },
  { value: "£10.6M+", label: "已分析销售额" },
  { value: "1.23M", label: "App Store 记录" },
];

const chineseProjects: Project[] = [
  {
    title: "英国零售交易 ETL、SQL 分析与 BI 报告",
    summary:
      "从约 160 万条英国零售原始记录中清洗并验证出 524,878 条可分析交易，并进一步分析超过 £10.6M 的销售数据。",
    tags: ["SQL", "MySQL", "Python", "pandas", "BI"],
    href: "https://github.com/stevenjobs530-afk/UK-Retail-Sales-ETL-SQL-Analysis",
    visual: "bars",
  },
  {
    title: "Apple App Store SQL 与 Python 分析",
    summary:
      "使用 SQLite、SQL、Python、pandas、matplotlib 和 seaborn 清洗并分析 1,229,886 条 App Store 记录，完成数据质量检查和市场分析。",
    tags: ["SQLite", "Python", "seaborn", "数据验证"],
    href: "https://github.com/stevenjobs530-afk/Apple-App-Store-Data-Cleaning-Analysis",
    visual: "apps",
  },
  {
    title: "应用型拓展项目",
    summary:
      "布里斯托大学进行中的 dissertation collaboration，研究初入职场人群的 workplace wellbeing 需求和雇主侧支持方案。",
    tags: ["进行中", "研究", "商业洞察"],
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

const chineseExperiences: Experience[] = [
  {
    date: "2025 年 1 月 - 2025 年 3 月",
    role: "数据分析实习生",
    company: "Licheng Holdings Group Co., Ltd.",
    bullets: [
      "对标 6 个内部工作流程，并建立优化前的基线指标。",
      "支持 DeepSeek 报告模块集成与规则调优，使报告效率和字段匹配表现提升 40%。",
      "编写测试用例和 SOP，帮助减少 20% 的手工返工。",
    ],
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
  },
  {
    title: "Python 数据分析",
    body: "pandas、数据画像、缺失值与重复值处理、数据抽取脚本、matplotlib 和 seaborn。",
  },
  {
    title: "BI 与报告",
    body: "Power BI 思维、KPI 卡片、筛选器、趋势图、Power Query、Excel PivotTables 和报告叙事。",
  },
  {
    title: "业务分析",
    body: "业务问题拆解、KPI 设计、利益相关方沟通、流程优化和洞察表达。",
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
      cvPendingTitle: "CV download will be added later",
      emailMe: "Email Me",
      viewGithub: "View GitHub",
      viewProject: "View Project",
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
    profile,
    metrics,
    projects,
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
      cvPendingTitle: "公开版简历链接稍后添加",
      emailMe: "发送邮件",
      viewGithub: "查看 GitHub",
      viewProject: "查看项目",
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
    profile: chineseProfile,
    metrics: chineseMetrics,
    projects: chineseProjects,
    experiences: chineseExperiences,
    skills: chineseSkills,
    education: chineseEducation,
    awards: chineseAwards,
  },
};
