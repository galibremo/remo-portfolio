import { asc, count, eq } from "drizzle-orm";

import { getApiError } from "@/core/Helpers";
import { errors, successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { education } from "@/database/adapters/Drizzle/DrizzleSchema";
import { EducationSchemaType } from "@/modules/Education/Validators/Education.schema";

export default class EducationRepository extends DrizzleBaseRepository {
	async retrieveAll() {
		try {
			await requireSession();
			const rows = await this.db.query.education.findMany({
				orderBy: [asc(education.sortOrder), asc(education.id)]
			});
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, rows)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async create(data: EducationSchemaType) {
		try {
			await requireSession();
			const row = await this.db.insert(education).values(data).returning().execute();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, row[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async update(id: number, data: EducationSchemaType) {
		try {
			await requireSession();
			const row = await this.db
				.update(education)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(education.id, id))
				.returning()
				.execute();
			if (!row[0]) {
				return Promise.reject(
					ServiceResponse.createResponse(errors.userNotFound, status.HTTP_404_NOT_FOUND)
				);
			}
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataUpdated, status.HTTP_200_OK, row[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async delete(id: number) {
		try {
			await requireSession();
			const row = await this.db.delete(education).where(eq(education.id, id)).returning().execute();
			if (!row[0]) {
				return Promise.reject(
					ServiceResponse.createResponse(errors.userNotFound, status.HTTP_404_NOT_FOUND)
				);
			}
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataDeleted, status.HTTP_200_OK, row[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async countAll() {
		const result = await this.db.select({ value: count() }).from(education);
		return result[0]?.value ?? 0;
	}
}
