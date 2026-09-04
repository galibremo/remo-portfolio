import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import SkillController from "@/modules/Skills/Controllers/SkillControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new SkillController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new SkillController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
