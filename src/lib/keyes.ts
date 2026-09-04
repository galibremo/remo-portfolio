type KeyedObject = {
	[key: string]: string | number | KeyedObject | unknown;
};

const createKeys = (root: string) => ({
	all: [root] as const,
	lists: () => [root, "list"] as const,
	list: (filters: string | KeyedObject) => [root, "list", filters] as const,
	details: () => [root, "detail"] as const,
	detail: (id: string | number) => [root, "detail", id] as const
});

export const heroSectionKeys = createKeys("heroSection");
export const aboutSectionKeys = createKeys("aboutSection");
export const educationKeys = createKeys("education");
export const experienceKeys = createKeys("experience");
export const projectsKeys = createKeys("projects");
export const skillsKeys = createKeys("skills");
export const quotesKeys = createKeys("quotes");
export const contactKeys = createKeys("contact");
export const dashboardStatsKeys = createKeys("dashboardStats");
