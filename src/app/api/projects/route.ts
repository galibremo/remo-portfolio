import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ProjectController from "@/modules/Projects/Controllers/ProjectControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new ProjectController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new ProjectController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
