import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import HeroRepository from "@/modules/Hero/Repositories/HeroRepository";
import { HeroSchema } from "@/modules/Hero/Validators/Hero.schema";

export default class HeroController extends ApiController implements ApiCrudController {
	protected heroRepo: HeroRepository;
	/**
	 * Construct the controller
	 *
	 * @param request
	 */
	constructor(request: NextRequest) {
		super(request);
		this.heroRepo = new HeroRepository();
	}

	async index() {
		try {
			const heros = await this.heroRepo.retrieveAll();

			return ServiceResponse.sendResponse(heros);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}

	async create() {
		try {
			const body = await this.getReqBody();

			const check = HeroSchema.safeParse(body);
			if (!check.success)
				return ServiceResponse.badResponse(
					check.error.issues.map(error => error.message).join(", ")
				);

			const hero = await this.heroRepo.create(check.data);

			return ServiceResponse.sendResponse(hero);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}

	async show() {
		
	}

	async update() {
		try {
			const { data } = await this.heroRepo.getUserInfo();
			const body = await this.getReqBody();

			const check = HeroSchema.safeParse(body);
			if (!check.success)
				return ServiceResponse.badResponse(
					check.error.issues.map(error => error.message).join(", ")
				);

			const hero = await this.heroRepo.update(data?.id, check.data);

			return ServiceResponse.sendResponse(hero);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}

	async delete(id: number) {}

	/**
	 * Get current user's hero section data
	 */
	async getCurrentUserHero() {
		try {
			const { data: user } = await this.heroRepo.getUserInfo();

			if (!user?.id) {
				return ServiceResponse.badResponse("User not authenticated");
			}

			const response = await this.heroRepo.getUserHeroSection(user.id);

			return ServiceResponse.sendResponse(response);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}
}
