import ThemeToggle from "@/components/theme-toggle";

import { PortfolioContent, SkillChartDatum } from "@/lib/portfolio";
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

type HomeTemplateProps = {
	content: PortfolioContent;
};

export default function HomeTemplate({ content }: HomeTemplateProps) {
	const frontendSkills: SkillChartDatum[] = content.skills
		.filter(skill => skill.category === "frontend")
		.map(skill => ({ key: skill.name, data: skill.proficiency }));

	const backendSkills: SkillChartDatum[] = content.skills
		.filter(skill => skill.category === "backend")
		.map(skill => ({ key: skill.name, data: skill.proficiency }));

	return (
		<main className="overflow-hidden">
			<TopNavBar />
			{content.hero ? <HeroSection hero={content.hero} /> : null}
			{content.about ? <AboutMe about={content.about} /> : null}
			{content.education.length > 0 ? <Education items={content.education} /> : null}
			{content.experience.length > 0 ? (
				<ProfessionalExperience items={content.experience} />
			) : null}
			{content.projects.length > 0 ? <SelectedProjects items={content.projects} /> : null}
			{content.quotes.length > 0 ? (
				<Quots
					items={content.quotes}
					backgroundImage={content.hero?.backgroundImage ?? "/try10.jpg"}
				/>
			) : null}
			{frontendSkills.length > 0 || backendSkills.length > 0 ? (
				<TechnicalSkills frontend={frontendSkills} backend={backendSkills} />
			) : null}
			<ContactMe intro={content.contactIntro} cards={content.contact} />
			<Footer about={content.about} contact={content.contact} />
			<div className="fixed right-3 bottom-1.5 z-50 md:right-4 md:bottom-2">
				<ThemeToggle />
			</div>
		</main>
	);
}
