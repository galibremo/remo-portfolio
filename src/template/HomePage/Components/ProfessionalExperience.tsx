"use client";

import { Briefcase, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { ExperienceType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type ProfessionalExperienceProps = {
	items: ExperienceType[];
};

export default function ProfessionalExperience({ items }: ProfessionalExperienceProps) {
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
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12 text-center md:mb-16"
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
						<Briefcase size={14} className="text-purple-500" />
						Career Timeline
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Professional{" "}
						<span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							Experience
						</span>
					</h2>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
				>
					{items.map(item => {
						const technologies = item.technologies ?? [];
						const imageSrc = item.image || "/React.jpg";

						return (
							<motion.div key={item.id} variants={cardVariants} className="flex">
								<Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10">
									<div className="relative h-48 w-full overflow-hidden bg-muted">
										<Image
											src={imageSrc}
											alt={item.title}
											fill
											sizes="(max-width: 768px) 100vw, 33vw"
											className="object-cover transition-transform duration-700 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
										<span className="absolute top-3 right-3 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-medium text-foreground shadow-xs backdrop-blur-md">
											{item.duration}
										</span>
									</div>

									<CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5">
										<div className="space-y-2">
											<h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-purple-400">
												{item.title}
											</h3>
											<div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
												<MapPin size={14} className="shrink-0 text-cyan-400" />
												<span className="line-clamp-1">{item.company}</span>
											</div>
											<p className="line-clamp-4 text-xs leading-relaxed font-normal text-muted-foreground/90 sm:text-sm">
												{item.description}
											</p>
										</div>

										{technologies.length > 0 ? (
											<div className="flex flex-wrap gap-1.5 border-t border-border/40 pt-2">
												{technologies.map(tech => (
													<span
														key={tech}
														className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[11px] font-medium text-purple-400"
													>
														{tech}
													</span>
												))}
											</div>
										) : null}
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
