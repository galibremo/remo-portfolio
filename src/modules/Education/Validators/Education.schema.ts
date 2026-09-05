import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const EducationSchema = z.object({
	title: validateString("Title"),
	fullTitle: validateString("Full title"),
	institution: validateString("Institution"),
	date: validateString("Date"),
	major: z.string().nullable().optional(),
	cgpa: z.string().nullable().optional(),
	location: validateString("Location"),
	isHighlight: z.boolean(),
	isHidden: z.boolean(),
	sortOrder: z.number().int()
});

export type EducationSchemaType = z.infer<typeof EducationSchema>;
