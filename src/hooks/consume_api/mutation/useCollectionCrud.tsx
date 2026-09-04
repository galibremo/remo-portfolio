import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import {
	contactKeys,
	educationKeys,
	experienceKeys,
	projectsKeys,
	quotesKeys,
	skillsKeys
} from "@/lib/keyes";
import {
	ContactListResponse,
	EducationListResponse,
	ExperienceListResponse,
	ProjectsListResponse,
	QuotesListResponse,
	SkillsListResponse
} from "@/lib/types";
import { DEFAULT_STALE_TIME } from "@/lib/utils";

import {
	createContact,
	createEducation,
	createExperience,
	createProject,
	createQuote,
	createSkill,
	deleteContact,
	deleteEducation,
	deleteExperience,
	deleteProject,
	deleteQuote,
	deleteSkill,
	getContactList,
	getEducationList,
	getExperienceList,
	getProjectsList,
	getQuotesList,
	getSkillsList,
	updateContact,
	updateEducation,
	updateExperience,
	updateProject,
	updateQuote,
	updateSkill
} from "@/services/services";
import { ContactSchemaType } from "@/modules/Contact/Validators/Contact.schema";
import { EducationSchemaType } from "@/modules/Education/Validators/Education.schema";
import { ExperienceSchemaType } from "@/modules/Experience/Validators/Experience.schema";
import { ProjectSchemaType } from "@/modules/Projects/Validators/Project.schema";
import { QuoteSchemaType } from "@/modules/Quotes/Validators/Quote.schema";
import { SkillSchemaType } from "@/modules/Skills/Validators/Skill.schema";

function handleMutationError(error: unknown, fallback: string) {
	if (axios.isAxiosError(error)) {
		toast.error(error.response?.data?.message ?? fallback);
		return;
	}
	toast.error(fallback);
}

export function useEducationCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<EducationListResponse, Error>({
		queryKey: educationKeys.lists(),
		queryFn: getEducationList,
		staleTime: DEFAULT_STALE_TIME
	});

	const invalidate = () => queryClient.invalidateQueries({ queryKey: educationKeys.all });

	const create = useMutation({
		mutationFn: createEducation,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create education");
			else {
				toast.success("Education created");
				invalidate();
			}
		}
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: EducationSchemaType }) =>
			updateEducation(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update education");
			else {
				toast.success("Education updated");
				invalidate();
			}
		}
	});

	const remove = useMutation({
		mutationFn: deleteEducation,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete education");
			else {
				toast.success("Education deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}

export function useExperienceCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<ExperienceListResponse, Error>({
		queryKey: experienceKeys.lists(),
		queryFn: getExperienceList,
		staleTime: DEFAULT_STALE_TIME
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: experienceKeys.all });

	const create = useMutation({
		mutationFn: createExperience,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create experience");
			else {
				toast.success("Experience created");
				invalidate();
			}
		}
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: ExperienceSchemaType }) =>
			updateExperience(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update experience");
			else {
				toast.success("Experience updated");
				invalidate();
			}
		}
	});
	const remove = useMutation({
		mutationFn: deleteExperience,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete experience");
			else {
				toast.success("Experience deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}

export function useProjectsCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<ProjectsListResponse, Error>({
		queryKey: projectsKeys.lists(),
		queryFn: getProjectsList,
		staleTime: DEFAULT_STALE_TIME
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: projectsKeys.all });

	const create = useMutation({
		mutationFn: createProject,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create project");
			else {
				toast.success("Project created");
				invalidate();
			}
		}
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: ProjectSchemaType }) => updateProject(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update project");
			else {
				toast.success("Project updated");
				invalidate();
			}
		}
	});
	const remove = useMutation({
		mutationFn: deleteProject,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete project");
			else {
				toast.success("Project deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}

export function useSkillsCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<SkillsListResponse, Error>({
		queryKey: skillsKeys.lists(),
		queryFn: getSkillsList,
		staleTime: DEFAULT_STALE_TIME
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: skillsKeys.all });

	const create = useMutation({
		mutationFn: createSkill,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create skill");
			else {
				toast.success("Skill created");
				invalidate();
			}
		}
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: SkillSchemaType }) => updateSkill(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update skill");
			else {
				toast.success("Skill updated");
				invalidate();
			}
		}
	});
	const remove = useMutation({
		mutationFn: deleteSkill,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete skill");
			else {
				toast.success("Skill deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}

export function useQuotesCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<QuotesListResponse, Error>({
		queryKey: quotesKeys.lists(),
		queryFn: getQuotesList,
		staleTime: DEFAULT_STALE_TIME
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: quotesKeys.all });

	const create = useMutation({
		mutationFn: createQuote,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create quote");
			else {
				toast.success("Quote created");
				invalidate();
			}
		}
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: QuoteSchemaType }) => updateQuote(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update quote");
			else {
				toast.success("Quote updated");
				invalidate();
			}
		}
	});
	const remove = useMutation({
		mutationFn: deleteQuote,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete quote");
			else {
				toast.success("Quote deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}

export function useContactCrud() {
	const queryClient = useQueryClient();
	const list = useQuery<ContactListResponse, Error>({
		queryKey: contactKeys.lists(),
		queryFn: getContactList,
		staleTime: DEFAULT_STALE_TIME
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: contactKeys.all });

	const create = useMutation({
		mutationFn: createContact,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to create contact");
			else {
				toast.success("Contact created");
				invalidate();
			}
		}
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: number; data: ContactSchemaType }) => updateContact(id, data),
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to update contact");
			else {
				toast.success("Contact updated");
				invalidate();
			}
		}
	});
	const remove = useMutation({
		mutationFn: deleteContact,
		onSettled: (_, error) => {
			if (error) handleMutationError(error, "Failed to delete contact");
			else {
				toast.success("Contact deleted");
				invalidate();
			}
		}
	});

	return {
		items: list.data?.data ?? [],
		isLoading: list.isLoading,
		createAsync: create.mutateAsync,
		updateAsync: update.mutateAsync,
		deleteAsync: remove.mutateAsync,
		isSaving: create.isPending || update.isPending,
		isDeleting: remove.isPending
	};
}
