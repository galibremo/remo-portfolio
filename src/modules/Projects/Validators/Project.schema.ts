import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const ProjectSchema = z.object({
	title: validateString("Title"),
	category: validateString("Category"),
	description: validateString("Description"),
	image: validateString("Image"),
	githubUrl: z.string().nullable().optional(),
	liveUrl: z.string().nullable().optional(),
	tags: z.array(z.string()),
	isGithubPrivate: z.boolean(),
	sortOrder: z.number().int()
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
