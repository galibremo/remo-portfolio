"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export function AuthExample() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-6 border rounded-lg">
			<h3 className="text-lg font-semibold mb-4">Authentication Status</h3>
			{session ? (
				<div>
					<p className="text-green-600 mb-2">✓ You are signed in as {session.user?.name}</p>
					<p className="text-sm text-gray-600 mb-4">Email: {session.user?.email}</p>
					<Button onClick={() => router.push("/dashboard")} className="mr-2">
						Go to Dashboard
					</Button>
				</div>
			) : (
				<div>
					<p className="text-red-600 mb-4">✗ You are not signed in</p>
					<div className="space-x-2">
						<Button onClick={() => router.push("/auth/signin")} variant="outline">
							Sign In
						</Button>
						<Button onClick={() => router.push("/auth/signup")}>Sign Up</Button>
					</div>
				</div>
			)}
		</div>
	);
}
