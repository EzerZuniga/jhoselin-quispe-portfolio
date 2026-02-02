/**
 * String slugification utilities for URL-friendly strings.
 */

/**
 * Converts a string to a URL-friendly slug.
 * @param text - The text to slugify
 * @returns A lowercase, hyphen-separated string
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("Café & Té") // "cafe-te"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // Normalize to decomposed form for handling accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
}

/**
 * Converts a slug back to a readable title.
 * @param slug - The slug to convert
 * @returns A capitalized, space-separated string
 *
 * @example
 * unslugify("hello-world") // "Hello World"
 */
export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generates a unique slug by appending a number if the slug already exists.
 * @param text - The text to slugify
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 *
 * @example
 * uniqueSlugify("Hello", ["hello"]) // "hello-1"
 * uniqueSlugify("Hello", ["hello", "hello-1"]) // "hello-2"
 */
export function uniqueSlugify(text: string, existingSlugs: string[]): string {
  let slug = slugify(text);
  let counter = 0;

  while (existingSlugs.includes(slug)) {
    counter++;
    slug = `${slugify(text)}-${counter}`;
  }

  return slug;
}

/**
 * Checks if a string is a valid slug format.
 * @param slug - The string to check
 * @returns True if the string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Truncates a slug to a maximum length while preserving word boundaries.
 * @param slug - The slug to truncate
 * @param maxLength - Maximum length (default: 50)
 * @returns Truncated slug
 */
export function truncateSlug(slug: string, maxLength: number = 50): string {
  if (slug.length <= maxLength) {
    return slug;
  }

  const truncated = slug.substring(0, maxLength);
  const lastHyphen = truncated.lastIndexOf("-");

  if (lastHyphen > 0) {
    return truncated.substring(0, lastHyphen);
  }

  return truncated;
}
