import ThemeToggle from "@/components/theme-toggle";

import AboutMe from "@/template/HomePage/Components/AboutMe";
import Education from "@/template/HomePage/Components/Education";
import HeroSection from "@/template/HomePage/Components/HeroSection";
import TopNavBar from "@/template/HomePage/Components/TopNavBar";

export default function HomeTemplate() {
	return (
		<main>
			<TopNavBar />
			<HeroSection />
			<AboutMe />
			<Education />
			<div className="fixed right-4 bottom-4 z-50">
				<ThemeToggle />
			</div>
		</main>
	);
}
