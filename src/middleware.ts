import { auth } from "../auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Define protected routes
const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/", "/login"];

export default async function middleware(request: NextRequest) {
	// Handle internationalization
	const response = intlMiddleware(request);

	// Get the pathname from the request
	const pathname = request.nextUrl.pathname;

	// Check if the route is protected
	const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
	const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.includes(route));

	// Get the session
	const session = await auth();

	// If accessing a protected route without being authenticated, redirect to signin
	if (isProtectedRoute && !session) {
		const signInUrl = new URL("/login", request.url);
		signInUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(signInUrl);
	}

	// If authenticated and trying to access auth pages, redirect to home
	if (session && pathname.includes("/login")) {
		// Since localePrefix is "never", redirect to root path
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
