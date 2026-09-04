"use client";

import {
	Briefcase,
	Code2,
	FolderCode,
	GraduationCap,
	LayoutDashboard,
	Mail,
	Quote,
	SquareTerminal,
	User
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useGetDashboardStats from "@/hooks/consume_api/query/useGetDashboardStats";
import { Link } from "@/i18n/navigation";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";

const sections = [
	{ key: "hero", title: "Hero Section", href: "/hero-section", icon: SquareTerminal },
	{ key: "about", title: "About", href: "/about-section", icon: User },
	{ key: "education", title: "Education", href: "/education", icon: GraduationCap },
	{ key: "experience", title: "Experience", href: "/experience", icon: Briefcase },
	{ key: "projects", title: "Projects", href: "/projects", icon: FolderCode },
	{ key: "skills", title: "Skills", href: "/skills", icon: Code2 },
	{ key: "quotes", title: "Quotes", href: "/quotes", icon: Quote },
	{ key: "contact", title: "Contact", href: "/contact", icon: Mail }
] as const;

export default function DashboardHomeTemplate() {
	const { stats, isStatsFetching } = useGetDashboardStats();

	return (
		<div className="p-4 md:p-6">
			<DashboardPageHeader
				title="Dashboard"
				description="Manage every landing page section from here."
			/>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{sections.map(section => {
					const Icon = section.icon;
					const count = stats?.[section.key] ?? 0;
					return (
						<Link key={section.key} href={section.href}>
							<Card className="hover:border-primary/40 transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">{section.title}</CardTitle>
									<Icon className="text-muted-foreground size-4" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{isStatsFetching ? "..." : count}
									</div>
									<p className="text-muted-foreground text-xs">
										{section.key === "hero" || section.key === "about"
											? count > 0
												? "Configured"
												: "Not set"
											: "items"}
									</p>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
			<div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
				<LayoutDashboard className="size-4" />
				Overview of CMS content counts
			</div>
		</div>
	);
}
