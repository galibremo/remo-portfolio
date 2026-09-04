import { NextRequest } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import QuoteRepository from "@/modules/Quotes/Repositories/QuoteRepository";
import { QuoteSchema } from "@/modules/Quotes/Validators/Quote.schema";

export default class QuoteController extends ApiController implements ApiCrudController {
	protected quoteRepo: QuoteRepository;

	constructor(request: NextRequest) {
		super(request);
		this.quoteRepo = new QuoteRepository();
	}

	async index() {
		try {
			return ServiceResponse.sendResponse(await this.quoteRepo.retrieveAll());
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async create() {
		try {
			const check = QuoteSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.quoteRepo.create(check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async show() {}

	async update(id: number | string) {
		try {
			const check = QuoteSchema.safeParse(await this.getReqBody());
			if (!check.success) {
				return ServiceResponse.badResponse(
					check.error.issues.map(issue => issue.message).join(", ")
				);
			}
			return ServiceResponse.sendResponse(await this.quoteRepo.update(Number(id), check.data));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}

	async delete(id: number | string) {
		try {
			return ServiceResponse.sendResponse(await this.quoteRepo.delete(Number(id)));
		} catch (error: unknown) {
			return ServiceResponse.sendResponse(error as never);
		}
	}
}
