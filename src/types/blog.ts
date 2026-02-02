export interface BlogPost {
	slug: string;
	title: string;
	summary: string;
	date: Date;
	author?: string;
	image?: string;
	readingTimeMinutes?: number;
	tags?: string[];
	draft?: boolean;
}
