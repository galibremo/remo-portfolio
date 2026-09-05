import { getApiError } from "@/core/Helpers";
import { successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { contactContent } from "@/database/adapters/Drizzle/DrizzleSchema";
import { ContactSectionSchemaType } from "@/modules/Contact/Validators/ContactSection.schema";

export default class ContactSectionRepository extends DrizzleBaseRepository {
	async get() {
		try {
			await requireSession();
			const rows = await this.db.select().from(contactContent).limit(1).execute();
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

	async upsert(data: ContactSectionSchemaType) {
		try {
			await requireSession();
			const existing = await this.db.select().from(contactContent).limit(1).execute();

			if (existing[0]) {
				const updated = await this.db
					.update(contactContent)
					.set({ ...data, updatedAt: new Date() })
					.returning()
					.execute();
				return Promise.resolve(
					ServiceResponse.createResponse(successes.dataUpdated, status.HTTP_200_OK, updated[0])
				);
			}

			const created = await this.db.insert(contactContent).values(data).returning().execute();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, created[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}
}
