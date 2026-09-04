import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import QuoteController from "@/modules/Quotes/Controllers/QuoteControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new QuoteController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new QuoteController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
