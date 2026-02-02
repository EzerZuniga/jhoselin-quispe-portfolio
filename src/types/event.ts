export interface EventEntry {
	slug: string;
	title: string;
	summary: string;
	date: Date;
	location?: string;
	type?: "conference" | "workshop" | "meetup" | "webinar";
	image?: string;
	eventUrl?: string;
}
