import { auth } from "@/../auth";
import { redirect } from "@/i18n/navigation";

import { UserProfile } from "@/components/user-profile";

export default async function DashboardPage() {
	const session = await auth();

	if (!session) {
		redirect({ href: "/auth/signin", locale: "en" });
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Welcome to your protected dashboard!
					</p>
				</div>

				<div className="space-y-6">
					<UserProfile />

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 className="text-xl font-semibold mb-4">Session Information</h2>
						<pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-auto">
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
