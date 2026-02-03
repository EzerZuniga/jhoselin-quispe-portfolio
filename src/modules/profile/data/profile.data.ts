import type { ProfileAbout, ProfileHero, ProfileInterest } from "@app-types/profile";

// Información del hero del perfil
export const profileHero: ProfileHero = {
  name: "Jhoselin",
  tagline: "Estudiante de Ingeniería Industrial – Quinto semestre | Universidad Continental - Cusco",
  ctaLabel: "Ver proyectos",
  ctaHref: "/projects",
};

// Información sobre mí
export const profileAbout: ProfileAbout = {
  title: "Sobre mí",
  paragraphs: [
    "Soy estudiante de Ingeniería Industrial en la Universidad Continental - Cusco, actualmente en el quinto semestre, con un marcado interés por el análisis de procesos, la mejora continua y el uso de la tecnología como herramienta para optimizar la toma de decisiones. Mi nombre completo es Jhoselin Quispe Luque.",
    "Me caracterizo por un enfoque reflexivo y analítico, buscando siempre comprender el \"por qué\" detrás de cada problema antes de plantear soluciones. Considero el aprendizaje constante como un pilar fundamental de mi desarrollo académico y profesional.",
  ],
};

// Áreas de interés
export const profileInterests: ProfileInterest[] = [
  {
    name: "Mejora de procesos",
    description: "Ingeniería Industrial aplicada a la optimización y mejora continua.",
  },
  {
    name: "Análisis de datos",
    description: "Uso de datos para la toma de decisiones estratégicas.",
  },
  {
    name: "Inteligencia Artificial",
    description: "Impacto de la IA en la industria y automatización.",
  },
  {
    name: "Industria 4.0",
    description: "Automatización y transformación digital industrial.",
  },
];
