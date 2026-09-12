"use client";

import { Images } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";

import { GalleryItemType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type ImageGalleryProps = {
	items: GalleryItemType[];
};

export default function ImageGallery({ items }: ImageGalleryProps) {
	return (
		<section id="gallery" className="relative overflow-hidden py-12">
			{/* <div className="mx-auto mb-10 max-w-6xl px-6 text-center md:mb-14">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
						<Images size={14} className="text-cyan-400" />
						Visual Work
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Image{" "}
						<span className="bg-linear-to-r from-purple-500 via-cyan-400 to-purple-600 bg-clip-text font-extrabold text-transparent">
							Gallery
						</span>
					</h2>
				</motion.div>
			</div> */}

			<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
				<Marquee pauseOnHover className="[--duration:40s] [--gap:1rem]">
					{items.map(item => (
						<figure
							key={item.id}
							className="relative h-64 w-44 shrink-0 overflow-hidden rounded-lg sm:h-72 sm:w-52 md:h-80 md:w-66"
						>
							<Image
								src={item.image}
								alt={item.altText || item.title}
								fill
								sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
								className="object-cover"
							/>
						</figure>
					))}
				</Marquee>
				{/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background to-transparent" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background to-transparent" /> */}
			</div>
		</section>
	);
}
