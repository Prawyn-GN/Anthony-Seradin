const I18N = {
  fr: {
    title: "Anthony Séradin — Développeur Web",
    "nav.presentation": "Présentation", "nav.profil": "Profil",
    "nav.skills": "Compétences", "nav.projects": "Expériences & Projets", "nav.contact": "Contact",
    "cv": " Mon CV","soft":"Savoir-être","equipe":"Esprit d'équipe","Responsiveness":"Réactivité","Initiative":"Initiative","Adaptability":"Adaptabilité","Autonomy":"Autonomie","detail":"Rigueur",
    "hero.kicker": "Bienvenue sur mon portfolio", "hero.text": "Développeur fullstack en reconversion, en recherche d'une alternance à partir de janvier 2027. Chaque planète de cette galaxie est un de mes projets : cliquez pour l'explorer.", "hero.cta":"Découvrir mes projets →",
    "about.descript": "Fort d'une expérience de plusieurs années en comptabilité et gestion en entreprise et en cabinet, j'ai choisi d'orienter ma carrière vers le développement informatique et les nouvelles technologies. Actuellement en pré-MSC à Epitech Rennes, je suis à la recherche d'une alternance à compter de janvier 2027. Mon parcours m'a permis de développer une grande rigueur, une forte capacité d'adaptation, un esprit d'équipe ainsi qu'un esprit d'initiative que je mets aujourd'hui au service de projets informatiques.",
    all: "Tous", open: "Ouvrir", close: "Fermer le projet", switchTo: "Switch to English", other: "EN",
    description: "Description", objectives: "Objectifs", features: "Fonctionnalités",
    technologies: "Technologies", links: "Liens",
    "cat.Front-end": "Front-end", "cat.Back-end": "Back-end", "cat.Bases" :"Base de données", "cat.Outils" :"Outils","cat.Autres compétences" :"Autres compétences",
  },
  en: {
    title: "Anthony Séradin — Web Developer",
    "nav.presentation": "Home", "nav.profil": "About",
    "nav.skills": "Skills", "nav.projects": "Experience & Projects", "nav.contact": "Contact",
    "cv": "Resume","soft":"Soft skills","equipe":"Teamwork","Responsiveness":"Responsiveness","Initiative":"Initiative","Adaptability":"Adaptability","Autonomy":"Autonomy","detail":"Attention to detail",
    "hero.kicker": "Welcome to my portfolio", "hero.text": "Full-stack developer in career transition, seeking a work-study placement starting January 2027. Each planet in this galaxy is one of my projects: click to explore it.", "hero.cta":"Discover my projects →",
    "about.descript":"With several years of experience in corporate and public accounting and management, I decided to pivot my career toward software development and new technologies. Currently enrolled in a pre-MSC program at Epitech Rennes, I am looking for a work-study program starting in January 2027. My background has allowed me to develop strong rigor, high adaptability, teamwork skills, and a proactive mindset, which I now bring to IT projects.",
    all: "All", open: "Open", close: "Close project", switchTo: "Passer en français", other: "FR",
    description: "Description", objectives: "Objectives", features: "Features", data : "Data base","cat.Outils" :"Tools", "cat.Autres compétences" :"Other skills",
    technologies: "Technologies", links: "Links",
    "cat.Front-end": "Front-end", "cat.Back-end": "Back-end", "cat.Bases" :"Data Base"
  }
};

let lang = "fr";
try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("fr") ? "fr" : "en"); } catch (e) {}

const T = (k, fallback) => I18N[lang][k] ?? fallback ?? k;
// Pour les champs du JSON : texte simple, ou objet {fr, en}
const L = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.fr ?? "") : v;

function applyLang() {
  document.documentElement.lang = lang;
  document.title = T("title");
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = T(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(e => e.innerHTML = T(e.dataset.i18nHtml));
  document.querySelectorAll("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", T(e.dataset.i18nAria)));
  const b = document.getElementById("lang");
  if (b) { b.textContent = T("other"); b.setAttribute("aria-label", T("switchTo")); }
}