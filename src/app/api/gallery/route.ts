import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import GalleryController from "@/modules/Gallery/Controllers/GalleryControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new GalleryController(request).index();
	} catch {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new GalleryController(request).create();
	} catch {
		return ServiceResponse.internalServerError();
	}
};
