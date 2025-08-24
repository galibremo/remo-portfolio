"use client";

import {
	BookOpenCheck,
	BriefcaseBusiness,
	FolderCode,
	GraduationCap,
	House,
	MessageSquareQuote,
	NotebookPen,
	UserSearch
} from "lucide-react";
import { useEffect, useState } from "react";

const handleScrollTo = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}
};

export default function TopNavBar() {
	const [isInHeroSection, setIsInHeroSection] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const viewportHeight = window.innerHeight;
			const isStillInHero = scrollY <= viewportHeight;
			setIsInHeroSection(isStillInHero);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 shadow-sm transition-colors duration-300 ${
				isInHeroSection ? "" : "bg-accent"
			}`}
		>
			<div className="mx-auto flex max-w-6xl items-center justify-center p-4 px-6 md:justify-between">
				<div className="hidden text-lg font-semibold md:block">REMO.</div>
				<div className="flex items-center gap-6 font-medium">
					<button
						onClick={() => handleScrollTo("home")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<House size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Home</span>
					</button>
					<button
						onClick={() => handleScrollTo("about")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<UserSearch size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">About</span>
					</button>
					<button
						onClick={() => handleScrollTo("education")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<GraduationCap size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Education</span>
					</button>
					<button
						onClick={() => handleScrollTo("job")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<BriefcaseBusiness size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Job</span>
					</button>
					<button
						onClick={() => handleScrollTo("projects")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<FolderCode size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Projects</span>
					</button>
					<button
						onClick={() => handleScrollTo("quotes")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<MessageSquareQuote size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Quotes</span>
					</button>
					<button
						onClick={() => handleScrollTo("skills")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<BookOpenCheck size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Skills</span>
					</button>
					<button
						onClick={() => handleScrollTo("contactme")}
						className="flex items-center gap-1 underline-offset-4 hover:underline"
					>
						<NotebookPen size={18} className="mb-0.5 block md:hidden" />
						<span className="hidden md:block">Contact Me</span>
					</button>
				</div>
			</div>
		</header>
	);
}
