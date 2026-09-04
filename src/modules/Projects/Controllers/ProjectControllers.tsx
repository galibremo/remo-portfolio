import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import ProjectRepository from "@/modules/Projects/Repositories/ProjectRepository";
import { ProjectSchema } from "@/modules/Projects/Validators/Project.schema";

export default class ProjectController extends ApiController implements ApiCrudController {
	protected projectRepo: ProjectRepository;

	constructor(request: NextRequest) {
		super(request);
		this.projectRepo = new ProjectRepository();
	}

	async index() {
		try {
			return ServiceResponse.sendResponse(await this.projectRepo.retrieveAll());
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async create() {
		try {
			const check = ProjectSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.projectRepo.create(check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async show() {}

	async update(id: number | string) {
		try {
			const check = ProjectSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.projectRepo.update(Number(id), check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async delete(id: number | string) {
		try {
			return ServiceResponse.sendResponse(await this.projectRepo.delete(Number(id)));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
