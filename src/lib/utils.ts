import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const DEFAULT_STALE_TIME = 1000 * 60 * 60;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const NAV_SCROLL_OFFSET = 88;
const NAV_SCROLL_DURATION_MS = 800;

const easeInOutCubic = (progress: number) =>
	progress < 0.5
		? 4 * progress * progress * progress
		: 1 - Math.pow(-2 * progress + 2, 3) / 2;

let activeScrollFrame: number | null = null;

/**
 * Smoothly scrolls to a page section, accounting for the fixed navbar.
 *
 * Uses a manual rAF animation (not CSS/native smooth scroll). Native
 * `behavior: "smooth"` is ignored when the OS has reduced-motion /
 * animations disabled (common on Windows), which made nav jumps instant.
 */
export const handleScrollTo = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (!element) return;

	const scroller = document.scrollingElement ?? document.documentElement;
	const startY = scroller.scrollTop;
	const targetY =
		element.getBoundingClientRect().top + startY - NAV_SCROLL_OFFSET;
	const distance = targetY - startY;

	if (Math.abs(distance) < 1) return;

	if (activeScrollFrame !== null) {
		window.cancelAnimationFrame(activeScrollFrame);
		activeScrollFrame = null;
	}

	// Force instant per-frame updates so CSS `scroll-behavior: smooth`
	// cannot swallow or collapse the animation.
	const html = document.documentElement;
	const previousBehavior = html.style.scrollBehavior;
	html.style.scrollBehavior = "auto";

	let startTime: number | null = null;

	const finish = () => {
		html.style.scrollBehavior = previousBehavior;
		activeScrollFrame = null;
	};

	const step = (timestamp: number) => {
		if (startTime === null) startTime = timestamp;
		const progress = Math.min(
			(timestamp - startTime) / NAV_SCROLL_DURATION_MS,
			1
		);
		scroller.scrollTop = startY + distance * easeInOutCubic(progress);

		if (progress < 1) {
			activeScrollFrame = window.requestAnimationFrame(step);
			return;
		}

		finish();
	};

	activeScrollFrame = window.requestAnimationFrame(step);
};
