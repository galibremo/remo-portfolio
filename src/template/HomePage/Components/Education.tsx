"use client";

import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
	const educationList = [
		{
			title: "B.Sc. in CSE",
			fullTitle: "B.Sc. in Computer Science & Engineering",
			institution: "American International University-Bangladesh (AIUB)",
			date: "09/2019 – 01/2024",
			major: "Major in Software Engineering",
			cgpa: "CGPA: 3.73 / 4.00",
			location: "Dhaka, Bangladesh",
			isRight: true, // Top: Right side
			isHighlight: true
		},
		{
			title: "HSC",
			fullTitle: "Higher Secondary Certificate (HSC)",
			institution: "Dinajpur Government City College",
			date: "2019",
			major: "Science Division",
			cgpa: "GPA: 4.08 / 5.00",
			location: "Dinajpur, Bangladesh",
			isRight: false, // Middle: Left side
			isHighlight: false
		},
		{
			title: "SSC",
			fullTitle: "Secondary School Certificate (SSC)",
			institution: "Saint Philips High School and College",
			date: "2017",
			major: "Science Division",
			cgpa: "GPA: 4.67 / 5.00",
			location: "Dinajpur, Bangladesh",
			isRight: true, // Bottom: Right side
			isHighlight: false
		}
	];

	return (
		<section id="education" className="relative py-16 md:py-24 bg-muted/20 overflow-hidden">
			{/* Subtle ambient glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-112.5 w-112.5 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none"></div>

			<div className="mx-auto max-w-5xl px-4 sm:px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16 md:mb-20"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-medium text-purple-400 mb-3 shadow-xs">
						<GraduationCap size={15} className="text-purple-400" />
						Academic Journey
					</div>
					<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
						Education & <span className="bg-linear-to-r from-purple-500 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Qualifications</span>
					</h2>
					<p className="mt-2 text-sm sm:text-base text-muted-foreground">
						School, College & University
					</p>
				</motion.div>

				{/* Journey Tree Component Container */}
				<div className="relative my-8">
					{/* Central Vertical Line (Trunk) */}
					<div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-purple-500 via-cyan-400 to-indigo-500 shadow-sm"></div>

					{/* Tree Items */}
					<div className="space-y-12 md:space-y-16">
						{educationList.map((item, idx) => {
							const isRightSide = item.isRight;

							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: idx * 0.15 }}
									viewport={{ once: true, margin: "0px 0px -80px 0px" }}
									className="relative flex items-center min-h-35"
								>
									{/* Circle Node on Central Vertical Line */}
									<div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-500 bg-background text-purple-400 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
										<GraduationCap size={18} className={item.isHighlight ? "text-purple-400" : "text-cyan-400"} />
									</div>

									{/* Horizontal Connector Stem Line */}
									{/* Desktop Right Connector */}
									<div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-linear-to-r ${isRightSide
											? "left-1/2 w-[calc(8%+1rem)] from-purple-500 to-purple-400"
											: "right-1/2 w-[calc(8%+1rem)] from-cyan-400 to-purple-500"
										}`}></div>

									{/* Mobile Connector */}
									<div className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-purple-500/60"></div>

									{/* Card Container (Alternating Right / Left on Desktop) */}
									<div className={`w-full md:w-[42%] ${isRightSide ? "pl-16 md:pl-0 md:ml-auto" : "pl-16 md:pl-0 md:mr-auto"
										}`}>
										<Card className="group relative overflow-hidden border border-border/60 bg-card/90 backdrop-blur-xl shadow-lg transition-all duration-400 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 rounded-2xl p-5 sm:p-6">
											{/* Corner glow effect */}
											<div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-purple-500/10 blur-xl transition-all duration-500 group-hover:scale-150"></div>

											<CardContent className="p-0 space-y-3 relative z-10">
												{/* Header Row */}
												<div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/40">
													<span className="text-xs font-semibold tracking-wide text-purple-400 uppercase">
														{item.title}
													</span>
													<span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
														{item.cgpa}
													</span>
												</div>

												{/* Institution & Major */}
												<div>
													<h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-purple-400 transition-colors">
														{item.institution}
													</h3>
													<p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
														<Award size={13} className="text-purple-400" />
														{item.major}
													</p>
												</div>

												{/* Footer Info */}
												<div className="pt-2 flex items-center justify-between text-xs text-muted-foreground font-medium border-t border-border/30">
													<span className="inline-flex items-center gap-1">
														<Calendar size={13} className="text-purple-400" />
														{item.date}
													</span>
													<span className="inline-flex items-center gap-1">
														<MapPin size={13} className="text-cyan-400" />
														{item.location}
													</span>
												</div>
											</CardContent>
										</Card>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}





