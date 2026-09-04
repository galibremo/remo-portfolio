"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
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
				"Built a strong design sense and deeper understanding of user experience, forming the foundation for creating intuitive, user-friendly interfaces.",
			technology: ["Figma", "User Research", "Wireframing", "UI/UX Design"]
		},
		{
			image: "/React.jpg",
			title: "Software Engineer (React)",
			company: "mPower Social Enterprises Ltd.",
			duration: "Aug 2024 - Feb 2025",
			description:
				"Gaining real-world project experience, collaborating with cross-functional engineering teams, strengthening front-end architecture and performance optimization.",
			technology: ["React", "TanStack Query", "Material UI", "TypeScript"]
		},
		{
			image: "/Nextjs.jpg",
			title: "Full-Stack Developer (Next.js)",
			company: "Typetech IT",
			duration: "Mar 2025 - Present",
			description:
				"Architecting and developing modern full-stack web applications. Managing both front-end UI and back-end database schemas using cutting-edge Next.js stack.",
			technology: ["Next.js", "Express.js", "Drizzle ORM", "TypeScript", "Tailwind CSS"]
		}
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1
			}
		}
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" as const }
		}
	};

	return (
		<section id="job" className="relative py-12 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
						<Briefcase size={14} className="text-purple-500" />
						Career Timeline
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Professional <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Experience</span>
					</h2>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
				>
					{experiences.map((item, idx) => (
						<motion.div key={idx} variants={cardVariants} className="flex">
							<Card className="group relative flex flex-col justify-between overflow-hidden border border-border/60 bg-card hover:border-purple-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 rounded-2xl">
								{/* Image with zoom effect */}
								<div className="relative h-48 w-full overflow-hidden bg-muted">
									<Image
										src={item.image}
										alt={item.title}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
									<span className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-md border border-border/50 px-3 py-1 text-xs font-medium text-foreground shadow-xs">
										{item.duration}
									</span>
								</div>

								{/* Card Body */}
								<CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
									<div className="space-y-2">
										<h3 className="text-lg font-bold text-foreground group-hover:text-purple-400 transition-colors line-clamp-1">
											{item.title}
										</h3>
										<div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
											<MapPin size={14} className="text-cyan-400 shrink-0" />
											<span className="line-clamp-1">{item.company}</span>
										</div>
										<p className="text-xs sm:text-sm text-muted-foreground/90 font-normal leading-relaxed line-clamp-4">
											{item.description}
										</p>
									</div>

									{/* Tech Stack Pills */}
									<div className="pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
										{item.technology.map((tech) => (
											<span
												key={tech}
												className="rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 text-[11px] font-medium"
											>
												{tech}
											</span>
										))}
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

