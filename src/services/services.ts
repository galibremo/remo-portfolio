import { axiosApi } from "@/lib/axios-config";

import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";

export const updateHeroSection = async (data: HeroSchemaType) => {
	const response = await axiosApi.put(`/hero`, data);
	return response?.data;
};

export const getHeroSection = async () => {
	const response = await axiosApi.get(`/hero`);
	return response?.data;
};
