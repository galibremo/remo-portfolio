import { auth } from "../../auth";

import { errors } from "@/core/Messages";
import { ServiceResponse, status } from "@/core/ServiceApi";

export type SessionUser = {
	id?: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
};

/**
 * Require an authenticated Auth.js session for API controllers.
 * Rejects with a 401 ServiceResponse when the user is missing.
 */
export async function requireSession(): Promise<SessionUser> {
	const session = await auth();

	if (!session?.user) {
		return Promise.reject(
			ServiceResponse.createResponse(errors.unauthorized, status.HTTP_401_UNAUTHORIZED)
		);
	}

	return session.user as SessionUser;
}
