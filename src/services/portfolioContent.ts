import { asc, eq } from "drizzle-orm";

import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
import {
	aboutContent,
	contactContent,
	contactInfo,
	education,
	experience,
	galleryItems,
	heros,
	projects,
	quotes,
	skills
} from "@/database/adapters/Drizzle/DrizzleSchema";
import { PortfolioContent } from "@/lib/portfolio";

/**
 * Public (unauthenticated) portfolio content for the landing page.
 * Reads the same CMS tables the dashboard writes to.
 * List sections exclude rows marked `isHidden`.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
	try {
		const [
			heroRows,
			aboutRows,
			educationRows,
			experienceRows,
			projectRows,
			galleryRows,
			skillRows,
			quoteRows,
			contactIntroRows,
			contactRows
		] = await Promise.all([
			db.select().from(heros).limit(1).execute(),
			db.select().from(aboutContent).limit(1).execute(),
			db
				.select()
				.from(education)
				.where(eq(education.isHidden, false))
				.orderBy(asc(education.sortOrder), asc(education.id))
				.execute(),
			db
				.select()
				.from(experience)
				.where(eq(experience.isHidden, false))
				.orderBy(asc(experience.sortOrder), asc(experience.id))
				.execute(),
			db
				.select()
				.from(projects)
				.where(eq(projects.isHidden, false))
				.orderBy(asc(projects.sortOrder), asc(projects.id))
				.execute(),
			db
				.select()
				.from(galleryItems)
				.where(eq(galleryItems.isHidden, false))
				.orderBy(asc(galleryItems.sortOrder), asc(galleryItems.id))
				.execute(),
			db
				.select()
				.from(skills)
				.where(eq(skills.isHidden, false))
				.orderBy(asc(skills.sortOrder), asc(skills.id))
				.execute(),
			db
				.select()
				.from(quotes)
				.where(eq(quotes.isHidden, false))
				.orderBy(asc(quotes.sortOrder), asc(quotes.id))
				.execute(),
			db.select().from(contactContent).limit(1).execute(),
			db
				.select()
				.from(contactInfo)
				.where(eq(contactInfo.isHidden, false))
				.orderBy(asc(contactInfo.sortOrder), asc(contactInfo.id))
				.execute()
		]);

		return {
			hero: heroRows[0] ?? null,
			about: aboutRows[0] ?? null,
			education: educationRows,
			experience: experienceRows,
			projects: projectRows,
			gallery: galleryRows,
			skills: skillRows,
			quotes: quoteRows,
			contactIntro: contactIntroRows[0] ?? null,
			contact: contactRows
		};
	} catch (error) {
		console.error("Database query failed in getPortfolioContent:", error);
		return {
			hero: null,
			about: null,
			education: [],
			experience: [],
			projects: [],
			gallery: [],
			skills: [],
			quotes: [],
			contactIntro: null,
			contact: []
		};
	}
}

