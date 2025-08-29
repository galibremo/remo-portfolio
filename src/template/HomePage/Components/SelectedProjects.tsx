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
			live: "https://whiteshares-frontend-bolt.vercel.app/",
			notAllowed: true
		},
		{
			image: "/qchicken.png",
			title: "Q Chicken",
			description:
				"Restaurant management website Added features like browse available food items. Place orders online. Track their order status. Manage their profile and order history",
			link: "https://github.com/typetechit/quick-chicken-website",
			live: "https://quick-chicken-wesite.vercel.app/",
			notAllowed: true
		},
		{
			image: "/pill.png",
			title: "Pill Spliter - Challenge",
			description:
				"Create multiple pills using mouse. Add drag functionality. Pills can be sliced using cross-hair. Pills can overlap one another. Overlapped pills will also be sliced using one click.",
			link: "https://github.com/galibremo/pill-splitter-challenge",
			live: "https://pill-splitter-challenge-tan.vercel.app/",
			notAllowed: false
		},
		{
			image: "/Snap.jpg",
			title: "Window Snap - Challenge",
			description:
				"Implement a window snapping feature similar to that of modern operating systems. Users should be able to drag windows to the edges of the screen to snap them into place.",
			link: "https://github.com/galibremo/window-tiler-challenge-starter-code",
			live: "https://window-tiler-challenge-starter-code.vercel.app/",
			notAllowed: false
		}
	];
	return (
		<section id="projects" className="bg-accent">
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
						Selected Projects
					</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">
						Projects & Challenges
					</span>
				</div>
				<div className="mt-6 mb-4 grid grid-cols-1 gap-4 md:mt-12 md:mb-6 md:grid-cols-2 md:gap-6">
					{selectedProjects.map((item, idx) => (
						<Card key={idx} className="gap-2 rounded-md">
							<CardContent>
								<Image
									src={item.image}
									alt={item.title}
									width={32}
									height={32}
									style={{ width: "32px", height: "32px", objectFit: "contain" }}
								/>

								<div className="mb-2">
									<p className="mt-2 line-clamp-1 text-base font-medium sm:text-xl">{item.title}</p>
								</div>
								<p className="line-clamp-6 text-sm md:line-clamp-4">{item.description}</p>
								<div className="flex items-center gap-2">
									{!item.notAllowed && (
										<Button className="mt-2 cursor-pointer" size="sm" variant="outline" asChild>
											<Link href={item.link} target="_blank">
												<Github />
											</Link>
										</Button>
									)}
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
