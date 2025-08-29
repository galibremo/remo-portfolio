import { Facebook, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";

import { Link } from "@/i18n/navigation";

export default function Footer() {
	return (
		<section className="flex flex-col items-center justify-center gap-2.5 p-8">
			<div className="mt-1 flex items-center gap-8">
				<Link href="https://www.facebook.com/galibremo" target="_blank" rel="noopener noreferrer">
					<Facebook size={18} />
				</Link>
				<Link href="https://www.instagram.com/galib_remo" target="_blank" rel="noopener noreferrer">
					<Instagram size={18} />
				</Link>
				<Link href="https://github.com/galibremo" target="_blank" rel="noopener noreferrer">
					<Github size={18} />
				</Link>
				<Link
					href="https://www.linkedin.com/in/galibremo"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin size={18} />
				</Link>
				<Link href="mailto:galibremo@gmail.com">
					<Mail size={18} />
				</Link>
				<Link href="https://wa.me/+8801744716387" target="_blank" rel="noopener noreferrer">
					<Phone size={18} />
				</Link>
			</div>
			<div className="flex">
				© 2025 made by
				<div className="glitch-logo" data-text="REMO.">
					<span className="font-semibold">REMO.</span>
				</div>
			</div>
		</section>
	);
}
