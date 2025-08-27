"use client";

import { Command, SquareTerminal } from "lucide-react";
import { useSession } from "next-auth/react";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";

import { NavMain } from "@/layout/nav-main";
import { NavUser } from "@/layout/nav-user";

const data = {
	navMain: [
		{
			title: "Hero Section",
			url: "/hero-section",
			icon: SquareTerminal,
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
		<Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Galib Remo&apos;s</span>
									<span className="truncate text-xs">Creation</span>
								</div>
							</a>
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
		</Sidebar>
	);
}

