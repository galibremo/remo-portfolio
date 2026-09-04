import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import EducationController from "@/modules/Education/Controllers/EducationControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new EducationController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new EducationController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
