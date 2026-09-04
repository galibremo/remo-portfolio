import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import ContactController from "@/modules/Contact/Controllers/ContactControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new ContactController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new ContactController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
