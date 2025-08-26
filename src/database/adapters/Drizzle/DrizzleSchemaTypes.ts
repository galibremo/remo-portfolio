import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { 
	users, 
	// heroContent, 
	// aboutContent, 
	// education, 
	// experience, 
	// projects, 
	// skills, 
	// contactInfo, 
	// quotes, 
	// siteSettings 
} from "@/database/adapters/Drizzle/DrizzleSchema";

// Database Schema Types
export type UserDatabaseSchemaType = InferSelectModel<typeof users>;
export type UserInsertType = InferInsertModel<typeof users>;

// export type HeroContentType = InferSelectModel<typeof heroContent>;
// export type HeroContentInsertType = InferInsertModel<typeof heroContent>;

// export type AboutContentType = InferSelectModel<typeof aboutContent>;
// export type AboutContentInsertType = InferInsertModel<typeof aboutContent>;

// export type EducationType = InferSelectModel<typeof education>;
// export type EducationInsertType = InferInsertModel<typeof education>;

// export type ExperienceType = InferSelectModel<typeof experience>;
// export type ExperienceInsertType = InferInsertModel<typeof experience>;

// export type ProjectType = InferSelectModel<typeof projects>;
// export type ProjectInsertType = InferInsertModel<typeof projects>;

// export type SkillType = InferSelectModel<typeof skills>;
// export type SkillInsertType = InferInsertModel<typeof skills>;

// export type ContactInfoType = InferSelectModel<typeof contactInfo>;
// export type ContactInfoInsertType = InferInsertModel<typeof contactInfo>;

// export type QuoteType = InferSelectModel<typeof quotes>;
// export type QuoteInsertType = InferInsertModel<typeof quotes>;

// export type SiteSettingType = InferSelectModel<typeof siteSettings>;
// export type SiteSettingInsertType = InferInsertModel<typeof siteSettings>;
