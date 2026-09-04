import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import EducationRepository from "@/modules/Education/Repositories/EducationRepository";
import { EducationSchema } from "@/modules/Education/Validators/Education.schema";

export default class EducationController extends ApiController implements ApiCrudController {
	protected educationRepo: EducationRepository;

	constructor(request: NextRequest) {
		super(request);
		this.educationRepo = new EducationRepository();
	}

	async index() {
		try {
			return ServiceResponse.sendResponse(await this.educationRepo.retrieveAll());
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async create() {
		try {
			const check = EducationSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.educationRepo.create(check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async show() {}

	async update(id: number | string) {
		try {
			const check = EducationSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(
				await this.educationRepo.update(Number(id), check.data)
			);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async delete(id: number | string) {
		try {
			return ServiceResponse.sendResponse(await this.educationRepo.delete(Number(id)));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
