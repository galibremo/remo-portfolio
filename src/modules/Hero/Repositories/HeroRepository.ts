import { auth } from "../../../../auth";
import { eq } from "drizzle-orm";

import { getApiError } from "@/core/Helpers";
import { errors, successes } from "@/core/Messages";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { heros } from "@/database/adapters/Drizzle/DrizzleSchema";
import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";

/**
 * BranchRepository is responsible for handling operations regarding the Branch Menu entity.
 * It communicates with the 'branches' table in the database and contains methods to
 * create, read, update, delete, and query branch records.
 */
export default class HeroRepository extends DrizzleBaseRepository {
	async create(data: HeroSchemaType) {
		try {
			const hero = await this.db.insert(heros).values(data).returning().execute();

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, hero[0])
			);
		} catch (error: any) {
			return getApiError(error);
		}
	}
	async getUserInfo() {
		try {
			const getAuth = await auth();
			if (!getAuth?.user)
				return Promise.reject(
					ServiceResponse.createResponse(errors.userNotFound, status.HTTP_404_NOT_FOUND)
				);

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, getAuth.user)
			);
		} catch (error: any) {
			if (error.status) return Promise.reject(error);
			return Promise.reject(
				ServiceResponse.createResponse(
					errors.internalServerError,
					status.HTTP_500_INTERNAL_SERVER_ERROR
				)
			);
		}
	}
	async update(id: string | undefined, data: HeroSchemaType) {
		try {
			if (!id) {
				return Promise.reject(
					ServiceResponse.createResponse(errors.userNotFound, status.HTTP_404_NOT_FOUND)
				);
			}
			const hero = await this.db
				.update(heros)
				.set(data)
				.where(eq(heros.userId, Number(id)))
				.returning()
				.execute();

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataUpdated, status.HTTP_200_OK, hero[0])
			);
		} catch (error: any) {
			return getApiError(error);
		}
	}
	async retrieveAll() {
		try {
			const heros = await this.db.query.heros.findMany({
				orderBy: (hero, { desc }) => [desc(hero.id)]
			});

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, heros)
			);
		} catch (error: any) {
			return getApiError(error);
		}
	}

	async getUserHeroSection(userId: string) {
		try {
			const hero = await this.db.query.heros.findFirst({
				where: eq(heros.userId, Number(userId))
			});

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, hero)
			);
		} catch (error: any) {
			return getApiError(error);
		}
	}
}
