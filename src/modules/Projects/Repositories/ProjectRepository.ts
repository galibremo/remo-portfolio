import { asc, count, eq } from "drizzle-orm";

import { getApiError } from "@/core/Helpers";
import { errors, successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { projects } from "@/database/adapters/Drizzle/DrizzleSchema";
import { ProjectSchemaType } from "@/modules/Projects/Validators/Project.schema";

export default class ProjectRepository extends DrizzleBaseRepository {
	async retrieveAll() {
		try {
			await requireSession();
			const rows = await this.db.query.projects.findMany({
				orderBy: [asc(projects.sortOrder), asc(projects.id)]
			});
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, rows)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async create(data: ProjectSchemaType) {
		try {
			await requireSession();
			const row = await this.db.insert(projects).values(data).returning().execute();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, row[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async update(id: number, data: ProjectSchemaType) {
		try {
			await requireSession();
			const row = await this.db
				.update(projects)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(projects.id, id))
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
			const row = await this.db.delete(projects).where(eq(projects.id, id)).returning().execute();
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
		const result = await this.db.select({ value: count() }).from(projects);
		return result[0]?.value ?? 0;
	}
}
