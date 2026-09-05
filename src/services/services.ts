import { axiosApi } from "@/lib/axios-config";

import { AboutSchemaType } from "@/modules/About/Validators/About.schema";
import { ContactSchemaType } from "@/modules/Contact/Validators/Contact.schema";
import { ContactSectionSchemaType } from "@/modules/Contact/Validators/ContactSection.schema";
import { EducationSchemaType } from "@/modules/Education/Validators/Education.schema";
import { ExperienceSchemaType } from "@/modules/Experience/Validators/Experience.schema";
import { HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";
import { ProjectSchemaType } from "@/modules/Projects/Validators/Project.schema";
import { QuoteSchemaType } from "@/modules/Quotes/Validators/Quote.schema";
import { SkillSchemaType } from "@/modules/Skills/Validators/Skill.schema";

export const updateHeroSection = async (data: HeroSchemaType) => {
	const response = await axiosApi.put(`/hero`, data);
	return response?.data;
};

export const getHeroSection = async () => {
	const response = await axiosApi.get(`/hero`);
	return response?.data;
};

export const getAboutSection = async () => {
	const response = await axiosApi.get(`/about`);
	return response?.data;
};

export const updateAboutSection = async (data: AboutSchemaType) => {
	const response = await axiosApi.put(`/about`, data);
	return response?.data;
};

export const getEducationList = async () => {
	const response = await axiosApi.get(`/education`);
	return response?.data;
};

export const createEducation = async (data: EducationSchemaType) => {
	const response = await axiosApi.post(`/education`, data);
	return response?.data;
};

export const updateEducation = async (id: number, data: EducationSchemaType) => {
	const response = await axiosApi.put(`/education/${id}`, data);
	return response?.data;
};

export const deleteEducation = async (id: number) => {
	const response = await axiosApi.delete(`/education/${id}`);
	return response?.data;
};

export const getExperienceList = async () => {
	const response = await axiosApi.get(`/experience`);
	return response?.data;
};

export const createExperience = async (data: ExperienceSchemaType) => {
	const response = await axiosApi.post(`/experience`, data);
	return response?.data;
};

export const updateExperience = async (id: number, data: ExperienceSchemaType) => {
	const response = await axiosApi.put(`/experience/${id}`, data);
	return response?.data;
};

export const deleteExperience = async (id: number) => {
	const response = await axiosApi.delete(`/experience/${id}`);
	return response?.data;
};

export const getProjectsList = async () => {
	const response = await axiosApi.get(`/projects`);
	return response?.data;
};

export const createProject = async (data: ProjectSchemaType) => {
	const response = await axiosApi.post(`/projects`, data);
	return response?.data;
};

export const updateProject = async (id: number, data: ProjectSchemaType) => {
	const response = await axiosApi.put(`/projects/${id}`, data);
	return response?.data;
};

export const deleteProject = async (id: number) => {
	const response = await axiosApi.delete(`/projects/${id}`);
	return response?.data;
};

export const getSkillsList = async () => {
	const response = await axiosApi.get(`/skills`);
	return response?.data;
};

export const createSkill = async (data: SkillSchemaType) => {
	const response = await axiosApi.post(`/skills`, data);
	return response?.data;
};

export const updateSkill = async (id: number, data: SkillSchemaType) => {
	const response = await axiosApi.put(`/skills/${id}`, data);
	return response?.data;
};

export const deleteSkill = async (id: number) => {
	const response = await axiosApi.delete(`/skills/${id}`);
	return response?.data;
};

export const getQuotesList = async () => {
	const response = await axiosApi.get(`/quotes`);
	return response?.data;
};

export const createQuote = async (data: QuoteSchemaType) => {
	const response = await axiosApi.post(`/quotes`, data);
	return response?.data;
};

export const updateQuote = async (id: number, data: QuoteSchemaType) => {
	const response = await axiosApi.put(`/quotes/${id}`, data);
	return response?.data;
};

export const deleteQuote = async (id: number) => {
	const response = await axiosApi.delete(`/quotes/${id}`);
	return response?.data;
};

export const getContactList = async () => {
	const response = await axiosApi.get(`/contact`);
	return response?.data;
};

export const createContact = async (data: ContactSchemaType) => {
	const response = await axiosApi.post(`/contact`, data);
	return response?.data;
};

export const updateContact = async (id: number, data: ContactSchemaType) => {
	const response = await axiosApi.put(`/contact/${id}`, data);
	return response?.data;
};

export const deleteContact = async (id: number) => {
	const response = await axiosApi.delete(`/contact/${id}`);
	return response?.data;
};

export const getContactSection = async () => {
	const response = await axiosApi.get(`/contact-content`);
	return response?.data;
};

export const updateContactSection = async (data: ContactSectionSchemaType) => {
	const response = await axiosApi.put(`/contact-content`, data);
	return response?.data;
};

export const getDashboardStats = async () => {
	const response = await axiosApi.get(`/dashboard/stats`);
	return response?.data;
};
