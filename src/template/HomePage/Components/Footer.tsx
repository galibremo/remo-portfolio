import { Facebook01Icon, GithubIcon, InstagramIcon, Linkedin01Icon, Mail01Icon, WhatsappIcon } from "hugeicons-react";

import { Link } from "@/i18n/navigation";

export default function Footer() {
	return (
		<section className="flex flex-col items-center justify-center gap-2.5 p-8">
			<div className="mt-1 flex items-center gap-8">
				<Link href="https://www.facebook.com/galibremo" target="_blank" rel="noopener noreferrer">
					<Facebook01Icon size={18} />
				</Link>
				<Link href="https://www.instagram.com/galib_remo" target="_blank" rel="noopener noreferrer">
					<InstagramIcon size={18} />
				</Link>
				<Link href="https://github.com/galibremo" target="_blank" rel="noopener noreferrer">
					<GithubIcon size={18} />
				</Link>
				<Link
					href="https://www.linkedin.com/in/galibremo"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin01Icon size={18} />
				</Link>
				<Link href="mailto:galibremo@gmail.com">
					<Mail01Icon size={18} />
				</Link>
				<Link href="https://wa.me/+8801744716387" target="_blank" rel="noopener noreferrer">
					<WhatsappIcon size={18} />
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
