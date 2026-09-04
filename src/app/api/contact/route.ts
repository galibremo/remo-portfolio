import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ContactController from "@/modules/Contact/Controllers/ContactControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new ContactController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new ContactController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
