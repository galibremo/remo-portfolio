import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const DEFAULT_STALE_TIME = 1000 * 60 * 60;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

