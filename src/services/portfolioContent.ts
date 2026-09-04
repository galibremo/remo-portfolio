import { asc } from "drizzle-orm";

import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
import {
	aboutContent,
	contactInfo,
	education,
	experience,
	heros,
	projects,
	quotes,
	skills
} from "@/database/adapters/Drizzle/DrizzleSchema";
import { PortfolioContent } from "@/lib/portfolio";

/**
 * Public (unauthenticated) portfolio content for the landing page.
 * Reads the same CMS tables the dashboard writes to.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
	const [heroRows, aboutRows, educationRows, experienceRows, projectRows, skillRows, quoteRows, contactRows] =
		await Promise.all([
			db.select().from(heros).limit(1).execute(),
			db.select().from(aboutContent).limit(1).execute(),
			db
				.select()
				.from(education)
				.orderBy(asc(education.sortOrder), asc(education.id))
				.execute(),
			db
				.select()
				.from(experience)
				.orderBy(asc(experience.sortOrder), asc(experience.id))
				.execute(),
			db
				.select()
				.from(projects)
				.orderBy(asc(projects.sortOrder), asc(projects.id))
				.execute(),
			db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id)).execute(),
			db.select().from(quotes).orderBy(asc(quotes.sortOrder), asc(quotes.id)).execute(),
			db
				.select()
				.from(contactInfo)
				.orderBy(asc(contactInfo.sortOrder), asc(contactInfo.id))
				.execute()
		]);

	return {
		hero: heroRows[0] ?? null,
		about: aboutRows[0] ?? null,
		education: educationRows,
		experience: experienceRows,
		projects: projectRows,
		skills: skillRows,
		quotes: quoteRows,
		contact: contactRows
	};
}
