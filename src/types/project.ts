export interface Project {
	slug: string;
	title: string;
	summary: string;
	description?: string;
	date?: Date;
	image?: string;
	technologies: string[];
	repoUrl?: string;
	demoUrl?: string;
	featured?: boolean;
}
