import BackEndBar from "@/components/back-end-bar";
import FrontEndBar from "@/components/front-end-bar";

export default function TechnicalSkills() {
	return (
		<section id="skills" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl">
						Technical Skills
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-lg">
						Front-end & Back-end
					</span>
				</div>
				<div className="mt-6 mb-4 flex flex-col items-center md:mt-12 md:mb-6 md:flex-row gap-6">
					<FrontEndBar />
					<BackEndBar />
				</div>
			</div>
		</section>
	);
}
