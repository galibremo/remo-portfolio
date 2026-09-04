import { NextRequest } from "next/server";

import { ApiController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import AboutRepository from "@/modules/About/Repositories/AboutRepository";
import { AboutSchema } from "@/modules/About/Validators/About.schema";

export default class AboutController extends ApiController {
	protected aboutRepo: AboutRepository;

	constructor(request: NextRequest) {
		super(request);
		this.aboutRepo = new AboutRepository();
	}

	async get() {
		try {
			const about = await this.aboutRepo.get();
			return ServiceResponse.sendResponse(about);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async update() {
		try {
			const body = await this.getReqBody();
			const check = AboutSchema.safeParse(body);
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}

			const about = await this.aboutRepo.upsert(check.data);
			return ServiceResponse.sendResponse(about);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
