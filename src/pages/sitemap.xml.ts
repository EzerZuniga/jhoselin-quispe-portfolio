import { seoConfig } from "@seo/seo.config";
import { getCollection } from "astro:content";

interface SitemapEntry {
	loc: string;
	lastmod: string;
	changefreq: "daily" | "weekly" | "monthly" | "yearly" | "always" | "never";
	priority: string;
}

const withBaseUrl = (path: string) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${seoConfig.siteUrl}${normalizedPath}`;
};

const formatDate = (date?: Date, fallback?: string) =>
	date?.toISOString() ?? fallback ?? new Date().toISOString();

export async function GET() {
	const buildDate = new Date().toISOString();

	const [blogPosts, events, projects] = await Promise.all([
		getCollection("blog"),
		getCollection("events"),
		getCollection("projects"),
	]);

	const staticPages: SitemapEntry[] = [
		{ path: "/", priority: "1.0" },
		{ path: "/about", priority: "0.9" },
		{ path: "/projects", priority: "0.9" },
		{ path: "/blog", priority: "0.9" },
		{ path: "/events", priority: "0.8" },
		{ path: "/contact", priority: "0.7" },
	].map((page) => ({
		loc: withBaseUrl(page.path),
		lastmod: buildDate,
		changefreq: "monthly",
		priority: page.priority,
	}));

	const blogEntries: SitemapEntry[] = blogPosts
		.filter((post) => !post.data.draft)
		.map((post) => ({
			loc: withBaseUrl(`/blog/${post.slug}`),
			lastmod: formatDate(post.data.date, buildDate),
			changefreq: "monthly",
			priority: "0.8",
		}));

	const eventEntries: SitemapEntry[] = events.map((event) => ({
		loc: withBaseUrl(`/events/${event.slug}`),
		lastmod: formatDate(event.data.date, buildDate),
		changefreq: "yearly",
		priority: "0.7",
	}));

	const projectEntries: SitemapEntry[] = projects.map((project) => ({
		loc: withBaseUrl(`/projects/${project.slug}`),
		lastmod: formatDate(project.data.date, buildDate),
		changefreq: "monthly",
		priority: project.data.featured ? "0.8" : "0.6",
	}));

	const urls = [...staticPages, ...blogEntries, ...eventEntries, ...projectEntries]
		.map(
			(entry) => `\t<url>\n\t\t<loc>${entry.loc}</loc>\n\t\t<lastmod>${entry.lastmod}</lastmod>\n\t\t<changefreq>${entry.changefreq}</changefreq>\n\t\t<priority>${entry.priority}</priority>\n\t</url>`
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}