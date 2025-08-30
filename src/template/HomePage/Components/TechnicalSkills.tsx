import * as motion from "motion/react-client";

import BackEndBar from "@/components/back-end-bar";
import FrontEndBar from "@/components/front-end-bar";

export default function TechnicalSkills() {
	return (
		<section id="skills" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", bounce: 0.7, stiffness: 400, damping: 10, duration: 0.8 }}
					viewport={{ once: true, amount: "all" }}
				>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
						Technical Skills
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">
						Front-end & Back-end
					</span>
				</motion.div>
				<div className="mt-6 mb-4 flex flex-col items-center gap-6 md:mt-12 md:mb-6 md:flex-row">
					<FrontEndBar />
					<BackEndBar />
				</div>
			</div>
		</section>
	);
}
