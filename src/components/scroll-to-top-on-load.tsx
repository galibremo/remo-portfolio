"use client";

import { useEffect } from "react";

/**
 * Forces the document to the true top after a hard load/refresh.
 *
 * Native scroll restoration can run while the Suspense loader is still
 * short, clamp to a small offset, then leave that offset after real
 * content mounts — so refresh looks "almost top" with content cut off.
 */
export function ScrollToTopOnLoad() {
	useEffect(() => {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		const jumpToTop = () => {
			const scroller = document.scrollingElement ?? document.documentElement;
			scroller.scrollTop = 0;
			window.scrollTo(0, 0);
		};

		jumpToTop();

		const frameId = window.requestAnimationFrame(jumpToTop);
		const timeoutId = window.setTimeout(jumpToTop, 0);

		return () => {
			window.cancelAnimationFrame(frameId);
			window.clearTimeout(timeoutId);
		};
	}, []);

	return null;
}
