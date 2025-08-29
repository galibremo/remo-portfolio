"use client";

import { ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { handleScrollTo } from "@/lib/utils";

import { Typewriter } from "@/components/ui/type-writer";

export default function HeroSection() {
	return (
		<section id="home" className="relative flex h-screen items-center justify-center">
			{/* Background image with overlay */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/try2.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			>
				{/* Dynamic overlay - black by default, white in dark mode */}
				<div className="absolute inset-0 bg-black/20"></div>
			</div>

			{/* Content */}
			<div className="z-10 flex flex-col items-center gap-1.5">
				<Image
					src="/hero-section-me.jpg"
					alt="remo image"
					priority
					width={100}
					height={100}
					className="h-36 w-36 rounded-full border-4 border-white object-cover sm:h-46 sm:w-46 md:h-50 md:w-50 md:border-6"
				/>
				<span className="mt-4 text-2xl font-medium text-white sm:text-3xl md:text-[44px]">
					Hi, I&apos;m Galib Remo
				</span>
				<Typewriter
					text={["Software Engineer", "Front-end Developer", "Full-Stack Developer"]}
					loop
					className="relative left-0.5 text-sm font-medium text-white sm:text-lg md:text-2xl"
					speed={50}
				/>
				{/* <span className="text-sm font-medium text-white sm:text-lg md:text-2xl">
					Software Engineer
				</span> */}
				<motion.div
					onClick={() => handleScrollTo("about")}
					initial={{ y: 30 }}
					animate={{ y: [30, 60, 30] }}
					transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
					className="cursor-pointer"
				>
					<ChevronDown className="h-6 w-6 text-white md:h-12 md:w-12" />
				</motion.div>
			</div>
		</section>
	);
}
