import { NextRequest } from "next/server";

import { ApiController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import ContactSectionRepository from "@/modules/Contact/Repositories/ContactSectionRepository";
import { ContactSectionSchema } from "@/modules/Contact/Validators/ContactSection.schema";

export default class ContactSectionController extends ApiController {
	protected contactSectionRepo: ContactSectionRepository;

	constructor(request: NextRequest) {
		super(request);
		this.contactSectionRepo = new ContactSectionRepository();
	}

	async get() {
		try {
			const intro = await this.contactSectionRepo.get();
			return ServiceResponse.sendResponse(intro);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async update() {
		try {
			const body = await this.getReqBody();
			const check = ContactSectionSchema.safeParse(body);
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}

			const intro = await this.contactSectionRepo.upsert(check.data);
			return ServiceResponse.sendResponse(intro);
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
