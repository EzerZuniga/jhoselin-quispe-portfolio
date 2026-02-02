import { getCollection } from "astro:content";
import type { Project } from "@app-types/project";

/**
 * Returns portfolio projects from the Astro content collection.
 * Sorted by date (newest first) and optionally filtered by featured status.
 */
export const fetchProjects = async (options?: {
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> => {
  const entries = await getCollection("projects");

  let projects = entries.map(({ slug, data }) => ({
    slug,
    title: data.title,
    summary: data.summary,
    description: data.description,
    date: data.date,
    image: data.image,
    technologies: data.technologies,
    repoUrl: data.repoUrl,
    demoUrl: data.demoUrl,
    featured: data.featured,
  }));

  // Sort by date (newest first)
  projects.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Filter by featured if specified
  if (options?.featured !== undefined) {
    projects = projects.filter((p) => p.featured === options.featured);
  }

  // Limit results if specified
  if (options?.limit) {
    projects = projects.slice(0, options.limit);
  }

  return projects;
};

/**
 * Finds a single project by slug.
 */
export const fetchProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  const entries = await getCollection(
    "projects",
    ({ slug: entrySlug }) => entrySlug === slug
  );

  if (entries.length === 0) {
    return null;
  }

  const { data } = entries[0];
  return {
    slug,
    title: data.title,
    summary: data.summary,
    description: data.description,
    date: data.date,
    image: data.image,
    technologies: data.technologies,
    repoUrl: data.repoUrl,
    demoUrl: data.demoUrl,
    featured: data.featured,
  };
};
