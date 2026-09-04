import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import AboutController from "@/modules/About/Controllers/AboutControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new AboutController(request).get();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const PUT = async (request: NextRequest) => {
	try {
		return new AboutController(request).update();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
