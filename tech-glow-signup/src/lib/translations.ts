export type Lang = "fr" | "en";

export interface Translations {
  lang: Lang;
  tagLine: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  formTitle: string;
  formSubtitle: string;
  fullName: string;
  email: string;
  jobTitle: string;
  phone: string;
  company: string;
  ctaButton: string;
  ctaLoading: string;
  finePrint: string;
  whyAttendTag: string;
  whyAttendTitle: string;
  whyAttendHighlight: string;
  benefits: readonly { title: string; description: string }[];
  speakerTag: string;
  speakerTitle: string;
  speakerHighlight: string;
  speakerName: string;
  speakerRole: string;
  speakerBio: string;
  footerCopy: string;
  footerLinks: readonly string[];
  days: string;
  hours: string;
  min: string;
  sec: string;
  langSwitch: string;
  langSwitchPath: string;
  successMsg: string;
  alreadyRegistered: string;
  errorMsg: string;
  requiredFields: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderJob: string;
  placeholderPhone: string;
  placeholderCompany: string;
}

export const translations = {
  fr: {
    lang: "fr" as const,
    tagLine: "ÉVÉNEMENT EN DIRECT — 20 AVRIL 2026",
    headline: "Exploiter la data pour multiplier vos performances",
    headlineHighlight: "marketing et commerciales",
    subtitle:
      "Rejoignez des experts du secteur pour un webinaire de 60 minutes sur les stratégies data-driven qui transforment vos résultats marketing et commerciaux.",
    formTitle: "Réservez votre place",
    formSubtitle: "Gratuit · 45 min · Q&R en direct",
    fullName: "Nom complet *",
    email: "Adresse e-mail *",
    jobTitle: "Poste",
    phone: "Téléphone",
    company: "Entreprise",
    ctaButton: "RÉSERVER MA PLACE →",
    ctaLoading: "Inscription...",
    finePrint: "Nous respectons votre vie privée. Désinscription à tout moment.",
    whyAttendTag: "POURQUOI PARTICIPER",
    whyAttendTitle: "Ce que vous allez",
    whyAttendHighlight: "apprendre",
    benefits: [
      {
        title: "Stratégie data-driven",
        description:
          "Découvrez comment construire une stratégie marketing alimentée par la donnée pour des résultats mesurables.",
      },
      {
        title: "Segmentation avancée",
        description:
          "Maîtrisez les techniques de segmentation client pour des campagnes ultra-ciblées.",
      },
      {
        title: "Alignement marketing & ventes",
        description:
          "Brisez les silos entre vos équipes marketing et commerciales grâce à la data partagée.",
      },
      {
        title: "ROI & automatisation",
        description:
          "Automatisez vos workflows et mesurez le ROI réel de chaque action marketing.",
      },
    ],
    speakerTag: "VOTRE INTERVENANT",
    speakerTitle: "Découvrez le",
    speakerHighlight: "conférencier",
    speakerName: "Mohamed Majed Bahri",
    speakerRole: "Data & AI Transformation Lead",
    speakerBio:
      "Avec plus de 15 ans d'expérience à l'intersection de la data et du marketing, Mohamed a accompagné des entreprises du CAC 40 dans leur transformation data-driven et développé des méthodologies adoptées par des milliers de professionnels.",
    footerCopy: "© 2026 EALAN GROUP",
    footerLinks: ["Politique de confidentialité", "Conditions d'utilisation", "Contact"],
    days: "Jours",
    hours: "Heures",
    min: "Min",
    sec: "Sec",
    langSwitch: "EN",
    langSwitchPath: "/en",
    successMsg: "Vous êtes inscrit ! Vérifiez votre boîte e-mail.",
    alreadyRegistered: "Vous êtes déjà inscrit !",
    errorMsg: "Une erreur est survenue. Veuillez réessayer.",
    requiredFields: "Veuillez remplir tous les champs obligatoires.",
    placeholderName: "Jean Dupont",
    placeholderEmail: "jean@exemple.com",
    placeholderJob: "Responsable Marketing",
    placeholderPhone: "+33 6 00 00 00 00",
    placeholderCompany: "Acme SAS",
  },
  en: {
    lang: "en" as const,
    tagLine: "LIVE EVENT — APRIL 20, 2026",
    headline: "How to Leverage Data to Multiply Your",
    headlineHighlight: "Marketing & Sales Performance",
    subtitle:
      "Join industry experts for a 60-minute deep dive into data-driven strategies that transform your marketing and sales results.",
    formTitle: "Reserve Your Spot",
    formSubtitle: "Free · 60 min · Live Q&A",
    fullName: "Full Name *",
    email: "Email Address *",
    jobTitle: "Job Title",
    phone: "Phone",
    company: "Company",
    ctaButton: "SAVE MY SEAT →",
    ctaLoading: "Registering...",
    finePrint: "We respect your privacy. Unsubscribe at any time.",
    whyAttendTag: "WHY ATTEND",
    whyAttendTitle: "What You'll",
    whyAttendHighlight: "Learn",
    benefits: [
      {
        title: "Data-Driven Strategy",
        description:
          "Discover how to build a data-powered marketing strategy for measurable results.",
      },
      {
        title: "Advanced Segmentation",
        description:
          "Master customer segmentation techniques for hyper-targeted campaigns.",
      },
      {
        title: "Marketing & Sales Alignment",
        description:
          "Break down silos between marketing and sales teams through shared data insights.",
      },
      {
        title: "ROI & Automation",
        description:
          "Automate your workflows and measure the true ROI of every marketing action.",
      },
    ],
    speakerTag: "YOUR HOST",
    speakerTitle: "Meet the",
    speakerHighlight: "Speaker",
    speakerName: "BAHRI Mohamed",
    speakerRole: "Data & Performance Director",
    speakerBio:
      "With 15+ years at the intersection of data and marketing, Jordan has guided Fortune 500 companies through data-driven transformation and developed methodologies used by thousands of professionals worldwide.",
    footerCopy: "© 2026 Your Brand",
    footerLinks: ["Privacy Policy", "Terms of Service", "Contact"],
    days: "Days",
    hours: "Hours",
    min: "Min",
    sec: "Sec",
    langSwitch: "FR",
    langSwitchPath: "/fr",
    successMsg: "You're registered! Check your email for confirmation.",
    alreadyRegistered: "You're already registered!",
    errorMsg: "Something went wrong. Please try again.",
    requiredFields: "Please fill in all required fields.",
    placeholderName: "John Doe",
    placeholderEmail: "john@example.com",
    placeholderJob: "Marketing Manager",
    placeholderPhone: "+1 (555) 000-0000",
    placeholderCompany: "Acme Inc.",
  },
} as const;
