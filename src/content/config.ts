import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		author: z.string().optional(),
		image: z.string().optional(),
		readingTimeMinutes: z.number().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const events = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		location: z.string().optional(),
		type: z.enum(["conference", "workshop", "meetup", "webinar"]).optional(),
		image: z.string().optional(),
		eventUrl: z.string().url().optional(),
	}),
});

const projects = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		description: z.string().optional(),
		date: z.coerce.date().optional(),
		image: z.string().optional(),
		technologies: z.array(z.string()).default([]),
		repoUrl: z.string().url().optional(),
		demoUrl: z.string().url().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { blog, events, projects };
