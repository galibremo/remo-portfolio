import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import HeroController from "@/modules/Hero/Controllers/HeroControllers";

export const PUT = async (request: NextRequest) => {
	try {
		return new HeroController(request).update();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};
