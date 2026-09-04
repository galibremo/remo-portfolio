import { count } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

import { successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse } from "@/core/ServiceApi";
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

const getTableCount = async (table: PgTable) => {
	const result = await db.select({ value: count() }).from(table);
	return result[0]?.value ?? 0;
};

export const GET = async () => {
	try {
		await requireSession();

		const [
			heroCount,
			aboutCount,
			educationCount,
			experienceCount,
			projectCount,
			skillCount,
			quoteCount,
			contactCount
		] = await Promise.all([
			getTableCount(heros),
			getTableCount(aboutContent),
			getTableCount(education),
			getTableCount(experience),
			getTableCount(projects),
			getTableCount(skills),
			getTableCount(quotes),
			getTableCount(contactInfo)
		]);

		return ServiceResponse.successResponse(successes.dataRetrieved, {
			hero: heroCount > 0 ? 1 : 0,
			about: aboutCount > 0 ? 1 : 0,
			education: educationCount,
			experience: experienceCount,
			projects: projectCount,
			skills: skillCount,
			quotes: quoteCount,
			contact: contactCount
		});
	} catch (error: unknown) {
		return ServiceResponse.sendResponse(error as never);
	}
};
