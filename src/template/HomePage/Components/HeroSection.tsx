"use client";

import { ChevronDown } from "lucide-react";
import { easeOut } from "motion/react";
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
				staggerChildren: 0.4,
				delayChildren: 0.2
			}
		}
	};

	const profileImageVariants = {
		hidden: {
			opacity: 0,
			scale: 0.5,
			y: 0
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: easeOut
			}
		}
	};

	const nameVariants = {
		hidden: {
			opacity: 0,
			y: 40
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: easeOut
			}
		}
	};

	const typewriterVariants = {
		hidden: {
			opacity: 0,
			y: 30
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: easeOut
			}
		}
	};

	const chevronVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: easeOut
			}
		}
	};

	return (
		<section id="home" className="relative flex h-screen items-center justify-center">
			{/* Background image with overlay */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/try10.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			>
				{/* Dynamic overlay - black by default, white in dark mode */}
				<div className="absolute inset-0 bg-black/20"></div>
			</div>

			{/* Content with staggered animations */}
			<motion.div
				className="z-10 flex flex-col items-center gap-1.5"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Profile Image - scales in first */}
				<motion.div variants={profileImageVariants}>
					<Image
						src="/me-match.jpg"
						alt="remo image"
						priority
						width={100}
						height={100}
						className="h-36 w-36 rounded-full border-4 border-white object-cover sm:h-46 sm:w-46 md:h-52 md:w-52 md:border-6"
					/>
				</motion.div>

				{/* Name - fades up second */}
				<motion.span
					className="mt-4 text-2xl font-medium text-white sm:text-3xl md:text-[44px]"
					variants={nameVariants}
				>
					Hi, I&apos;m Galib Remo
				</motion.span>

				{/* Typewriter - fades up third */}
				<motion.div variants={typewriterVariants}>
					<Typewriter
						text={["Software Engineer", "Front-end Developer", "Full-Stack Developer"]}
						loop
						className="relative left-0.5 text-sm font-medium text-white sm:text-lg md:text-2xl"
						speed={50}
					/>
				</motion.div>

				{/* Chevron - appears last with bounce */}
				<motion.div
					variants={chevronVariants}
					onClick={() => handleScrollTo("about")}
					animate={{ y: [30, 60, 30] }}
					transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 }}
					className="cursor-pointer"
				>
					<ChevronDown className="h-6 w-6 text-white md:h-12 md:w-12" />
				</motion.div>
			</motion.div>
		</section>
	);
}
