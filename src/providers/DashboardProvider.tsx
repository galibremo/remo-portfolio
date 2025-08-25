import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/layout/app-sidebar";
import { SiteHeader } from "@/layout/site-header";

export default function DashboardProvider({ children }: Readonly<GlobalLayoutProps>) {
	return (
		<SidebarProvider
			className="flex flex-col"
			style={{ "--header-height": "calc(var(--spacing) * 16)" } as React.CSSProperties}
		>
			<SiteHeader />
			<div className="flex flex-1">
				<AppSidebar />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">{children}</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}

