"use client";

import {
	BookOpenCheck,
	BriefcaseBusiness,
	FolderCode,
	GraduationCap,
	House,
	Menu,
	NotebookPen,
	UserSearch,
	X
} from "lucide-react";
import { useEffect, useState } from "react";

import { handleScrollTo } from "@/lib/utils";
import "./css/TopNavBar.css";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/components/theme-toggle";

export default function TopNavBar() {
	const [activeSection, setActiveSection] = useState("home");
	const [isVisible, setIsVisible] = useState(true);
	const [isHero, setIsHero] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDelta = Math.abs(currentScrollY - lastScrollY);

			// Close mobile menu whenever user scrolls the page
			if (scrollDelta > 5) {
				setIsMobileMenuOpen(false);
			}

			// Check if we are in the hero section (top of the page)
			if (currentScrollY < 80) {
				setIsHero(true);
				setIsVisible(true);
			} else {
				setIsHero(false);
				// Hide when scrolling down, show when scrolling up
				if (currentScrollY > lastScrollY && currentScrollY > 100) {
					setIsVisible(false);
				} else if (currentScrollY < lastScrollY) {
					setIsVisible(true);
				}
			}

			lastScrollY = currentScrollY;

			// Determine which section is currently in view
			const viewportHeight = window.innerHeight;
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
		setIsMobileMenuOpen(false);
	};

	const navItems = [
		{ id: "home", label: "Home", Icon: House },
		{ id: "about", label: "About", Icon: UserSearch },
		{ id: "education", label: "Education", Icon: GraduationCap },
		{ id: "job", label: "Job", Icon: BriefcaseBusiness },
		{ id: "projects", label: "Projects", Icon: FolderCode },
		{ id: "skills", label: "Skills", Icon: BookOpenCheck }
	];

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out ${isVisible || isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
				} ${isMobileMenuOpen || !isHero
					? "bg-background/90 backdrop-blur-sm py-3 text-foreground"
					: "bg-transparent shadow-none py-3"
				}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Left: Brand Logo */}
					<Link
						href="/"
						className="glitch-logo flex items-center text-lg sm:text-xl font-extrabold tracking-wider text-foreground transition-transform duration-200 hover:scale-105 shrink-0"
						data-text="REMO."
					>
						<span className="bg-linear-to-r from-purple-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent font-extrabold">
							REMO<span className="text-cyan-400">.</span>
						</span>
					</Link>

					{/* Center: Navigation Item Buttons (Desktop) */}
					<nav className="hidden md:flex items-center gap-1 sm:gap-1.5 rounded-full px-3 py-1.5 max-w-[55vw] sm:max-w-none no-scrollbar">
						{navItems.map(({ id, label, Icon }) => {
							const isActive = activeSection === id;
							return (
								<button
									key={id}
									type="button"
									onClick={() => handleNavClick(id)}
									className={`nav-item relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 select-none shrink-0 ${isActive && "text-white font-semibold"
										}`}
								>
									{/* Active Pill Glow */}
									<span
										className={`absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-cyan-500 shadow-md shadow-purple-500/25 -z-10 transition-all duration-200 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
											}`}
									/>
									<Icon size={16} className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
									<span className="mt-0.75 hidden md:inline">{label}</span>
								</button>
							);
						})}
					</nav>

					{/* Right: Theme Toggle, Contact Button (Desktop) & Hamburger Button (Mobile) */}
					<div className="flex items-center gap-2 sm:gap-3 shrink-0">
						<ThemeToggle />

						{/* Desktop Contact Button */}
						<button
							type="button"
							onClick={() => handleNavClick("contactme")}
							className={`hidden md:inline-flex relative items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeSection === "contactme"
								? "bg-linear-to-r from-purple-600 to-cyan-500 text-white shadow-purple-500/30 ring-2 ring-purple-400/50 scale-105"
								: "bg-linear-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.03] active:scale-[0.98]"
								}`}
						>
							<NotebookPen size={16} />
							<span className="mt-0.75">Contact</span>
						</button>

						{/* Mobile Hamburger Menu Toggle Button */}
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen((prev) => !prev)}
							className="md:hidden flex items-center justify-center p-2 rounded-full text-foreground hover:bg-muted/80 transition-colors focus:outline-hidden"
							aria-label="Toggle Navigation Menu"
						>
							{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</div>

				{/* Mobile Expanded Menu */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
						? "max-h-96 opacity-100 mt-3 pt-3"
						: "max-h-0 opacity-0 pointer-events-none"
						}`}
				>
					<div className="flex flex-col gap-1.5 pb-2">
						{navItems.map(({ id, label, Icon }) => {
							const isActive = activeSection === id;
							return (
								<button
									key={id}
									type="button"
									onClick={() => handleNavClick(id)}
									className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
										? "bg-linear-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/20 font-semibold"
										: "text-foreground/80 hover:text-foreground hover:bg-muted/60"
										}`}
								>
									<Icon size={18} className={isActive ? "scale-110" : ""} />
									<span className="mt-0.75">{label}</span>
								</button>
							);
						})}

						{/* Mobile Contact Button inside expanded dropdown */}
						<button
							type="button"
							onClick={() => handleNavClick("contactme")}
							className={`flex items-center justify-center gap-2 mt-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeSection === "contactme"
								? "bg-linear-to-r from-purple-600 to-cyan-500 text-white shadow-purple-500/30 ring-2 ring-purple-400/50"
								: "bg-linear-to-r from-purple-600 via-purple-500 to-cyan-500 text-white shadow-md shadow-purple-500/20"
								}`}
						>
							<NotebookPen size={18} />
							<span className="mt-0.75">Contact Me</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}


