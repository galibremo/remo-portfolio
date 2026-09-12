import { asc, count, eq } from "drizzle-orm";

import { getApiError } from "@/core/Helpers";
import { errors, successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { galleryItems } from "@/database/adapters/Drizzle/DrizzleSchema";
import { GallerySchemaType } from "@/modules/Gallery/Validators/Gallery.schema";

export default class GalleryRepository extends DrizzleBaseRepository {
	async retrieveAll() {
		try {
			await requireSession();
			const rows = await this.db.query.galleryItems.findMany({
				orderBy: [asc(galleryItems.sortOrder), asc(galleryItems.id)]
			});
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, rows)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async create(data: GallerySchemaType) {
		try {
			await requireSession();
			const row = await this.db.insert(galleryItems).values(data).returning().execute();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, row[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async update(id: number, data: GallerySchemaType) {
		try {
			await requireSession();
			const row = await this.db
				.update(galleryItems)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(galleryItems.id, id))
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
			const row = await this.db
				.delete(galleryItems)
				.where(eq(galleryItems.id, id))
				.returning()
				.execute();
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
		const result = await this.db.select({ value: count() }).from(galleryItems);
		return result[0]?.value ?? 0;
	}
}
