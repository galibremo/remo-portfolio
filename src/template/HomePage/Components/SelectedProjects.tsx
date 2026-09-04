"use client";

import { GithubIcon } from "hugeicons-react";
import { ExternalLink, FolderCode, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Link } from "@/i18n/navigation";

export default function SelectedProjects() {
	const selectedProjects = [
		{
			image: "/whiteshares.webp",
			title: "White Shares Portal",
			category: "Fintech Platform",
			description:
				"Full-featured white-shares portal for investors and admins. Features real-time purchase analytics, automated charts, growth dashboards, and secure transaction workflows.",
			link: "https://github.com/galibremo/Whiteshares-Frontend",
			live: "https://whiteshares-frontend.vercel.app/login?test=investor",
			notAllowed: true,
			tags: ["Next.js", "Analytics", "Tailwind CSS", "Recharts"]
		},
		{
			image: "/gloriaelegance-logo.png",
			title: "Gloria Elegance",
			category: "E-Commerce",
			description:
				"Luxury online store in Bangladesh offering imported premium products. Features integrated payment gateways, cart system, and real-time inventory management.",
			link: "https://github.com/typetechit/gloriaelegance-website",
			live: "https://gloriaelegance-website.vercel.app/",
			notAllowed: true,
			tags: ["E-Commerce", "Next.js", "Payment Gateway"]
		},
		{
			image: "/pill.png",
			title: "Pill Splitter - Challenge",
			category: "Interactive Web App",
			description:
				"Interactive canvas/mouse challenge where users create, drag, overlap, and dynamically slice pill components with precision cross-hair collision logic.",
			link: "https://github.com/galibremo/pill-splitter-challenge",
			live: "https://pill-splitter-challenge-tan.vercel.app/",
			notAllowed: false,
			tags: ["React", "DOM Manipulation", "Algorithms"]
		},
		{
			image: "/Snap.jpg",
			title: "Window Snap - Challenge",
			category: "OS Interface Simulation",
			description:
				"Simulates desktop OS window snapping. Users can drag windows to screen edges to snap into multi-grid tiling layouts smoothly.",
			link: "https://github.com/galibremo/window-tiler-challenge-starter-code",
			live: "https://window-tiler-challenge-starter-code.vercel.app/",
			notAllowed: false,
			tags: ["Frontend", "Drag & Drop", "Tiling Window"]
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
		<section id="projects" className="relative py-12 md:py-24 bg-muted/30">
			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
						<FolderCode size={14} className="text-cyan-400" />
						Selected Works
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Featured <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Projects</span>
					</h2>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -100px 0px" }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
				>
					{selectedProjects.map((item, idx) => (
						<motion.div key={idx} variants={cardVariants} className="flex">
							<Card className="group relative flex flex-col justify-between overflow-hidden border border-border/60 bg-card hover:border-cyan-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 rounded-2xl p-6">
								<CardContent className="p-0 flex flex-col justify-between h-full space-y-4">
									<div className="space-y-3">
										{/* Header row with logo and category badge */}
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
													<Image
														src={item.image}
														alt={item.title}
														width={36}
														height={36}
														className="h-full w-full object-contain"
													/>
												</div>
												<div>
													<h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
														{item.title}
													</h3>
													<span className="text-xs font-medium text-muted-foreground">
														{item.category}
													</span>
												</div>
											</div>
										</div>

										<p className="text-xs sm:text-sm text-muted-foreground/90 font-normal leading-relaxed line-clamp-3">
											{item.description}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-1.5 pt-1">
											{item.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-md bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Action Buttons */}
									<div className="pt-4 border-t border-border/40 flex items-center gap-3">
										{!item.notAllowed && (
											<Button
												size="sm"
												variant="outline"
												className="rounded-xl border-border/60 hover:bg-purple-500/10 hover:border-purple-500/40 hover:text-purple-400 cursor-pointer text-xs"
												asChild
											>
												<Link href={item.link} target="_blank" rel="noopener noreferrer">
													<GithubIcon size={16} className="mr-1.5" /> Source Code
												</Link>
											</Button>
										)}
										<Button
											size="sm"
											className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] cursor-pointer text-xs ml-auto"
											asChild
										>
											<Link href={item.live} target="_blank" rel="noopener noreferrer">
												<span>Live Demo</span>
												<ExternalLink size={14} className="ml-1.5" />
											</Link>
										</Button>
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

