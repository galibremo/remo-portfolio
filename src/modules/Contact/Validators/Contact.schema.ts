import { z } from "zod";

import { validateEnum, validateString } from "@/validators/commonRule";

export const ContactSchema = z.object({
	title: validateString("Title"),
	value: validateString("Value"),
	href: z.string().nullable().optional(),
	type: validateEnum("Type", ["email", "github", "phone"]),
	sortOrder: z.number().int()
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
