import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import ContactRepository from "@/modules/Contact/Repositories/ContactRepository";
import { ContactSchema } from "@/modules/Contact/Validators/Contact.schema";

export default class ContactController extends ApiController implements ApiCrudController {
	protected contactRepo: ContactRepository;

	constructor(request: NextRequest) {
		super(request);
		this.contactRepo = new ContactRepository();
	}

	async index() {
		try {
			return ServiceResponse.sendResponse(await this.contactRepo.retrieveAll());
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async create() {
		try {
			const check = ContactSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.contactRepo.create(check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async show() {}

	async update(id: number | string) {
		try {
			const check = ContactSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.contactRepo.update(Number(id), check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async delete(id: number | string) {
		try {
			return ServiceResponse.sendResponse(await this.contactRepo.delete(Number(id)));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
