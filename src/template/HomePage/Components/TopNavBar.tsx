"use client";

import {
	BookOpenCheck,
	BriefcaseBusiness,
	FolderCode,
	GraduationCap,
	House,
	// MessageSquareQuote,
	NotebookPen,
	UserSearch
} from "lucide-react";
import { useEffect, useState } from "react";

import { handleScrollTo } from "@/lib/utils";

import "./css/TopNavBar.css";
import { Link } from "@/i18n/navigation";

export default function TopNavBar() {
	const [isInHeroSection, setIsInHeroSection] = useState(true);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const viewportHeight = window.innerHeight;
			const isStillInHero = scrollY <= viewportHeight;
			setIsInHeroSection(isStillInHero);

			// Determine which section is currently in view
			const sections = ["home", "about", "education", "job", "projects", "skills", "contactme"];
			let currentSection = "home";

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= viewportHeight / 2 && rect.bottom > viewportHeight / 2) {
						currentSection = section;
						break;
					}
				}
			}

			setActiveSection(currentSection);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleNavClick = (section: string) => {
		setActiveSection(section);
		handleScrollTo(section);
	};

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 shadow-md transition-colors duration-300 ${
				isInHeroSection ? "" : "bg-muted/20 backdrop-blur-xs"
			}`}
		>
			<div className="mx-auto flex max-w-6xl items-center justify-center p-4 px-6 md:justify-between">
				<Link
					href={"/"}
					className="glitch-logo hidden text-lg font-semibold md:block"
					data-text="REMO."
				>
					<span>REMO.</span>
				</Link>
				<div className="flex items-center gap-4 font-medium">
					<button
						onClick={() => handleNavClick("home")}
						className={`nav-item flex items-center gap-1 ${activeSection === "home" ? "active" : ""}`}
					>
						<House size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Home</span>
					</button>
					<button
						onClick={() => handleNavClick("about")}
						className={`nav-item flex items-center gap-1 ${activeSection === "about" ? "active" : ""}`}
					>
						<UserSearch size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">About</span>
					</button>
					<button
						onClick={() => handleNavClick("education")}
						className={`nav-item flex items-center gap-1 ${activeSection === "education" ? "active" : ""}`}
					>
						<GraduationCap size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Education</span>
					</button>
					<button
						onClick={() => handleNavClick("job")}
						className={`nav-item flex items-center gap-1 ${activeSection === "job" ? "active" : ""}`}
					>
						<BriefcaseBusiness size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Job</span>
					</button>
					<button
						onClick={() => handleNavClick("projects")}
						className={`nav-item flex items-center gap-1 ${activeSection === "projects" ? "active" : ""}`}
					>
						<FolderCode size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Projects</span>
					</button>
					{/* <button
						onClick={() => handleNavClick("quotes")}
						className={`nav-item flex items-center gap-1 ${activeSection === "quotes" ? "active" : ""}`}
					>
						<MessageSquareQuote size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Quotes</span>
					</button> */}
					<button
						onClick={() => handleNavClick("skills")}
						className={`nav-item flex items-center gap-1 ${activeSection === "skills" ? "active" : ""}`}
					>
						<BookOpenCheck size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Skills</span>
					</button>
					<button
						onClick={() => handleNavClick("contactme")}
						className={`nav-item flex items-center gap-1 ${activeSection === "contactme" ? "active" : ""}`}
					>
						<NotebookPen size={18} className="mb-1 block md:hidden" />
						<span className="hidden md:block">Contact Me</span>
					</button>
				</div>
			</div>
		</header>
	);
}
