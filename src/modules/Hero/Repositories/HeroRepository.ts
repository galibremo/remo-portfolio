import { eq } from "drizzle-orm";

import { getApiError } from "@/core/Helpers";
import { errors, successes } from "@/core/Messages";
import { requireSession } from "@/core/requireSession";
import { ServiceResponse, status } from "@/core/ServiceApi";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";
import { heros } from "@/database/adapters/Drizzle/DrizzleSchema";
import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";

export default class HeroRepository extends DrizzleBaseRepository {
	async create(data: HeroSchemaType) {
		try {
			const user = await requireSession();
			const hero = await this.db
				.insert(heros)
				.values({
					...data,
					userId: Number(user.id),
					typewriterRoles: data.typewriterRoles ?? []
				})
				.returning()
				.execute();

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataCreated, status.HTTP_201_CREATED, hero[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async getUserInfo() {
		try {
			const user = await requireSession();
			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, user)
			);
		} catch (error: unknown) {
			if (error && typeof error === "object" && "status" in error) {
				return Promise.reject(error);
			}
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
				.set({
					...data,
					typewriterRoles: data.typewriterRoles ?? [],
					updatedAt: new Date()
				})
				.where(eq(heros.userId, Number(id)))
				.returning()
				.execute();

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataUpdated, status.HTTP_200_OK, hero[0])
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async retrieveAll() {
		try {
			await requireSession();
			const rows = await this.db.query.heros.findMany({
				orderBy: (hero, { desc }) => [desc(hero.id)]
			});

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, rows)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}

	async getUserHeroSection(userId: string) {
		try {
			await requireSession();
			const hero = await this.db.query.heros.findFirst({
				where: eq(heros.userId, Number(userId))
			});

			return Promise.resolve(
				ServiceResponse.createResponse(successes.dataRetrieved, status.HTTP_200_OK, hero)
			);
		} catch (error: unknown) {
			return getApiError(error);
		}
	}
}
