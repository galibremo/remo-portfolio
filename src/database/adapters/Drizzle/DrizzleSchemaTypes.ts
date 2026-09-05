import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
	aboutContent,
	contactContent,
	contactInfo,
	education,
	experience,
	heros,
	projects,
	quotes,
	skills,
	users
} from "@/database/adapters/Drizzle/DrizzleSchema";

export type UserDatabaseSchemaType = InferSelectModel<typeof users>;
export type UserInsertType = InferInsertModel<typeof users>;

export type HerosType = InferSelectModel<typeof heros>;
export type HerosInsertType = InferInsertModel<typeof heros>;

export type AboutContentType = InferSelectModel<typeof aboutContent>;
export type AboutContentInsertType = InferInsertModel<typeof aboutContent>;

export type EducationType = InferSelectModel<typeof education>;
export type EducationInsertType = InferInsertModel<typeof education>;

export type ExperienceType = InferSelectModel<typeof experience>;
export type ExperienceInsertType = InferInsertModel<typeof experience>;

export type ProjectType = InferSelectModel<typeof projects>;
export type ProjectInsertType = InferInsertModel<typeof projects>;

export type SkillType = InferSelectModel<typeof skills>;
export type SkillInsertType = InferInsertModel<typeof skills>;

export type ContactInfoType = InferSelectModel<typeof contactInfo>;
export type ContactInfoInsertType = InferInsertModel<typeof contactInfo>;

export type ContactContentType = InferSelectModel<typeof contactContent>;
export type ContactContentInsertType = InferInsertModel<typeof contactContent>;

export type QuoteType = InferSelectModel<typeof quotes>;
export type QuoteInsertType = InferInsertModel<typeof quotes>;
