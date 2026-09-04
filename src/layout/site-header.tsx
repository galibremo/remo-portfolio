"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { usePathname } from "@/i18n/navigation";

const routeLabels: Record<string, string> = {
	"/dashboard": "Dashboard",
	"/hero-section": "Hero Section",
	"/about-section": "About",
	"/education": "Education",
	"/experience": "Experience",
	"/projects": "Projects",
	"/skills": "Skills",
	"/quotes": "Quotes",
	"/contact": "Contact"
};

function getBreadcrumbLabel(pathname: string): string {
	if (routeLabels[pathname]) {
		return routeLabels[pathname];
	}

	const segment = pathname.split("/").filter(Boolean).pop();
	if (!segment) {
		return "Dashboard";
	}

	return segment
		.split("-")
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function SiteHeader() {
	const pathname = usePathname();
	const pageLabel = getBreadcrumbLabel(pathname);

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>{pageLabel}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
