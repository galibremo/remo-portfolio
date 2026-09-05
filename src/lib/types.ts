import { AboutSchemaType } from "@/modules/About/Validators/About.schema";
import { ContactSchemaType } from "@/modules/Contact/Validators/Contact.schema";
import { ContactSectionSchemaType } from "@/modules/Contact/Validators/ContactSection.schema";
import { EducationSchemaType } from "@/modules/Education/Validators/Education.schema";
import { ExperienceSchemaType } from "@/modules/Experience/Validators/Experience.schema";
import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";
import { ProjectSchemaType } from "@/modules/Projects/Validators/Project.schema";
import { QuoteSchemaType } from "@/modules/Quotes/Validators/Quote.schema";
import { SkillSchemaType } from "@/modules/Skills/Validators/Skill.schema";

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data: T;
};

export type HeroSectionResponse = ApiResponse<HeroSchemaType & { id?: number; userId?: number }>;
export type AboutSectionResponse = ApiResponse<
	(AboutSchemaType & { id?: number }) | null
>;
export type EducationListResponse = ApiResponse<Array<EducationSchemaType & { id: number }>>;
export type ExperienceListResponse = ApiResponse<Array<ExperienceSchemaType & { id: number }>>;
export type ProjectsListResponse = ApiResponse<Array<ProjectSchemaType & { id: number }>>;
export type SkillsListResponse = ApiResponse<Array<SkillSchemaType & { id: number }>>;
export type QuotesListResponse = ApiResponse<Array<QuoteSchemaType & { id: number }>>;
export type ContactListResponse = ApiResponse<Array<ContactSchemaType & { id: number }>>;
export type ContactSectionResponse = ApiResponse<(ContactSectionSchemaType & { id?: number }) | null>;

export type DashboardStats = {
	hero: number;
	about: number;
	education: number;
	experience: number;
	projects: number;
	skills: number;
	quotes: number;
	contact: number;
};

export type DashboardStatsResponse = ApiResponse<DashboardStats>;
