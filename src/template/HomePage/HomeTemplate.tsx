import ThemeToggle from "@/components/theme-toggle";

import HeroSection from "@/template/HomePage/Components/HeroSection";
import TopNavBar from "@/template/HomePage/Components/TopNavBar";

export default function HomeTemplate() {
	return (
		<main>
			<TopNavBar />
			<HeroSection />
			<div className="fixed right-4 bottom-4 z-50">
				<ThemeToggle />
			</div>
		</main>
	);
}
