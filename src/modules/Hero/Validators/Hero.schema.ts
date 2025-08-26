import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const HeroSchema = z.object({
	name: validateString("Hero name"),
	description: validateString("Hero description"),
	backgroundImage: validateString("Hero background image"),
	profileImage: validateString("Hero profile image")
});
export type HeroSchemaType = z.infer<typeof HeroSchema>;
