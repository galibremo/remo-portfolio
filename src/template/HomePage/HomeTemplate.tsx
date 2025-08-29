import ThemeToggle from "@/components/theme-toggle";

import AboutMe from "@/template/HomePage/Components/AboutMe";
import ContactMe from "@/template/HomePage/Components/ContactMe";
import Education from "@/template/HomePage/Components/Education";
import Footer from "@/template/HomePage/Components/Footer";
import HeroSection from "@/template/HomePage/Components/HeroSection";
import ProfessionalExperience from "@/template/HomePage/Components/ProfessionalExperience";
import Quots from "@/template/HomePage/Components/Quots";
import SelectedProjects from "@/template/HomePage/Components/SelectedProjects";
import TechnicalSkills from "@/template/HomePage/Components/TechnicalSkills";
import TopNavBar from "@/template/HomePage/Components/TopNavBar";

export default function HomeTemplate() {
	return (
		<main>
			<TopNavBar />
			<HeroSection />
			<AboutMe />
			<Education />
			<ProfessionalExperience />
			<SelectedProjects />
			<Quots />
			<TechnicalSkills />
			<ContactMe />
			<Footer />
			<div className="fixed right-3 bottom-1.5 z-50 md:right-4 md:bottom-2">
				<ThemeToggle />
			</div>
		</main>
	);
}
