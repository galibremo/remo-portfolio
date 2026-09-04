import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const AboutSchema = z.object({
	heading: validateString("Heading"),
	paragraphOne: validateString("Paragraph one"),
	paragraphTwo: validateString("Paragraph two"),
	image: validateString("Image"),
	resumeUrl: z.string().nullable().optional(),
	socialLinks: z
		.object({
			facebook: z.string().optional(),
			instagram: z.string().optional(),
			linkedin: z.string().optional(),
			email: z.string().optional()
		})
		.nullable()
		.optional()
});

export type AboutSchemaType = z.infer<typeof AboutSchema>;
