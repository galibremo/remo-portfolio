"use client";

import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { QuoteType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type QuotsProps = {
	items: QuoteType[];
	backgroundImage?: string | null;
};

export default function Quots({ items, backgroundImage }: QuotsProps) {
	const bg = backgroundImage || "/try10.jpg";

	return (
		<section id="quotes" className="relative overflow-hidden py-16 md:py-24">
			<div
				className="absolute inset-0 z-0 scale-105"
				style={{
					backgroundImage: `url('${bg}')`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 70%"
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85 backdrop-blur-xs"></div>
				<div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[100px]"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-6">
				<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10 backdrop-blur-md">
					<Quote size={28} />
				</div>

				<Swiper
					autoplay={{
						delay: 7000,
						disableOnInteraction: false
					}}
					speed={800}
					loop={items.length > 1}
					style={{ paddingBottom: "60px" }}
					slidesPerView={1}
					grabCursor={true}
					modules={[Pagination, Autoplay]}
					pagination={{
						clickable: true
					}}
				>
					{items.map(quot => (
						<SwiperSlide key={quot.id}>
							<div className="space-y-4 px-4 text-center">
								<p className="font-serif text-xl leading-relaxed tracking-wide text-white/95 italic drop-shadow-sm sm:text-2xl md:text-3xl">
									{quot.ayah}
								</p>
								<div className="pt-2">
									<span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-wider text-cyan-300 uppercase sm:text-sm">
										{quot.suraName}
									</span>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
