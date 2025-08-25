import { UserProfile } from "@/components/user-profile";

import { auth } from "@/../auth";
import { redirect } from "@/i18n/navigation";

export default async function DashboardPage() {
	const session = await auth();

	if (!session) {
		redirect({ href: "/login", locale: "en" });
	}

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Welcome to your protected dashboard!
					</p>
				</div>

				<div className="space-y-6">
					<UserProfile />

					<div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
						<h2 className="mb-4 text-xl font-semibold">Session Information</h2>
						<pre className="overflow-auto rounded bg-gray-100 p-4 text-sm dark:bg-gray-700">
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
