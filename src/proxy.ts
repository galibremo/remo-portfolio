import { auth } from "../auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = [
	"/dashboard",
	"/hero-section",
	"/about-section",
	"/education",
	"/experience",
	"/projects",
	"/skills",
	"/quotes",
	"/contact",
	"/profile"
];

export default async function proxy(request: NextRequest) {
	const response = intlMiddleware(request);
	const pathname = request.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
	const session = await auth();

	if (isProtectedRoute && !session) {
		const signInUrl = new URL("/login", request.url);
		signInUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(signInUrl);
	}

	if (session && pathname.includes("/login")) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
