import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function AboutMe() {
	return (
		<section className="mx-auto flex max-w-6xl items-center justify-between px-4 py-10">
			<div className="flex flex-col gap-4">
				<span className="text-4xl font-medium">Hello, Remo here...</span>
				<p className="text-lg">
					I am a simple, caring, and family-oriented person who values honesty,
					<br /> respect, and meaningful relationships. I try to live my life according to
					<br /> Islamic principles, keeping deen as my priority. Family and friends describe
					<br /> me as supportive, humble, and understanding. I enjoy spending time with
					<br /> loved ones, learning new things, working with great minds, and striving to
					<br /> become a better person by the grace of Allah.
				</p>
				<div className="mt-2 flex space-x-6">
					<Facebook size={20} />
					<Instagram size={20} />
					<Linkedin size={20} />
					<Mail size={20} />
				</div>
				<Button className="mt-2 w-fit cursor-pointer">My Resume</Button>
			</div>
			<Image
				src="/about-me.jpg"
				alt="remo's image"
				width={300}
				height={300}
				className="h-120 w-100"
			/>
		</section>
	);
}
