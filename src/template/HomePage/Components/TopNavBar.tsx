import { BriefcaseBusiness, FolderCode, GraduationCap, House, UserSearch } from "lucide-react";

export default function TopNavBar() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 shadow-sm">
			<div className="mx-auto flex max-w-6xl items-center justify-between p-4 px-6">
				<div className="text-lg font-semibold">REMO.</div>
				<div className="flex items-center space-x-6 font-medium">
					<a href="#home" className="flex items-center gap-1 underline-offset-4 hover:underline">
						<House size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Home</span>
					</a>
					<a href="#about" className="flex items-center gap-1 underline-offset-4 hover:underline">
						<UserSearch size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">About</span>
					</a>
					<a
						href="#education"
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<GraduationCap size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Education</span>
					</a>
					<a href="#job" className="flex items-center gap-1 underline-offset-4 hover:underline">
						<BriefcaseBusiness size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Projects</span>
					</a>
					<a
						href="#projects"
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<FolderCode size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Projects</span>
					</a>
				</div>
			</div>
		</header>
	);
}
