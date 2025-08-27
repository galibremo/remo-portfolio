import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const HeroSchema = z.object({
	name: validateString("Hero name"),
	description: validateString("Hero description"),
	backgroundImage: z.string().nullable(),
	profileImage: z.string().nullable()
});
export type HeroSchemaType = z.infer<typeof HeroSchema>;
