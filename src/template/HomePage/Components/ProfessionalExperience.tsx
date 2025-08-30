import { MapPin } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function ProfessionalExperience() {
	const experiences = [
		{
			image: "/uiux.jpg",
			title: "UI/UX Designer (Trainee)",
			company: "AKIJ iBOS Limited",
			duration: "1 month",
			description:
				"Built a strong design sense and deeper understanding of user experience, forming the foundation for creating intuitive, user-friendly interfaces"
			// technology: ["Figma", "User Research", "Wireframing", "Prototyping"]
		},
		{
			image: "/React.jpg",
			title: "Software Engineer (React)",
			company: "mPower Social Enterprises Ltd.",
			duration: "Aug 2024 - Feb 2025",
			description:
				"Gaining real-world project experience, collaborate with talented colleagues,  understand workplace culture, strengthen my technical and teamwork skills"
			// technology: ["React", "TanStackQuery", "Material Ui", "TypeScript"]
		},
		{
			image: "/Nextjs.jpg",
			title: "Full-Stack Developer (Next js)",
			company: "Typetech It",
			duration: "Mar 2025 - Present",
			description:
				"Design and develop web applications using modern technologies.  Handle both front-end and back-end tasks while continuously learning new techonologies"
			// technology: ["Next.js", "Express.js", "Drizzle ORM", "TypeScript", "Tailwind CSS"]
		}
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.4,
				delayChildren: 0.2
			}
		}
	};

	const cardVariants = {
		hidden: {
			opacity: 0
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	return (
		<section id="job">
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", bounce: 0.7, stiffness: 400, damping: 10, duration: 0.8 }}
					viewport={{ once: true, amount: "all" }}
				>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
						Professional Experience
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">
						Internship and Jobs
					</span>
				</motion.div>
				<motion.div
					variants={containerVariants}
					className="mt-6 mb-4 flex flex-col items-center gap-4 md:mt-12 md:mb-6 md:flex-row md:gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.4 }}
				>
					{experiences.map((item, idx) => (
						<motion.div key={idx} variants={cardVariants}>
							<Card className="gap-2 rounded-md pt-0">
								<Image
									src={item.image}
									alt={item.title}
									height={500}
									width={500}
									className="h-50 w-full rounded-t-md object-cover p-0.5"
								/>
								<CardContent>
									<div className="mb-2">
										<p className="mt-2 line-clamp-1 text-base font-medium sm:text-xl">
											{item.title}
										</p>
										<div className="text-muted-foreground">
											<div className="flex items-center gap-1">
												<MapPin size={14} className="mb-0.5" />
												<span className="line-clamp-1 text-sm">{item.company} &nbsp;</span>
											</div>
										</div>
									</div>
									<p className="line-clamp-6 text-sm font-light md:line-clamp-4">
										{item.description}
									</p>
									<div className="mt-2 line-clamp-1 text-sm md:text-base">
										<span className="font-medium">Duration:</span> {item.duration}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
