import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
};

/**
 * Root layout for app-level metadata (icons, opengraph-image) that live
 * outside the `[locale]` segment. Locale layout still owns `<html>` / `<body>`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
	return children;
}
