import ThemeToggle from "@/components/theme-toggle";

import HeroSection from "@/template/HomePage/Components/HeroSection";

export default function HomeTemplate() {
	return (
		<main>
			<HeroSection />
			<div className="fixed right-4 bottom-4 z-50">
				<ThemeToggle />
			</div>
		</main>
	);
}
