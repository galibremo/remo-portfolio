import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const ContactSectionSchema = z.object({
	heading: validateString("Heading"),
	paragraph: validateString("Paragraph")
});

export type ContactSectionSchemaType = z.infer<typeof ContactSectionSchema>;
