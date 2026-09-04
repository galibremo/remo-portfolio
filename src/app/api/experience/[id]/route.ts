import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ExperienceController from "@/modules/Experience/Controllers/ExperienceControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new ExperienceController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new ExperienceController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
