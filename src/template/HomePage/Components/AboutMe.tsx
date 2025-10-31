"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";

export default function AboutMe() {
	// Individual element fade-in variants
	const fadeInVariants = {
		hidden: {
			opacity: 0,
			x: 30
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.6,
				ease: easeOut
			}
		}
	};

	// Image animation with slight scale effect
	const imageVariants = {
		hidden: {
			opacity: 0,
			scale: 0.9,
			x: 30
		},
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: easeOut
			}
		}
	};

	const socialLinkVariants = {
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
		<section id="about">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:py-20">
				{/* Left Content - Each element animates independently */}
				<div className="flex flex-1 flex-col gap-2 overflow-hidden md:gap-6">
					{/* Title - triggers when it comes into view */}
					<motion.span
						className="text-2xl font-medium sm:text-3xl md:text-4xl"
						variants={fadeInVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.8 }}
					>
						Hello, Remo here...
					</motion.span>

					{/* Description - triggers when it comes into view */}
					<motion.p
						className="text sm mt-1 md:mt-0 md:text-lg"
						variants={fadeInVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.6 }}
					>
						I am a simple, caring, and family-oriented person who values honesty,
						<br className="md:bloack hidden" /> respect, and meaningful relationships. I try to live
						my life according to
						<br className="md:bloack hidden" /> Islamic principles, keeping deen as my priority.
						Family and friends describe
						<br className="md:bloack hidden" /> me as supportive, humble, and understanding. I enjoy
						spending time with
						<br className="md:bloack hidden" /> loved ones, learning new things, working with great
						minds, and striving to
						<br className="md:bloack hidden" /> become a better person by the grace of Allah.
					</motion.p>

					{/* Social Links - each link triggers independently */}
					<div className="mt-2 flex space-x-6">
						<motion.div
							variants={socialLinkVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 1 }}
						>
							<Link
								href="https://www.facebook.com/galibremo"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-blue-600"
							>
								<Facebook size={20} />
							</Link>
						</motion.div>
						<motion.div
							variants={socialLinkVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 1 }}
						>
							<Link
								href="https://www.instagram.com/galib_remo"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-pink-600"
							>
								<Instagram size={20} />
							</Link>
						</motion.div>
						<motion.div
							variants={socialLinkVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 1 }}
						>
							<Link
								href="https://www.linkedin.com/in/galibremo"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-blue-700"
							>
								<Linkedin size={20} />
							</Link>
						</motion.div>
						<motion.div
							variants={socialLinkVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 1 }}
						>
							<Link
								href="mailto:galibremo@gmail.com"
								className="transition-colors hover:text-red-600"
							>
								<Mail size={20} />
							</Link>
						</motion.div>
					</div>

					{/* Resume Button - triggers when it comes into view */}
					<motion.div
						variants={fadeInVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<Link href="/my-cv.pdf" target="_blank" rel="noopener noreferrer">
							<Button className="mt-4 w-fit cursor-pointer bg-gradient-to-r from-[#9152ee] to-[#40d3f4] transition-all duration-300 hover:from-[#8142de] hover:to-[#30c3e4] md:mt-2">
								My Resume
							</Button>
						</Link>
					</motion.div>
				</div>

				{/* Right Image - triggers when it comes into view */}
				<motion.div
					variants={imageVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.8 }}
				>
					<Image
						src="/about-me.jpg"
						alt="remo's image"
						width={300}
						height={300}
						className="h-115 w-100 rounded-md object-cover md:mt-0"
					/>
				</motion.div>
			</div>
		</section>
	);
}
