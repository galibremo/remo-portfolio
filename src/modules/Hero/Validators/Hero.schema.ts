import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const HeroSchema = z.object({
	name: validateString("Hero name"),
	description: validateString("Hero description"),
	statusBadge: z.string().nullable().optional(),
	typewriterRoles: z.array(z.string()),
	backgroundImage: z.string().nullable(),
	profileImage: z.string().nullable()
});

export type HeroSchemaType = z.infer<typeof HeroSchema>;
