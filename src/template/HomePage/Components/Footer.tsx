import { Facebook, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
	return (
		<section className="flex flex-col items-center justify-center gap-2 p-6">
			<div className="flex items-center gap-8">
				<Facebook size={18} /> <Instagram size={18} /> <Github size={18} /> <Linkedin size={18} />{" "}
				<Mail size={18} /> <Phone size={18} />
			</div>
			<div>
				© 2025 made by <span className="font-semibold">REMO.</span>
			</div>
		</section>
	);
}
