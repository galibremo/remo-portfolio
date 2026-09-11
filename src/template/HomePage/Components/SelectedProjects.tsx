"use client";

import { GithubIcon } from "hugeicons-react";
import { ExternalLink, FolderCode } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
		<section id="projects" className="relative bg-muted/30 py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
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
						<span className="bg-linear-to-r from-purple-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent font-extrabold">
							Projects
						</span>
					</h2>
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
				>
					{items.map((item) => {
						const tags = item.tags ?? [];
						const notAllowed = item.isGithubPrivate || !item.githubUrl;
						const imageSrc = item.image || "/whiteshares.webp";
						const liveUrl = item.liveUrl;

						// Combine category and tags into clean tag pills without duplicates
						const displayTags = [
							...(item.category && !tags.includes(item.category) ? [item.category] : []),
							...tags
						];

						return (
							<motion.div key={item.id} variants={cardVariants} className="flex">
								<Card className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-4 sm:p-5 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
									<div className="flex flex-col justify-between space-y-4">
										{/* Project Image Banner */}
										<div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/20">
											<Image
												src={imageSrc}
												alt={item.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
										</div>

										{/* Project Info & Description */}
										<div className="space-y-2 px-1">
											<h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-cyan-400 sm:text-2xl">
												{item.title}
											</h3>

											<p className="line-clamp-3 text-xs leading-relaxed font-normal text-muted-foreground/90 sm:text-sm">
												{item.description}
											</p>

											{/* Tag Pills */}
											{displayTags.length > 0 ? (
												<div className="flex flex-wrap gap-2 pt-2">
													{displayTags.map((tag) => (
														<span
															key={tag}
															className="rounded-full bg-muted/80 dark:bg-zinc-800/80 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground/80 border border-border/30"
														>
															{tag}
														</span>
													))}
												</div>
											) : null}
										</div>

										{/* Action Buttons: Source Code & Live Demo */}
										<div className="flex items-center gap-3 pt-4 px-1 mt-auto border-t border-border/30">
											{!notAllowed && item.githubUrl ? (
												<Button
													size="sm"
													variant="outline"
													className="cursor-pointer rounded-full border-border/60 text-xs font-semibold hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400 transition-all duration-200"
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
													className="ml-auto cursor-pointer rounded-full bg-linear-to-r from-purple-600 via-purple-500 to-cyan-500 text-xs font-semibold text-white shadow-md shadow-purple-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-200"
													asChild
												>
													<Link href={liveUrl} target="_blank" rel="noopener noreferrer">
														<span>Live Demo</span>
														<ExternalLink size={14} className="ml-1.5" />
													</Link>
												</Button>
											) : null}
										</div>
									</div>
								</Card>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}

