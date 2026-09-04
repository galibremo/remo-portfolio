import {
	Facebook01Icon,
	GithubIcon,
	InstagramIcon,
	Linkedin01Icon,
	Mail01Icon,
	WhatsappIcon
} from "hugeicons-react";
import type { ComponentType } from "react";

import { Link } from "@/i18n/navigation";

import {
	AboutContentType,
	ContactInfoType
} from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

type SocialIcon = ComponentType<{ size?: number }>;

type FooterLink = {
	href: string;
	Icon: SocialIcon;
	label: string;
};

const FALLBACK_SOCIALS: FooterLink[] = [
	{ href: "https://www.facebook.com/galibremo", Icon: Facebook01Icon, label: "Facebook" },
	{ href: "https://www.instagram.com/galib_remo", Icon: InstagramIcon, label: "Instagram" },
	{ href: "https://github.com/galibremo", Icon: GithubIcon, label: "GitHub" },
	{ href: "https://www.linkedin.com/in/galibremo", Icon: Linkedin01Icon, label: "LinkedIn" },
	{ href: "mailto:galibremo@gmail.com", Icon: Mail01Icon, label: "Email" },
	{ href: "https://wa.me/+8801744716387", Icon: WhatsappIcon, label: "WhatsApp" }
];

type FooterProps = {
	about: AboutContentType | null;
	contact: ContactInfoType[];
};

function resolveFooterSocials(
	about: AboutContentType | null,
	contact: ContactInfoType[]
): FooterLink[] {
	const links: FooterLink[] = [];
	const social = about?.socialLinks;

	if (social?.facebook) {
		links.push({ href: social.facebook, Icon: Facebook01Icon, label: "Facebook" });
	}
	if (social?.instagram) {
		links.push({ href: social.instagram, Icon: InstagramIcon, label: "Instagram" });
	}

	const github = contact.find(item => item.type === "github");
	if (github?.href) {
		links.push({ href: github.href, Icon: GithubIcon, label: "GitHub" });
	}

	if (social?.linkedin) {
		links.push({ href: social.linkedin, Icon: Linkedin01Icon, label: "LinkedIn" });
	}

	const emailHref = social?.email ?? contact.find(item => item.type === "email")?.href;
	if (emailHref) {
		links.push({ href: emailHref, Icon: Mail01Icon, label: "Email" });
	}

	const phone = contact.find(item => item.type === "phone");
	if (phone?.href) {
		links.push({ href: phone.href, Icon: WhatsappIcon, label: "WhatsApp" });
	}

	return links.length > 0 ? links : FALLBACK_SOCIALS;
}

export default function Footer({ about, contact }: FooterProps) {
	const socialLinks = resolveFooterSocials(about, contact);

	return (
		<footer className="relative overflow-hidden border-t border-border/40 bg-background py-10">
			<div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-purple-500 to-transparent"></div>

			<div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-6 text-center">
				<div className="flex flex-wrap items-center justify-center gap-3">
					{socialLinks.map(({ href, Icon, label }) => (
						<Link
							key={label}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/30 text-muted-foreground shadow-xs transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
							aria-label={label}
						>
							<Icon size={18} />
						</Link>
					))}
				</div>

				<div className="flex items-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
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
