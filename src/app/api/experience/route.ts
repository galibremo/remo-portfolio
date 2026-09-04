import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ExperienceController from "@/modules/Experience/Controllers/ExperienceControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new ExperienceController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new ExperienceController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
