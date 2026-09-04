"use client";

import { Facebook01Icon, InstagramIcon, Linkedin01Icon } from "hugeicons-react";
import { Download, Mail, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";

export default function AboutMe() {
	const fadeInVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" as const }
		}
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.8, ease: "easeOut" as const }
		}
	};

	const socialLinks = [
		{
			href: "https://www.facebook.com/galibremo",
			Icon: Facebook01Icon,
			label: "Facebook",
			hoverClass: "hover:border-blue-500 hover:text-blue-500 hover:shadow-blue-500/20"
		},
		{
			href: "https://www.instagram.com/galib_remo",
			Icon: InstagramIcon,
			label: "Instagram",
			hoverClass: "hover:border-pink-500 hover:text-pink-500 hover:shadow-pink-500/20"
		},
		{
			href: "https://www.linkedin.com/in/galibremo",
			Icon: Linkedin01Icon,
			label: "LinkedIn",
			hoverClass: "hover:border-blue-600 hover:text-blue-600 hover:shadow-blue-600/20"
		},
		{
			href: "mailto:galibremo@gmail.com",
			Icon: Mail,
			label: "Email",
			hoverClass: "hover:border-red-500 hover:text-red-500 hover:shadow-red-500/20"
		}
	];

	return (
		<section id="about" className="relative py-12 md:py-24 overflow-hidden">
			{/* Subtle decorative background glow */}
			<div className="absolute top-1/2 right-10 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"></div>

			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 md:mb-12 text-center"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
						<Sparkles size={12} className="text-purple-500" />
						Get to know me
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						About <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Me</span>
					</h2>
				</motion.div>

				{/* Main Card Container */}
				<div className="glass-card-light rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-border/50 backdrop-blur-xl">
					<div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12">
						{/* Left Content */}
						<div className="flex flex-1 flex-col gap-4">
							<motion.h3
								className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								Hello, Remo here...
							</motion.h3>

							<motion.p
								className="text-sm sm:text-base leading-relaxed text-muted-foreground font-normal"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								I am a passionate Software Engineer who values honesty, respect, and meaningful relationships. I strive to align my personal and professional life with Islamic principles, maintaining deen as my priority.
							</motion.p>
							<motion.p
								className="text-sm sm:text-base leading-relaxed text-muted-foreground font-normal"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								Described by friends and colleagues as supportive, humble, and understanding, I thoroughly enjoy solving complex engineering problems, building sleek full-stack products, working with great minds, and continuously becoming a better developer and individual.
							</motion.p>

							{/* Social Links */}
							<motion.div
								className="mt-2 flex flex-wrap gap-3"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								{socialLinks.map(({ href, Icon, label, hoverClass }) => (
									<Link
										key={label}
										href={href}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
										className={`flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 shadow-xs ${hoverClass}`}
									>
										<Icon size={16} />
										<span>{label}</span>
									</Link>
								))}
							</motion.div>

							{/* Resume Button */}
							<motion.div
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								className="mt-4"
							>
								<Link href="/my-cv.pdf" target="_blank" rel="noopener noreferrer">
									<Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-[1.02] cursor-pointer">
										<Download size={16} className="mr-2 transition-transform duration-300 group-hover:-translate-y-0.5" />
										<span>Download Resume</span>
									</Button>
								</Link>
							</motion.div>
						</div>

						{/* Right Image Frame */}
						<motion.div
							variants={imageVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="relative group"
						>
							{/* Decorative Backing Frame */}
							<div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-400 opacity-30 blur-lg transition duration-500 group-hover:opacity-60"></div>
							
							<div className="relative overflow-hidden rounded-2xl border-2 border-border/60 shadow-2xl bg-card">
								<Image
									src="/about-me.jpg"
									alt="Galib Remo"
									width={380}
									height={450}
									className="h-80 w-72 sm:h-96 sm:w-80 md:h-[400px] md:w-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

