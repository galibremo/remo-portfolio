import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const DEFAULT_STALE_TIME = 1000 * 60 * 60;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleScrollTo = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}
};
