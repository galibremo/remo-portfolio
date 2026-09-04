import { z } from "zod";

import { validateEnum, validateString } from "@/validators/commonRule";

export const SkillSchema = z.object({
	name: validateString("Name"),
	category: validateEnum("Category", ["frontend", "backend"]),
	proficiency: z.number().int().min(0).max(100),
	sortOrder: z.number().int()
});

export type SkillSchemaType = z.infer<typeof SkillSchema>;
