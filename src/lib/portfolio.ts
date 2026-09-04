import {
	AboutContentType,
	ContactInfoType,
	EducationType,
	ExperienceType,
	HerosType,
	ProjectType,
	QuoteType,
	SkillType
} from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

export type SkillChartDatum = {
	key: string;
	data: number;
};

export type PortfolioContent = {
	hero: HerosType | null;
	about: AboutContentType | null;
	education: EducationType[];
	experience: ExperienceType[];
	projects: ProjectType[];
	skills: SkillType[];
	quotes: QuoteType[];
	contact: ContactInfoType[];
};
