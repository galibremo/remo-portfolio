"use client";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { useRouter } from "@/i18n/navigation";

export function AuthExample() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div className="rounded-lg border p-6">
			<h3 className="mb-4 text-lg font-semibold">Authentication Status</h3>
			{session ? (
				<div>
					<p className="mb-2 text-green-600">✓ You are signed in as {session.user?.name}</p>
					<p className="mb-4 text-sm text-gray-600">Email: {session.user?.email}</p>
					<Button onClick={() => router.push("/dashboard")} className="mr-2">
						Go to Dashboard
					</Button>
				</div>
			) : (
				<div>
					<p className="mb-4 text-red-600">✗ You are not signed in</p>
					<div className="space-x-2">
						<Button onClick={() => router.push("/login")} variant="outline">
							Sign In
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
