import BackEndBar from "@/components/back-end-bar";
import FrontEndBar from "@/components/front-end-bar";

export default function TechnicalSkills() {
	return (
		<section id="skills" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl">
						Technical Skills
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-lg">
						Front-end & Back-end
					</span>
				</div>
				<div className="mt-6 flex flex-col items-center gap-4 md:mt-12 md:flex-row md:gap-6">
					<FrontEndBar />
					<BackEndBar />
				</div>
			</div>
		</section>
	);
}
