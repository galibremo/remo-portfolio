import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import EducationController from "@/modules/Education/Controllers/EducationControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new EducationController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new EducationController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
