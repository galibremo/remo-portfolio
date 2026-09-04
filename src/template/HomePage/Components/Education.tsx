"use client";

import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";

import { EducationType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type EducationProps = {
	items: EducationType[];
};

export default function Education({ items }: EducationProps) {
	return (
		<section id="education" className="relative overflow-hidden bg-muted/20 py-16 md:py-24">
			<div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[130px]"></div>

			<div className="mx-auto max-w-5xl px-4 sm:px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-16 text-center md:mb-20"
				>
					<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-medium text-purple-400 shadow-xs">
						<GraduationCap size={15} className="text-purple-400" />
						Academic Journey
					</div>
					<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
						Education &{" "}
						<span className="bg-linear-to-r from-purple-500 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
							Qualifications
						</span>
					</h2>
					<p className="mt-2 text-sm text-muted-foreground sm:text-base">
						School, College & University
					</p>
				</motion.div>

				<div className="relative my-8">
					<div className="absolute top-0 bottom-0 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-purple-500 via-cyan-400 to-indigo-500 shadow-sm md:left-1/2"></div>

					<div className="space-y-12 md:space-y-16">
						{items.map((item, idx) => {
							const isRightSide = idx % 2 === 0;

							return (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: idx * 0.15 }}
									viewport={{ once: true, margin: "0px 0px -80px 0px" }}
									className="relative flex min-h-35 items-center"
								>
									<div className="absolute left-6 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-purple-500 bg-background text-purple-400 shadow-lg shadow-purple-500/20 transition-transform group-hover:scale-110 md:left-1/2">
										<GraduationCap
											size={18}
											className={item.isHighlight ? "text-purple-400" : "text-cyan-400"}
										/>
									</div>

									<div
										className={`absolute top-1/2 hidden h-0.5 -translate-y-1/2 bg-linear-to-r md:block ${
											isRightSide
												? "left-1/2 w-[calc(8%+1rem)] from-purple-500 to-purple-400"
												: "right-1/2 w-[calc(8%+1rem)] from-cyan-400 to-purple-500"
										}`}
									></div>

									<div className="absolute top-1/2 left-6 h-0.5 w-8 -translate-y-1/2 bg-purple-500/60 md:hidden"></div>

									<div
										className={`w-full md:w-[42%] ${
											isRightSide ? "pl-16 md:ml-auto md:pl-0" : "pl-16 md:mr-auto md:pl-0"
										}`}
									>
										<Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-400 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 sm:p-6">
											<div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-purple-500/10 blur-xl transition-all duration-500 group-hover:scale-150"></div>

											<CardContent className="relative z-10 space-y-3 p-0">
												<div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
													<span className="text-xs font-semibold tracking-wide text-purple-400 uppercase">
														{item.title}
													</span>
													{item.cgpa ? (
														<span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-400">
															{item.cgpa}
														</span>
													) : null}
												</div>

												<div>
													<h3 className="text-base font-bold text-foreground transition-colors group-hover:text-purple-400 sm:text-lg">
														{item.institution}
													</h3>
													{item.major ? (
														<p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
															<Award size={13} className="text-purple-400" />
															{item.major}
														</p>
													) : null}
												</div>

												<div className="flex items-center justify-between border-t border-border/30 pt-2 text-xs font-medium text-muted-foreground">
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
