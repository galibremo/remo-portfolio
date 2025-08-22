import { ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="relative flex h-screen items-center justify-center">
			{/* Background image with overlay */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/hero-section-bg.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			>
				{/* Dynamic overlay - black by default, white in dark mode */}
				<div className="absolute inset-0 bg-black/15"></div>
			</div>

			{/* Content */}
			<div className="z-10 flex flex-col items-center gap-2">
				<Image
					src="/hero-section-me.jpg"
					alt="remo image"
					width={100}
					height={100}
					className="h-60 w-60 rounded-full border-6 border-white object-cover"
				/>
				<span className="mt-4 text-5xl font-medium text-white">Hi, I&apos;m Galib Remo</span>
				<span className="text-2xl font-medium text-white">Software Engineer</span>
				<motion.div
					initial={{ y: 30 }}
					animate={{ y: [30, 60, 30] }}
					transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
				>
					<ChevronDown size={50} className="text-white" />
				</motion.div>
			</div>
		</section>
	);
}
