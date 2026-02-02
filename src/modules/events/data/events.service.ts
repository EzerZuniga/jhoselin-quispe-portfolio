import { getCollection } from "astro:content";
import type { EventEntry } from "@app-types/event";

/**
 * Fetches timeline events from the content collection.
 * Sorted by date (newest first).
 */
export const fetchEvents = async (options?: {
  limit?: number;
  upcoming?: boolean;
}): Promise<EventEntry[]> => {
  const entries = await getCollection("events");
  const now = new Date();

  let events = entries.map(({ slug, data }) => ({
    slug,
    title: data.title,
    summary: data.summary,
    date: data.date,
    location: data.location,
    type: data.type,
    image: data.image,
    eventUrl: data.eventUrl,
  }));

  // Filter by upcoming/past if specified
  if (options?.upcoming !== undefined) {
    events = events.filter((e) => {
      const eventDate = new Date(e.date);
      return options.upcoming
        ? eventDate >= now
        : eventDate < now;
    });
  }

  // Sort by date
  events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    // Upcoming events: ascending (soonest first)
    // Past events: descending (most recent first)
    return options?.upcoming ? dateA - dateB : dateB - dateA;
  });

  // Limit results if specified
  if (options?.limit) {
    events = events.slice(0, options.limit);
  }

  return events;
};

/**
 * Finds an event by slug for detail pages.
 */
export const fetchEventBySlug = async (
  slug: string
): Promise<EventEntry | null> => {
  const entries = await getCollection(
    "events",
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
    date: data.date,
    location: data.location,
    type: data.type,
    image: data.image,
    eventUrl: data.eventUrl,
  };
};
