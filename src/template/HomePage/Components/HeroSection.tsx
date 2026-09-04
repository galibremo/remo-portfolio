"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { handleScrollTo } from "@/lib/utils";

import { Typewriter } from "@/components/ui/type-writer";

export default function HeroSection() {
	// Staggered animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.25,
				delayChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" as const }
		}
	};

	const profileImageVariants = {
		hidden: { opacity: 0, scale: 0.7 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.6, ease: "easeOut" as const }
		}
	};

	return (
		<section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
			{/* Background image with high-end overlay & ambient glow */}
			<div
				className="absolute inset-0 z-0 scale-105 transition-transform duration-1000"
				style={{
					backgroundImage: "url('/try10.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			>
				{/* Dark gradient mask */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
				{/* Ambient Glow Orbs */}
				<div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
				<div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none"></div>
			</div>

			{/* Main Content with staggered animations */}
			<motion.div
				className="z-10 flex max-w-4xl flex-col items-center text-center px-4 gap-4"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Status Badge */}
				<motion.div variants={itemVariants}>
					<div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-xs sm:text-sm font-medium text-purple-300 shadow-inner">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						Available for full-stack opportunities & projects
					</div>
				</motion.div>

				{/* Profile Image with glowing gradient border */}
				<motion.div variants={profileImageVariants} className="relative mt-2">
					<div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-indigo-600 opacity-75 blur-md animate-pulse"></div>
					<div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400">
						<Image
							src="/me-match.jpg"
							alt="Galib Remo"
							priority
							width={200}
							height={200}
							className="h-36 w-36 rounded-full object-cover sm:h-44 sm:w-44 md:h-52 md:w-52 border-2 border-white/20 shadow-2xl"
						/>
					</div>
				</motion.div>

				{/* Name */}
				<motion.h1
					className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
					variants={itemVariants}
				>
					Hi, I&apos;m{" "}
					<span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
						Galib Remo
					</span>
				</motion.h1>

				{/* Typewriter Banner */}
				<motion.div variants={itemVariants} className="flex items-center justify-center">
					<div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md shadow-lg">
						<Sparkles className="h-4 w-4 text-cyan-400 animate-spin-slow" />
						<Typewriter
							text={["Software Engineer", "Front-end Developer", "Full-Stack Developer"]}
							loop
							className="text-sm font-semibold text-white/90 sm:text-lg md:text-xl"
							speed={50}
						/>
					</div>
				</motion.div>

				{/* Description Subtitle */}
				<motion.p
					variants={itemVariants}
					className="max-w-xl text-xs sm:text-sm md:text-base text-gray-300 font-normal leading-relaxed"
				>
					Crafting high-performance, user-centric web applications with modern tech stacks and elegant user interfaces.
				</motion.p>

				{/* Scroll Down CTA Pill */}
				<motion.div
					variants={itemVariants}
					onClick={() => handleScrollTo("about")}
					className="mt-6 cursor-pointer group"
				>
					<div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-purple-500/10 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
						<span className="text-xs font-medium text-gray-300 group-hover:text-white">Scroll Down</span>
						<motion.div
							animate={{ y: [0, 5, 0] }}
							transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
						>
							<ChevronDown className="h-4 w-4 text-cyan-400" />
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}

