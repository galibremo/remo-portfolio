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

	async index() {}

	async create() {}

	async show(id: number) {}

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
}
