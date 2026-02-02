export interface ProfileHero {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaHref?: string;
}

export interface ProfileAbout {
  title: string;
  paragraphs: string[];
}

export interface ProfileInterest {
  name: string;
  description?: string;
  url?: string;
}
