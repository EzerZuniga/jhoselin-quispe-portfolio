/**
 * Content Service
 * Utilities for working with content collections and markdown.
 */

/**
 * Estimates reading time for a given text.
 * @param text - The text to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Extracts the first paragraph from markdown content.
 */
export function extractFirstParagraph(markdown: string): string {
  const paragraphs = markdown.split(/\n\n+/);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();

    // Skip headings, code blocks, and other special content
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("!")
    ) {
      continue;
    }

    // Found a regular paragraph
    if (trimmed.length > 0) {
      // Strip markdown formatting
      return trimmed
        .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
        .replace(/\*(.*?)\*/g, "$1") // Italic
        .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links
        .replace(/`(.*?)`/g, "$1"); // Inline code
    }
  }

  return "";
}

/**
 * Extracts all headings from markdown content.
 */
export function extractHeadings(
  markdown: string
): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Generates a table of contents from markdown headings.
 */
export function generateTableOfContents(
  markdown: string
): Array<{ text: string; id: string; children: Array<{ text: string; id: string }> }> {
  const headings = extractHeadings(markdown).filter((h) => h.level >= 2 && h.level <= 3);
  const toc: Array<{ text: string; id: string; children: Array<{ text: string; id: string }> }> = [];

  let currentH2: { text: string; id: string; children: Array<{ text: string; id: string }> } | null = null;

  for (const heading of headings) {
    if (heading.level === 2) {
      currentH2 = { text: heading.text, id: heading.id, children: [] };
      toc.push(currentH2);
    } else if (heading.level === 3 && currentH2) {
      currentH2.children.push({ text: heading.text, id: heading.id });
    }
  }

  return toc;
}

/**
 * Strips all markdown formatting from text.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "") // Headings
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/\*(.*?)\*/g, "$1") // Italic
    .replace(/__(.*?)__/g, "$1") // Bold alt
    .replace(/_(.*?)_/g, "$1") // Italic alt
    .replace(/~~(.*?)~~/g, "$1") // Strikethrough
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links
    .replace(/!\[(.*?)\]\(.*?\)/g, "") // Images
    .replace(/`{3}[\s\S]*?`{3}/g, "") // Code blocks
    .replace(/`(.*?)`/g, "$1") // Inline code
    .replace(/^>\s+/gm, "") // Blockquotes
    .replace(/^[-*+]\s+/gm, "") // Unordered lists
    .replace(/^\d+\.\s+/gm, "") // Ordered lists
    .replace(/\n{2,}/g, "\n\n") // Multiple newlines
    .trim();
}

/**
 * Truncates content to a maximum length, preserving word boundaries.
 */
export function truncateContent(
  content: string,
  maxLength: number = 200
): string {
  if (content.length <= maxLength) {
    return content;
  }

  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? `${truncated.substring(0, lastSpace)}…`
    : `${truncated}…`;
}
