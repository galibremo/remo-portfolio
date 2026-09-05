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
import ThemeToggle from "@/components/theme-toggle";

export default function TopNavBar() {
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const viewportHeight = window.innerHeight;

					// Determine which section is currently in view
					const sections = ["home", "about", "education", "job", "projects", "skills", "contactme"];
					let currentSection = "home";

					for (const section of sections) {
						const element = document.getElementById(section);
						if (element) {
							const rect = element.getBoundingClientRect();
							if (rect.top <= viewportHeight / 3) {
								currentSection = section;
							}
						}
					}

					setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
					ticking = false;
				});
				ticking = true;
			}
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
			className="fixed top-0 right-0 left-0 z-50 transition-colors duration-300 bg-transparent py-3"
		>
			<div className="mx-auto flex items-center justify-center px-4">
				{/* Floating Glass Navbar Container */}
				<nav className="flex items-center gap-1 md:gap-1.5 rounded-full px-4 py-2 transition-all duration-300 bg-background/60 backdrop-blur-xl backdrop-saturate-150 border border-border/40 shadow-xl shadow-purple-500/10">
					{/* Brand Logo Included Inside Nav Pill on Desktop */}
					<Link
						href="/"
						className="glitch-logo hidden lg:flex items-center text-base font-extrabold tracking-wider text-foreground pr-3 mr-1 border-r border-border/40 transition-transform duration-200 hover:scale-105 shrink-0"
						data-text="REMO."
					>
						<span className="bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
							REMO<span className="text-cyan-400">.</span>
						</span>
					</Link>

					{/* Navigation Item Buttons */}
					{navItems.map(({ id, label, Icon }) => {
						const isActive = activeSection === id;
						return (
							<button
								key={id}
								type="button"
								onClick={() => handleNavClick(id)}
								className={`nav-item relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors duration-200 select-none ${isActive
									&& "text-white font-semibold"
									}`}
							>
								{/* Smooth Cross-Fade Active Pill Overlay */}
								<span
									className={`absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-cyan-500 shadow-md shadow-purple-500/25 -z-10 transition-all duration-200 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
										}`}
								/>
								<Icon size={16} className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
								<span className="hidden md:inline">{label}</span>
							</button>
						);
					})}

					{/* Theme Toggle Button */}
					<div className="pl-2 ml-1 border-l border-border/40 flex items-center shrink-0">
						<ThemeToggle />
					</div>
				</nav>
			</div>
		</header>
	);
}
