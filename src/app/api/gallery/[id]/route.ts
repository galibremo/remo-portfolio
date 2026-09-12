import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import GalleryController from "@/modules/Gallery/Controllers/GalleryControllers";

type RouteContext = { params: Promise<{ id: string }> };

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new GalleryController(request).update(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
	try {
		const { id } = await params;
		return new GalleryController(request).delete(id);
	} catch {
		return ServiceResponse.internalServerError();
	}
};
