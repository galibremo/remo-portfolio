import { PropsWithChildren } from "react";

import DashboardProvider from "@/providers/DashboardProvider";

type OrganizationDetailsLayoutProps = PropsWithChildren<{}>;

export default function OrganizationDetailsLayout({ children }: OrganizationDetailsLayoutProps) {
	return <DashboardProvider>{children}</DashboardProvider>;
}
