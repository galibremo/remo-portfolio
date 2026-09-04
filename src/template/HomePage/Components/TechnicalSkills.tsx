"use client";

import { Code2, Cpu, Database, Layout } from "lucide-react";
import * as motion from "motion/react-client";

import BackEndBar from "@/components/back-end-bar";
import FrontEndBar from "@/components/front-end-bar";

export default function TechnicalSkills() {
	return (
		<section id="skills" className="relative py-12 md:py-24">
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
						<Cpu size={14} className="text-purple-500" />
						Expertise & Proficiency
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Technical <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Skills</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Front-End Card Container */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="glass-card-light rounded-3xl p-6 sm:p-8 border border-border/50 shadow-xl flex flex-col justify-between"
					>
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
									<Layout size={20} />
								</div>
								<div>
									<h3 className="text-lg font-bold text-foreground">Front-end Development</h3>
									<span className="text-xs text-muted-foreground">React, Next.js, Redux & Styling</span>
								</div>
							</div>
						</div>
						<div className="w-full">
							<FrontEndBar />
						</div>
					</motion.div>

					{/* Back-End Card Container */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="glass-card-light rounded-3xl p-6 sm:p-8 border border-border/50 shadow-xl flex flex-col justify-between"
					>
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
									<Database size={20} />
								</div>
								<div>
									<h3 className="text-lg font-bold text-foreground">Back-end & Databases</h3>
									<span className="text-xs text-muted-foreground">Express, Node, ORMs & DBs</span>
								</div>
							</div>
						</div>
						<div className="w-full">
							<BackEndBar />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

