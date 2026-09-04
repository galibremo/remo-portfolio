import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import QuoteController from "@/modules/Quotes/Controllers/QuoteControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new QuoteController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new QuoteController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
