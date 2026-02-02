import { getCollection } from "astro:content";
import type { BlogPost } from "@app-types/blog";
import { calculateReadingTime } from "@services/content.service";

/**
 * Retrieves all blog posts from the Astro content collection.
 * Sorted by date (newest first), excluding drafts by default.
 */
export const fetchBlogPosts = async (options?: {
  limit?: number;
  tag?: string;
  includeDrafts?: boolean;
}): Promise<BlogPost[]> => {
  const entries = await getCollection("blog", ({ data }) => {
    // Filter out drafts unless explicitly included
    if (!options?.includeDrafts && data.draft) {
      return false;
    }
    return true;
  });

  let posts = await Promise.all(
    entries.map(async ({ slug, data, body }) => ({
      slug,
      title: data.title,
      summary: data.summary,
      date: data.date,
      author: data.author,
      image: data.image,
      readingTimeMinutes: data.readingTimeMinutes ?? calculateReadingTime(body),
      tags: data.tags,
      draft: data.draft,
    }))
  );

  // Filter by tag if specified
  if (options?.tag) {
    const tagLower = options.tag.toLowerCase();
    posts = posts.filter((p) =>
      p.tags?.some((t) => t.toLowerCase() === tagLower)
    );
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Limit results if specified
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
};

/**
 * Locates a blog post by slug using the content collection.
 */
export const fetchBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  const entries = await getCollection(
    "blog",
    ({ slug: entrySlug }) => entrySlug === slug
  );

  if (entries.length === 0) {
    return null;
  }

  const { data, body } = entries[0];
  return {
    slug,
    title: data.title,
    summary: data.summary,
    date: data.date,
    author: data.author,
    image: data.image,
    readingTimeMinutes: data.readingTimeMinutes ?? calculateReadingTime(body),
    tags: data.tags,
    draft: data.draft,
  };
};
