"use client";

import { Cpu, Database, Layout } from "lucide-react";
import * as motion from "motion/react-client";

import BackEndBar from "@/components/back-end-bar";
import FrontEndBar from "@/components/front-end-bar";

import { SkillChartDatum } from "@/lib/portfolio";

type TechnicalSkillsProps = {
	frontend: SkillChartDatum[];
	backend: SkillChartDatum[];
};

export default function TechnicalSkills({ frontend, backend }: TechnicalSkillsProps) {
	return (
		<section id="skills" className="relative py-12 ">
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12 text-center md:mb-16"
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
						<Cpu size={14} className="text-purple-500" />
						Expertise & Proficiency
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Technical{" "}
						<span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							Skills
						</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{frontend.length > 0 ? (
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="glass-card-light flex flex-col justify-between rounded-3xl border border-border/50 p-6 shadow-xl sm:p-8"
						>
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
										<Layout size={20} />
									</div>
									<div>
										<h3 className="text-lg font-bold text-foreground">Front-end Development</h3>
										<span className="text-xs text-muted-foreground">
											React, Next.js, Redux & Styling
										</span>
									</div>
								</div>
							</div>
							<div className="w-full">
								<FrontEndBar data={frontend} />
							</div>
						</motion.div>
					) : null}

					{backend.length > 0 ? (
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="glass-card-light flex flex-col justify-between rounded-3xl border border-border/50 p-6 shadow-xl sm:p-8"
						>
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
										<Database size={20} />
									</div>
									<div>
										<h3 className="text-lg font-bold text-foreground">Back-end & Databases</h3>
										<span className="text-xs text-muted-foreground">
											Express, Node, ORMs & DBs
										</span>
									</div>
								</div>
							</div>
							<div className="w-full">
								<BackEndBar data={backend} />
							</div>
						</motion.div>
					) : null}
				</div>
			</div>
		</section>
	);
}
