import { ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function HeroSection() {
	return (
		<section
			className="flex h-screen items-center justify-center"
			style={{
				backgroundImage: "url('/hero-section-bg.jpg')",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"

			}}
		>
			<div className="flex flex-col items-center gap-2">
				<Image
					src="/hero-section-me.jpg"
					alt="remo image"
					width={100}
					height={100}
					className="h-60 w-60 rounded-full border-6 border-white object-cover"
				/>
				<span className="mt-4 text-5xl font-medium">Hi, I&apos;m Galib Remo</span>
				<span className="text-2xl font-medium">Software Engineer</span>
				<motion.div
					initial={{ y: 30 }}
					animate={{ y: [30, 60, 30] }}
					transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
				>
					<ChevronDown size={50} />
				</motion.div>
			</div>
		</section>
	);
}
