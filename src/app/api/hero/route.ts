import { NextRequest } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import HeroController from "@/modules/Hero/Controllers/HeroControllers";

export const GET = async (request: NextRequest) => {
	try {
		return new HeroController(request).getCurrentUserHero();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest) => {
	try {
		return new HeroController(request).create();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};

export const PUT = async (request: NextRequest) => {
	try {
		return new HeroController(request).update();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};
