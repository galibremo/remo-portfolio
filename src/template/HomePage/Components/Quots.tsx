"use client";

import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Quots() {
	const quots = [
		{
			suraName: "Surah An-Najm (53:39-40)",
			ayah: "“And that there is not for man except that [good] for which he strives. And that his effort will be seen.”"
		},
		{
			suraName: "Surah Al-Furqan (25:70)",
			ayah: "“Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good.”"
		},
		{
			suraName: "Surah Al-Baqarah (2:156)",
			ayah: "“Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'”"
		}
	];

	return (
		<section id="quotes" className="relative overflow-hidden py-16 md:py-24">
			{/* Background Image with Dark Gradient Overlay */}
			<div
				className="absolute inset-0 z-0 scale-105"
				style={{
					backgroundImage: "url('/try10.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 70%"
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85 backdrop-blur-xs"></div>
				{/* Ambient Glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-6">
				{/* Decorative Quote Icon */}
				<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 backdrop-blur-md shadow-lg shadow-purple-500/10">
					<Quote size={28} />
				</div>

				<Swiper
					autoplay={{
						delay: 7000,
						disableOnInteraction: false
					}}
					speed={800}
					loop={true}
					style={{ paddingBottom: "60px" }}
					slidesPerView={1}
					grabCursor={true}
					modules={[Pagination, Autoplay]}
					pagination={{
						clickable: true
					}}
				>
					{quots.map((quot, index) => (
						<SwiperSlide key={index}>
							<div className="space-y-4 text-center px-4">
								<p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/95 leading-relaxed tracking-wide drop-shadow-sm">
									{quot.ayah}
								</p>
								<div className="pt-2">
									<span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs sm:text-sm font-semibold tracking-wider text-cyan-300 uppercase">
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

