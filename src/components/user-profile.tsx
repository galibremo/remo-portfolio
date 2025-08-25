"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UserProfile() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "unauthenticated" || !session) {
		return (
			<div className="flex gap-4">
				<Button onClick={() => router.push("/auth/signin")} variant="outline">
					Sign In
				</Button>
				<Button onClick={() => router.push("/auth/signup")}>Sign Up</Button>
			</div>
		);
	}

	return (
		<Card className="p-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-medium">{session.user?.name}</p>
					<p className="text-sm text-gray-600 dark:text-gray-400">{session.user?.email}</p>
				</div>
				<Button
					onClick={() =>
						signOut({
							callbackUrl: "/"
						})
					}
					variant="outline"
				>
					Sign Out
				</Button>
			</div>
		</Card>
	);
}
