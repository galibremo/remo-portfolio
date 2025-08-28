type KeyedObject = {
	[key: string]: string | number | KeyedObject | any;
};

export const heroSectionKeys = {
	all: ["heroSection"] as const,
	lists: () => [...heroSectionKeys.all, "list"] as const,
	list: (filters: string | KeyedObject) => [...heroSectionKeys.lists(), filters] as const,
	details: () => [...heroSectionKeys.all, "detail"] as const,
	detail: (id: string) => [...heroSectionKeys.details(), id] as const
};
