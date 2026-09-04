type DashboardPageHeaderProps = {
	title: string;
	description?: string;
	actions?: React.ReactNode;
};

export function DashboardPageHeader({ title, description, actions }: DashboardPageHeaderProps) {
	return (
		<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
				{description ? (
					<p className="text-muted-foreground mt-1 text-sm">{description}</p>
				) : null}
			</div>
			{actions ? <div className="flex items-center gap-2">{actions}</div> : null}
		</div>
	);
}
