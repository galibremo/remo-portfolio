"use client";

import { GithubIcon } from "hugeicons-react";
import { ExternalLink, FolderCode } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ProjectType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";
import { Link } from "@/i18n/navigation";

type SelectedProjectsProps = {
	items: ProjectType[];
};

export default function SelectedProjects({ items }: SelectedProjectsProps) {
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
		<section id="projects" className="relative bg-muted/30 py-12 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12 text-center md:mb-16"
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
						<FolderCode size={14} className="text-cyan-400" />
						Selected Works
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Featured{" "}
						<span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							Projects
						</span>
					</h2>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
				>
					{items.map(item => {
						const tags = item.tags ?? [];
						const notAllowed = item.isGithubPrivate || !item.githubUrl;
						const imageSrc = item.image || "/whiteshares.webp";
						const liveUrl = item.liveUrl;

						return (
							<motion.div key={item.id} variants={cardVariants} className="flex">
								<Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10">
									<CardContent className="flex h-full flex-col justify-between space-y-4 p-0">
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-2 shadow-inner transition-transform duration-300 group-hover:scale-105">
														<Image
															src={imageSrc}
															alt={item.title}
															width={36}
															height={36}
															className="h-full w-full object-contain"
														/>
													</div>
													<div>
														<h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-cyan-400 sm:text-xl">
															{item.title}
														</h3>
														<span className="text-xs font-medium text-muted-foreground">
															{item.category}
														</span>
													</div>
												</div>
											</div>

											<p className="line-clamp-3 text-xs leading-relaxed font-normal text-muted-foreground/90 sm:text-sm">
												{item.description}
											</p>

											{tags.length > 0 ? (
												<div className="flex flex-wrap gap-1.5 pt-1">
													{tags.map(tag => (
														<span
															key={tag}
															className="rounded-md bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
														>
															{tag}
														</span>
													))}
												</div>
											) : null}
										</div>

										<div className="flex items-center gap-3 border-t border-border/40 pt-4">
											{!notAllowed && item.githubUrl ? (
												<Button
													size="sm"
													variant="outline"
													className="cursor-pointer rounded-xl border-border/60 text-xs hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
													asChild
												>
													<Link href={item.githubUrl} target="_blank" rel="noopener noreferrer">
														<GithubIcon size={16} className="mr-1.5" /> Source Code
													</Link>
												</Button>
											) : null}
											{liveUrl ? (
												<Button
													size="sm"
													className="ml-auto cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-xs text-white shadow-md shadow-purple-500/20 hover:scale-[1.02] hover:shadow-cyan-500/30"
													asChild
												>
													<Link href={liveUrl} target="_blank" rel="noopener noreferrer">
														<span>Live Demo</span>
														<ExternalLink size={14} className="ml-1.5" />
													</Link>
												</Button>
											) : null}
										</div>
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
