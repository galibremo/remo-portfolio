import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Oxanium } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Toaster } from "sonner";

import Loader from "@/components/ui/loader";

import "./globals.css";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { generateMetadata as generateSEOMetadata, generatePersonSchema, generateWebsiteSchema } from "@/lib/seo";

const geistOxanium = Oxanium({
	variable: "--font-oxanium",
	subsets: ["latin"]
});

export const metadata: Metadata = generateSEOMetadata({
	title: undefined, // Uses default from seo.ts
	description: undefined, // Uses default from seo.ts
});

export default async function RootLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				{/* Structured Data for SEO */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generatePersonSchema())
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(generateWebsiteSchema())
					}}
				/>
			</head>
			<body className={`${geistOxanium.variable} antialiased`} suppressHydrationWarning>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<AuthProvider>
							<NextIntlClientProvider>
								<Suspense fallback={<Loader />}>{children}</Suspense>
							</NextIntlClientProvider>
						</AuthProvider>
					</ThemeProvider>
					<Toaster richColors position="top-right" closeButton />
				</QueryProvider>
			</body>
		</html>
	);
}

