import { Calendar, MapPin, NotepadText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
	const jobs = [
		{
			title: "B.Sc. in Computer Science and Engineering",
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

	return (
		<section id="education" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl">Education</h1>
					<span className="block text-center text-xs sm:text-sm md:text-lg">
						School, College & University
					</span>
				</div>

				<div className="mt-6 space-y-4 md:mt-12 md:space-y-6">
					{jobs.map((item, idx) => (
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
					))}
				</div>
			</div>
		</section>
	);
}

