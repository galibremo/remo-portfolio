import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const ExperienceSchema = z.object({
	title: validateString("Title"),
	company: validateString("Company"),
	duration: validateString("Duration"),
	description: validateString("Description"),
	image: validateString("Image"),
	technologies: z.array(z.string()),
	sortOrder: z.number().int()
});

export type ExperienceSchemaType = z.infer<typeof ExperienceSchema>;
