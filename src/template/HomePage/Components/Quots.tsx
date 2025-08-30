"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Quots() {
	const quots = [
		{
			suraName: "Surah An-Najam (53:39-40)",
			ayah: "And that there is not for man except that [good] for which he strives. And that his effort will be seen."
		},
		{
			suraName: "Surah Furqan (25:70)",
			ayah: "Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good."
		},
		{
			suraName: "Surah Al-Baqarah (2:156)",
			ayah: "Who, when disaster strikes them, say, “Indeed we belong to Allah, and indeed to Him we will return."
		}
	];
	return (
		<section id="quotes" className="relative p-8">
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/try10.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 80%"
				}}
			>
				{/* Dynamic overlay - black by default, white in dark mode */}
				<div className="absolute inset-0 bg-black/20"></div>
			</div>
			<div className="mx-auto max-w-3xl px-4 py-10">
				<Swiper
					autoplay={{
						delay: 7000,
						disableOnInteraction: false
					}}
					speed={2000}
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
							<div className="space-y-6 text-center">
								<span className="text-white block text-xl font-medium md:text-2xl">
									{quot.suraName}
								</span>
								<p className="text-white text-2xl font-medium italic md:text-4xl">{quot.ayah}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
