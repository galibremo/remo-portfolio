import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const QuoteSchema = z.object({
	suraName: validateString("Sura name"),
	ayah: validateString("Ayah"),
	isHidden: z.boolean(),
	sortOrder: z.number().int()
});

export type QuoteSchemaType = z.infer<typeof QuoteSchema>;
