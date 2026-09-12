import { z } from "zod";

import { validateString } from "@/validators/commonRule";

export const GallerySchema = z.object({
	title: validateString("Title"),
	altText: z.string().nullable().optional(),
	image: validateString("Image"),
	isHidden: z.boolean(),
	sortOrder: z.number().int()
});

export type GallerySchemaType = z.infer<typeof GallerySchema>;
