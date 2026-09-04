import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import ExperienceRepository from "@/modules/Experience/Repositories/ExperienceRepository";
import { ExperienceSchema } from "@/modules/Experience/Validators/Experience.schema";

export default class ExperienceController extends ApiController implements ApiCrudController {
	protected experienceRepo: ExperienceRepository;

	constructor(request: NextRequest) {
		super(request);
		this.experienceRepo = new ExperienceRepository();
	}

	async index() {
		try {
			return ServiceResponse.sendResponse(await this.experienceRepo.retrieveAll());
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async create() {
		try {
			const check = ExperienceSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.experienceRepo.create(check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async show() {}

	async update(id: number | string) {
		try {
			const check = ExperienceSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(
				await this.experienceRepo.update(Number(id), check.data)
			);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async delete(id: number | string) {
		try {
			return ServiceResponse.sendResponse(await this.experienceRepo.delete(Number(id)));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
