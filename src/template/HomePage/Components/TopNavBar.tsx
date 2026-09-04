"use client";

import {
	BookOpenCheck,
	BriefcaseBusiness,
	FolderCode,
	GraduationCap,
	House,
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
			const isStillInHero = scrollY <= 100;
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

	const navItems = [
		{ id: "home", label: "Home", Icon: House },
		{ id: "about", label: "About", Icon: UserSearch },
		{ id: "education", label: "Education", Icon: GraduationCap },
		{ id: "job", label: "Job", Icon: BriefcaseBusiness },
		{ id: "projects", label: "Projects", Icon: FolderCode },
		{ id: "skills", label: "Skills", Icon: BookOpenCheck },
		{ id: "contactme", label: "Contact Me", Icon: NotebookPen }
	];

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${isInHeroSection
					? "bg-transparent py-4"
					: "py-2 md:py-3"
				}`}
		>
			<div className="mx-auto flex items-center justify-center px-4">
				{/* Floating Glass Navbar Container */}
				<nav className={`flex items-center gap-1 md:gap-1.5 rounded-full px-4 py-2 transition-all duration-300 ${isInHeroSection
						? "bg-black/50 backdrop-blur-md border border-white/10"
						: "bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-purple-500/5"
					}`}>
					{/* Brand Logo Included Inside Nav Pill on Desktop */}
					<Link
						href={"/"}
						className="glitch-logo hidden md:flex items-center text-base font-extrabold tracking-wider text-foreground pr-3 mr-1 border-r border-border/40 transition-transform duration-300 hover:scale-105 shrink-0"
						data-text="REMO."
					>
						<span className="bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							REMO<span className="text-cyan-400">.</span>
						</span>
					</Link>

					{/* Navigation Item Buttons */}
					{navItems.map(({ id, label, Icon }) => {
						const isActive = activeSection === id;
						return (
							<button
								key={id}
								onClick={() => handleNavClick(id)}
								className={`nav-item relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium transition-all duration-300 ${isActive
										? "text-white bg-linear-to-r from-purple-600 to-cyan-500 shadow-md shadow-purple-500/20 font-semibold"
										: "text-muted-foreground hover:text-foreground hover:bg-muted/40"
									}`}
							>
								<Icon size={16} className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
								<span className="hidden md:inline">{label}</span>
							</button>
						);
					})}
				</nav>
			</div>
		</header>
	);
}


