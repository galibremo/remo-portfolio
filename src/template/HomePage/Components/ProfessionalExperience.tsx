import { MapPin } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function ProfessionalExperience() {
	const experiences = [
		{
			image: "/uiux.jpg",
			title: "UI/UX Designer (Trainee)",
			company: "AKIJ iBOS Limited",
			duration: "1 month",
			description:
				"Built a strong design sense and deeper understanding of user experience, forming the foundation for creating intuitive, user-friendly interfaces"
		},
		{
			image: "/React.jpg",
			title: "Software Engineer (React)",
			company: "mPower Social",
			duration: "Aug 2024 - Feb 2025",
			description:
				"Gaining real-world project experience, collaborate with talented colleagues,  understand workplace culture, strengthen my technical and teamwork skills"
		},
		{
			image: "/Nextjs.jpg",
			title: "Full-Stack Developer (Next js)",
			company: "Typetech It",
			duration: "Mar 2025 - Present",
			description:
				"Design and develop web applications using modern technologies.  Handle both front-end and back-end tasks while continuously learning new techonologies"
		}
	];

	return (
		<section>
			<div className="mx-auto max-w-6xl px-4 py-10">
				<div>
					<h1 className="text-center text-4xl font-semibold">Professional Experience</h1>
					<span className="block text-center text-lg">Internship and Jobs</span>
				</div>
				<div className="mt-12 flex flex-col items-center gap-6 md:flex-row">
					{experiences.map((item, idx) => (
						<Card key={idx} className="gap-2 rounded-md pt-0">
							<Image
								src={item.image}
								alt={item.title}
								height={500}
								width={500}
								className="h-50 w-full rounded-t-md object-cover p-0.5"
							/>
							<CardContent>
								<div className="mb-2">
									<p className="mt-2 text-base font-medium sm:text-xl line-clamp-1">{item.title}</p>
									<div className="text-muted-foreground">
										<span className="flex items-center gap-1">
											<MapPin size={16} className="mb-0.5" />
											{item.company} &nbsp;
										</span>
									</div>
								</div>
								<p className="text-sm line-clamp-5">{item.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
