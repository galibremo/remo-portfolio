import { Calendar, MapPin } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
	const jobs = [
		{
			title: "B.Sc. in CSE",
			desc: "American International University-Bangladesh",
			date: "09/2019 – 01/2024",
			major: " - Major in Software Engineering",
			cgpa: "CGPA: 3.73 / 4.00",
			location: "Dhaka, Bangladesh"
		},
		{
			title: "HSC",
			desc: "Dinajpur Government City College",
			date: "2019",
			major: " - Division Science",
			cgpa: "GPA: 4.08 / 5.00",
			location: "Dinajpur, Bangladesh"
		},
		{
			title: "SSC",
			desc: "Saint Philips High School and College",
			date: "2017",
			major: " - Division Science",
			cgpa: "GPA: 4.67 / 5.00",
			location: "Dinajpur, Bangladesh"
		}
	];

	const cardVariants = {
		hiddenLeft: { opacity: 0, x: -100 },
		hiddenRight: { opacity: 0, x: 100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: easeOut }
		}
	};

	return (
		<section id="education" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", bounce: 0.7, stiffness: 400, damping: 10, duration: 0.8 }}
					viewport={{ once: true, amount: "all" }}
				>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">Education</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">
						School, College & University
					</span>
				</motion.div>

				<motion.div
					className="mt-6 mb-4 space-y-4 md:mt-12 md:mb-6 md:space-y-6 overflow-hidden"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.8 }}
				>
					{jobs.map((item, idx) => {
						const startVariant = idx % 2 === 0 ? "hiddenLeft" : "hiddenRight";
						return (
							<motion.div
								key={idx}
								variants={cardVariants}
								initial={startVariant}
								whileInView="visible"
								viewport={{ once: true }}
							>
								<Card key={idx} className="rounded-md bg-transparent">
									<CardContent>
										<div className="justify-between sm:flex">
											<div className="flex-1">
												<span className="text-lg leading-0 font-medium text-cyan-600 md:text-xl">
													{item.title}
												</span>
												<p className="text-muted-foreground text-sm md:text-base">{item.desc}</p>
												<div className="mt-0.5 pl-1 text-sm md:text-base">
													{item.major} &nbsp; | &nbsp; {item.cgpa}
												</div>
											</div>
											<div className="mt-2 space-y-1 text-sm sm:mt-0 md:space-y-0 md:text-base">
												<span className="flex items-center justify-start gap-2 md:justify-end">
													<Calendar size={16} className="mb-0.5" />
													{item.date}
												</span>
												<span className="flex items-center justify-start gap-2 md:justify-end">
													<MapPin size={16} className="mb-0.5" />
													{item.location}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}

