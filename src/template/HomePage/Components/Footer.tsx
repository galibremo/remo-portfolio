import { Facebook01Icon, GithubIcon, InstagramIcon, Linkedin01Icon, Mail01Icon, WhatsappIcon } from "hugeicons-react";

import { Link } from "@/i18n/navigation";

export default function Footer() {
	const socialLinks = [
		{ href: "https://www.facebook.com/galibremo", Icon: Facebook01Icon, label: "Facebook" },
		{ href: "https://www.instagram.com/galib_remo", Icon: InstagramIcon, label: "Instagram" },
		{ href: "https://github.com/galibremo", Icon: GithubIcon, label: "GitHub" },
		{ href: "https://www.linkedin.com/in/galibremo", Icon: Linkedin01Icon, label: "LinkedIn" },
		{ href: "mailto:galibremo@gmail.com", Icon: Mail01Icon, label: "Email" },
		{ href: "https://wa.me/+8801744716387", Icon: WhatsappIcon, label: "WhatsApp" }
	];

	return (
		<footer className="relative border-t border-border/40 py-10 overflow-hidden bg-background">
			{/* Top glow ray */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-linear-to-r from-transparent via-purple-500 to-transparent"></div>

			<div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-center gap-6 text-center">
				{/* Social Links */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					{socialLinks.map(({ href, Icon, label }) => (
						<Link
							key={label}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/30 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400 shadow-xs"
							aria-label={label}
						>
							<Icon size={18} />
						</Link>
					))}
				</div>

				{/* Copyright */}
				<div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground font-medium">
					<span>© {new Date().getFullYear()} Handcrafted with passion by</span>
					<div className="glitch-logo font-bold text-foreground" data-text="REMO.">
						<span className="bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							REMO.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

