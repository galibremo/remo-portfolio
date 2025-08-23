import { Github, Link2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Link } from "@/i18n/navigation";

export default function SelectedProjects() {
	const selectedProjects = [
		{
			image: "/whiteshares.webp",
			title: "White Shares",
			description:
				"Develop white-shares portal for investors and admins. Add product purchase functionality. Add charts and graphs where users can see his monthly purchase growth and analytics.",
			link: "https://github.com/typetechit/whiteshare-portal",
			live: ""
		},
		{
			image: "/qchicken.png",
			title: "Q Chicken",
			description:
				"Restaurant management website Added features like browse available food items. Place orders online. Track their order status. Manage their profile and order history",
			link: "https://github.com/typetechit/quick-chicken-website",
			live: ""
		},
		{
			image: "/pill.png",
			title: "Pill Spliter - Challenge",
			description:
				"Create multiple pills using mouse. Add drag functionality. Pills can be sliced using cross-hair. Pills can overlap one another. Overlapped pills will also be sliced using one click.",
			link: "https://github.com/galibremo/pill-splitter-challenge",
			live: "https://pill-splitter-challenge-tan.vercel.app/"
		},
		{
			image: "/Nextjs.jpg",
			title: "Full-Stack Developer (Next js)",
			description:
				"Design and develop web applications using modern technologies.  Handle both front-end and back-end tasks while continuously learning new techonologies",
			link: "",
			live: ""
		}
	];
	return (
		<section className="bg-accent">
			<div className="mx-auto max-w-6xl px-4 py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl">
						Selected Projects
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-lg">
						Projects & Challenges
					</span>
				</div>
				<div className="mt-6 grid grid-cols-2 gap-6 md:mt-12">
					{selectedProjects.map((item, idx) => (
						<Card key={idx} className="gap-2 rounded-md">
							<CardContent>
								<Image
									src={item.image}
									alt={item.title}
									width={32}
									height={32}
									className="object-cover"
								/>
								<div className="mb-2">
									<p className="mt-2 line-clamp-1 text-base font-medium sm:text-xl">{item.title}</p>
								</div>
								<p className="line-clamp-6 text-sm md:line-clamp-4">{item.description}</p>
								<div className="flex items-center gap-2">
									<Button className="mt-2 cursor-pointer" size="sm" variant="outline" asChild>
										<Link href={item.link} target="_blank">
											<Github />
										</Link>
									</Button>
									<Button className="mt-2 cursor-pointer" size="sm" variant="outline" asChild>
										<Link href={item.live} target="_blank">
											<Link2 />
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
