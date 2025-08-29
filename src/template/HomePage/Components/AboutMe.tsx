import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";

export default function AboutMe() {
	return (
		<section id="about">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:py-20">
				<div className="flex flex-col gap-2 md:gap-6">
					<span className="text-2xl font-medium sm:text-3xl md:text-4xl">Hello, Remo here...</span>
					<p className="text sm mt-1 md:mt-0 md:text-lg">
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
					</p>
					<div className="mt-2 flex space-x-6">
						<Link
							href="https://www.facebook.com/galibremo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Facebook size={20} />
						</Link>
						<Link
							href="https://www.instagram.com/galib_remo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram size={20} />
						</Link>
						<Link
							href="https://www.linkedin.com/in/galibremo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin size={20} />
						</Link>
						<Link href="mailto:galibremo@gmail.com">
							<Mail size={20} />
						</Link>
					</div>
					<Link href="/Galib-Remo-CV.pdf" target="_blank" rel="noopener noreferrer">
						<Button className="mt-4 w-fit cursor-pointer bg-gradient-to-r from-[#9152ee] to-[#40d3f4] md:mt-2">
							My Resume
						</Button>
					</Link>
				</div>
				<Image
					src="/about-me.jpg"
					alt="remo's image"
					width={300}
					height={300}
					className="h-115 w-100 rounded-md object-cover md:mt-0"
				/>
			</div>
		</section>
	);
}
