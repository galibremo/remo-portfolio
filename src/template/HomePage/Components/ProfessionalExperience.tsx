"use client";

import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ExperienceType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type ProfessionalExperienceProps = {
	items: ExperienceType[];
};

export default function ProfessionalExperience({ items }: ProfessionalExperienceProps) {
	const defaultIndex = items.length > 0 ? items.length - 1 : 0;
	const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (items.length > 0) {
			setActiveIndex(items.length - 1);
		}
	}, [items.length]);

	useEffect(() => {
		const handleScroll = () => {
			// On mobile/tablet screens (< 1024px), auto-expand whichever card is in the center of the viewport
			if (window.innerWidth >= 1024) return;

			const viewportCenterY = window.innerHeight / 2;
			let minDistance = Infinity;
			let closestIndex = 0;

			cardRefs.current.forEach((ref, index) => {
				if (ref) {
					const rect = ref.getBoundingClientRect();
					const cardCenterY = rect.top + rect.height / 2;
					const distance = Math.abs(cardCenterY - viewportCenterY);

					if (distance < minDistance) {
						minDistance = distance;
						closestIndex = index;
					}
				}
			});

			setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleMouseLeaveContainer = () => {
		if (window.innerWidth >= 1024 && items.length > 0) {
			setActiveIndex(items.length - 1);
		}
	};

	return (
		<section id="job" className="relative py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
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
						<span className="bg-linear-to-r from-purple-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent font-extrabold">
							Experience
						</span>
					</h2>
				</motion.div>

				{/* Expandable Image Accordion Cards */}
				<div
					onMouseLeave={handleMouseLeaveContainer}
					className="flex flex-col lg:flex-row gap-4 h-auto lg:h-125 w-full"
				>
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						const technologies = item.technologies ?? [];
						const imageSrc = item.image || "/React.jpg";

						return (
							<div
								key={item.id}
								ref={(el) => {
									cardRefs.current[index] = el;
								}}
								tabIndex={0}
								onMouseEnter={() => setActiveIndex(index)}
								onFocus={() => setActiveIndex(index)}
								onClick={() => setActiveIndex(index)}
								className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-in-out cursor-pointer focus:outline-hidden ${isActive
									? "lg:flex-3 h-112.5 lg:h-full shadow-2xl ring-2 ring-purple-500/40"
									: "lg:flex-1 h-45 lg:h-full opacity-85 hover:opacity-100"
									}`}
							>
								{/* Background Image */}
								<Image
									src={imageSrc}
									alt={item.title}
									fill
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>

								{/* Gradient Backdrop Overlay */}
								<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />

								{/* Active/Expanded Overlay Content */}
								<div
									className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-500 ${isActive ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
										}`}
								>
									{/* Top Badge & Action */}
									<div className="flex items-center justify-between">
										<span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-md">
											{item.duration}
										</span>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-cyan-500 text-white shadow-md">
											<ArrowUpRight size={20} />
										</div>
									</div>

									{/* Bottom Glass Card Content */}
									<div className="rounded-2xl border border-white/15 bg-black/40 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
										<h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
											{item.title}
										</h3>
										<div className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-300">
											<MapPin size={15} className="shrink-0" />
											<span>{item.company}</span>
										</div>
										<p className="mt-2.5 line-clamp-3 text-xs sm:text-sm leading-relaxed font-normal text-zinc-300/90">
											{item.description}
										</p>

										{technologies.length > 0 ? (
											<div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
												{technologies.map((tech) => (
													<span
														key={tech}
														className="rounded-md border border-purple-400/30 bg-purple-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-purple-200 backdrop-blur-md"
													>
														{tech}
													</span>
												))}
											</div>
										) : null}
									</div>
								</div>

								{/* Inactive/Collapsed Card Overlay */}
								<div
									className={`absolute inset-0 p-6 flex items-end justify-between transition-all duration-500 ${!isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
										}`}
								>
									<div className="flex w-full items-center justify-between text-white">
										<span className="font-bold text-base sm:text-lg line-clamp-1 drop-shadow-md">
											{item.title}
										</span>
										{/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md shrink-0 ml-2">
											<ArrowUpRight size={18} />
										</div> */}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

