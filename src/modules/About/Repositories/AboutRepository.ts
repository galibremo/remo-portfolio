import { getApiError } from "@/core/Helpers";
import { successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { aboutContent } from "@/database/adapters/Drizzle/DrizzleSchema";
import { AboutSchemaType } from "@/modules/About/Validators/About.schema";

export default class AboutRepository extends DrizzleBaseRepository {
	async get() {
		try {
			await requireSession();
			const rows = await this.db.select().from(aboutContent).limit(1).execute();
			return Promise.resolve(
				ServiceResponse.createResponse(
					successes.dataRetrieved,
					status.HTTP_200_OK,
					rows[0] ?? null
				)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async upsert(data: AboutSchemaType) {
		try {
			await requireSession();
			const existing = await this.db.select().from(aboutContent).limit(1).execute();

			if (existing[0]) {
				const updated = await this.db
					.update(aboutContent)
					.set({ ...data, updatedAt: new Date() })
					.returning()
					.execute();
				return Promise.resolve(
					ServiceResponse.createResponse(successes.dataUpdated, status.HTTP_200_OK, updated[0])
				);
			}

			const created = await this.db.insert(aboutContent).values(data).returning().execute();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, created[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}
}
