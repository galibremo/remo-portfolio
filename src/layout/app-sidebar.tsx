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
import { useSession } from "next-auth/react";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from "@/components/ui/sidebar";

import { Link } from "@/i18n/navigation";
import { NavMain } from "@/layout/nav-main";
import { NavUser } from "@/layout/nav-user";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
			isActive: false
		},
		{
			title: "Hero Section",
			url: "/hero-section",
			icon: SquareTerminal,
			isActive: false
		},
		{
			title: "About",
			url: "/about-section",
			icon: User,
			isActive: false
		},
		{
			title: "Education",
			url: "/education",
			icon: GraduationCap,
			isActive: false
		},
		{
			title: "Experience",
			url: "/experience",
			icon: Briefcase,
			isActive: false
		},
		{
			title: "Projects",
			url: "/projects",
			icon: FolderCode,
			isActive: false
		},
		{
			title: "Skills",
			url: "/skills",
			icon: Code2,
			isActive: false
		},
		{
			title: "Quotes",
			url: "/quotes",
			icon: Quote,
			isActive: false
		},
		{
			title: "Contact",
			url: "/contact",
			icon: Mail,
			isActive: false
		}
	]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const currentUser = useSession().data?.user;

	const navUser = {
		name: currentUser?.name || "Unknown User",
		email: currentUser?.email || "no-email@example.com",
		avatar: currentUser?.image || "/avatars/default.jpg"
	};

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild tooltip="Dashboard">
							<Link href="/dashboard">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<LayoutDashboard className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Galib Remo&apos;s</span>
									<span className="truncate text-xs">Creation</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={navUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
