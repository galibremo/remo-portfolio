import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";

export type HeroSectionResponse = {
	success: boolean;
	message: string;
	data: HeroSchemaType;
};
