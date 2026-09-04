import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import SkillController from "@/modules/Skills/Controllers/SkillControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new SkillController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new SkillController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
