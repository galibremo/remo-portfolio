"use client";

import { Facebook01Icon, InstagramIcon, Linkedin01Icon } from "hugeicons-react";
import { Download, Mail, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";

import { AboutContentType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";
import { Link } from "@/i18n/navigation";

type AboutMeProps = {
	about: AboutContentType;
};

type SocialIcon = ComponentType<{ size?: number }>;

const socialMeta: Record<
	string,
	{ Icon: SocialIcon; label: string; hoverClass: string }
> = {
	facebook: {
		Icon: Facebook01Icon,
		label: "Facebook",
		hoverClass: "hover:border-blue-500 hover:text-blue-500 hover:shadow-blue-500/20"
	},
	instagram: {
		Icon: InstagramIcon,
		label: "Instagram",
		hoverClass: "hover:border-pink-500 hover:text-pink-500 hover:shadow-pink-500/20"
	},
	linkedin: {
		Icon: Linkedin01Icon,
		label: "LinkedIn",
		hoverClass: "hover:border-blue-600 hover:text-blue-600 hover:shadow-blue-600/20"
	},
	email: {
		Icon: Mail,
		label: "Email",
		hoverClass: "hover:border-red-500 hover:text-red-500 hover:shadow-red-500/20"
	}
};

export default function AboutMe({ about }: AboutMeProps) {
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

	const socialLinks = (["facebook", "instagram", "linkedin", "email"] as const)
		.map(key => {
			const href = about.socialLinks?.[key];
			if (!href) return null;
			return { href, ...socialMeta[key] };
		})
		.filter((item): item is NonNullable<typeof item> => item !== null);

	const imageSrc = about.image || "/about-me.jpg";
	const resumeUrl = about.resumeUrl || "/my-cv.pdf";

	return (
		<section id="about" className="relative overflow-hidden py-12">
			<div className="pointer-events-none absolute top-1/2 right-10 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]"></div>

			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 text-center md:mb-12"
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
						<Sparkles size={12} className="text-purple-500" />
						Get to know me
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						About{" "}
						<span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							Me
						</span>
					</h2>
				</motion.div>

				<div className="glass-card-light rounded-3xl border border-border/50 p-6 shadow-xl backdrop-blur-xl sm:p-8 md:p-10">
					<div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12">
						<div className="flex flex-1 flex-col gap-4">
							<motion.h3
								className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								{about.heading}
							</motion.h3>

							<motion.p
								className="text-sm leading-relaxed font-normal text-muted-foreground sm:text-base"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								{about.paragraphOne}
							</motion.p>
							<motion.p
								className="text-sm leading-relaxed font-normal text-muted-foreground sm:text-base"
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								{about.paragraphTwo}
							</motion.p>

							{socialLinks.length > 0 ? (
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
											className={`flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3.5 py-2 text-xs font-medium text-foreground shadow-xs transition-all duration-300 hover:scale-105 sm:text-sm ${hoverClass}`}
										>
											<Icon size={16} />
											<span>{label}</span>
										</Link>
									))}
								</motion.div>
							) : null}

							<motion.div
								variants={fadeInVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								className="mt-4"
							>
								<Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
									<Button className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30">
										<Download
											size={16}
											className="mr-2 transition-transform duration-300 group-hover:-translate-y-0.5"
										/>
										<span>Download Resume</span>
									</Button>
								</Link>
							</motion.div>
						</div>

						<motion.div
							variants={imageVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="group relative"
						>
							<div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-400 opacity-30 blur-lg transition duration-500 group-hover:opacity-60"></div>

							<div className="relative overflow-hidden rounded-2xl border-2 border-border/60 bg-card shadow-2xl">
								<Image
									src={imageSrc}
									alt={about.heading}
									width={380}
									height={450}
									className="h-80 w-72 object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96 sm:w-80 md:h-[400px] md:w-[320px]"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
