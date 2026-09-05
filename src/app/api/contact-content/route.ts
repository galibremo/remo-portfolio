import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ContactSectionController from "@/modules/Contact/Controllers/ContactSectionControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new ContactSectionController(request).get();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const PUT = async (request: NextRequest) => {
	try {
		return new ContactSectionController(request).update();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
