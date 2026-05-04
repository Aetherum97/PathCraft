// Source de vérité du portfolio.
// Pour ajouter un projet : pousser un objet dans `projects` et c'est tout.

import teintexpressImg from '../assets/projects/teintexpress.png'
import tribuneoImg from '../assets/projects/tribuneo.png'

export const portfolioData = {
  identity: {
    name: "Antoine Caps",
    handle: "DevFolio",
    tagline: "Développeur reconverti, passionné et investi.",
    location: "France",
    email: "antoinecapsw@gmail.com",
    github: "Aetherum97",
    linkedin: "antoine-caps-149b01277",
    cvUrl: "/cv-antoine-caps.pdf",
  },

  projects: [
    {
      id: "teintexpress",
      order: 1,
      title: "TeintExpress",
      tagline: "Gestion de teinture pour peintures",
      description:
        "Plateforme de gestion des teintes et formules de peinture pour des coloristes. Recherche par référence, historique des préparations, gestion des stocks de pigments et export des fiches techniques.",
      role: "Développeur full-stack",
      year: "2025",
      stack: ["Vue.js", "TypeScript", "C# / .NET", "MSSQL", "Docker"],
      highlights: [
        "Moteur de recherche par référence et nuance",
        "Historique des préparations par client",
        "Fiches techniques exportables (PDF)",
      ],
      cover: { hue: 18, label: "TX", image: teintexpressImg },
      links: { live: null, repo: null },
      tags: ["Pro", "Full-stack"],
    },
    {
      id: "tribuneo",
      order: 2,
      title: "Tribuneo",
      tagline: "Chèques cadeaux dématérialisés",
      description:
        "Application de gestion de chèques cadeaux dématérialisés pour des événements URSSAF et non-URSSAF : création de campagnes, distribution multi-bénéficiaires, suivi des soldes et conformité fiscale.",
      role: "Développeur full-stack",
      year: "2025",
      stack: ["Vue.js", "Node", "PostgreSQL", "Docker", "CI/CD"],
      highlights: [
        "Multi-tenant, gestion des règles URSSAF",
        "Distribution & suivi temps-réel",
        "Tableau de bord employeur",
      ],
      cover: { hue: 38, label: "TR", image: tribuneoImg },
      links: { live: null, repo: null },
      tags: ["Pro", "Full-stack"],
    },
    {
      id: "passionmanga",
      order: 3,
      title: "PassionManga",
      tagline: "Bibliothèque de mangas favoris",
      description:
        "Projet de fin de BTS : bibliothèque communautaire de mangas avec gestion des favoris, espace lecteur et back-office admin complet (modération, gestion catalogue, statistiques).",
      role: "Développeur web — projet école",
      year: "2024",
      stack: ["PHP", "MySQL", "JS", "Bootstrap"],
      highlights: [
        "Back-office admin complet",
        "Système de favoris + recommandations",
        "Authentification multi-rôles",
      ],
      cover: { hue: 350, label: "PM", image: null },
      links: { live: null, repo: null },
      tags: ["École", "Full-stack"],
    },
    {
      id: "templatecleanarchi",
      order: 4,
      title: "TemplateCleanArchi",
      tagline: "Template .NET prêt à l'emploi",
      description:
        "Template C# / .NET pour démarrer une API propre : Clean Architecture, CI/CD GitHub Actions, gestion des migrations, conventions de logging, tests et observabilité (Grafana).",
      role: "Auteur",
      year: "2025",
      stack: ["C# / .NET", "EF Core", "GitHub Actions", "Grafana"],
      highlights: [
        "Clean Architecture out-of-the-box",
        "Migrations, seeds & policies par défaut",
        "Pipeline CI/CD complet",
      ],
      cover: { hue: 200, label: "TC", image: null },
      links: {
        live: null,
        repo: "https://github.com/Aetherum97/MyApiCleanArchiTemplate",
      },
      tags: ["Open-source", "Backend"],
    },
  ],

  skillGroups: [
    {
      id: "frontend",
      title: "Front-end",
      items: [
        { name: "HTML / CSS", level: 95 },
        { name: "JavaScript", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "Vue.js", level: 88 },
        { name: "React", level: 80 },
        { name: "Angular", level: 70 },
        { name: "Flutter", level: 65 },
        { name: "Python", level: 60 },
      ],
    },
    {
      id: "backend",
      title: "Back-end",
      items: [
        { name: "C# / .NET", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "PHP", level: 75 },
      ],
    },
    {
      id: "db",
      title: "Bases de données",
      items: [
        { name: "MySQL", level: 88 },
        { name: "PostgreSQL", level: 82 },
        { name: "MS SQL Server", level: 80 },
        { name: "MongoDB", level: 70 },
        { name: "MariaDB", level: 75 },
        { name: "SQLite", level: 75 },
      ],
    },
    {
      id: "tools",
      title: "Outils & DevOps",
      items: [
        { name: "Git / GitHub", level: 92 },
        { name: "Docker", level: 82 },
        { name: "Figma", level: 75 },
        { name: "Postman / Bruno", level: 88 },
        { name: "Swagger", level: 85 },
        { name: "Grafana", level: 65 },
      ],
    },
  ],

  timeline: [
    {
      year: "2022",
      title: "Reconversion",
      label: "Décision",
      description:
        "Reconversion vers le développement web. Auto-formation HTML/CSS/JS.",
      kind: "milestone",
    },
    {
      year: "2023",
      title: "BTS SIO / Dév. Web Mobile",
      label: "Formation",
      description:
        "Formation initiale : algorithmie, bases du web, premiers projets fullstack.",
      kind: "school",
    },
    {
      year: "2024",
      title: "PassionManga",
      label: "Projet école",
      description:
        "Projet majeur de fin de BTS — fullstack PHP/MySQL avec back-office.",
      kind: "project",
    },
    {
      year: "2024",
      title: "Début d'alternance",
      label: "Pro",
      description:
        "Entrée en alternance en tant que développeur web. Stack Vue + .NET.",
      kind: "work",
    },
    {
      year: "2025",
      title: "Tribuneo & TeintExpress",
      label: "Pro",
      description:
        "Projets clients en production. Vue.js, .NET, PostgreSQL, Docker, CI/CD.",
      kind: "project",
    },
    {
      year: "2026",
      title: "PathCraft",
      label: "Maintenant",
      description:
        "Vitrine professionnelle évolutive — Vue 3, Tailwind, motion-v.",
      kind: "now",
    },
  ],

  githubStats: {
    publicRepos: 24,
    followers: 12,
    contributionsLastYear: 847,
    topLanguages: [
      { name: "TypeScript", pct: 32, color: "#3178c6" },
      { name: "C#", pct: 28, color: "#9b4f96" },
      { name: "Vue", pct: 18, color: "#41b883" },
      { name: "PHP", pct: 12, color: "#777bb4" },
      { name: "Other", pct: 10, color: "#888" },
    ],
    pinnedRepos: [
      {
        name: "TemplateCleanArchi",
        lang: "C#",
        stars: 14,
        forks: 3,
        desc: "Clean architecture template for .NET APIs with CI/CD.",
      },
      {
        name: "tribuneo-ui",
        lang: "Vue",
        stars: 6,
        forks: 1,
        desc: "Front-end Vue 3 pour Tribuneo (private mirror).",
      },
      {
        name: "antoinecaps.dev",
        lang: "Vue",
        stars: 2,
        forks: 0,
        desc: "Source du portfolio (ce site).",
      },
    ],
  },
};
