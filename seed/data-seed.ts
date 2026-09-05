import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/database/adapters/Drizzle/DrizzleSchema";

config({ path: ".env.local" });
config();

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log("Starting data seed...");

		await db.delete(schema.quotes);
		await db.delete(schema.contactInfo);
		await db.delete(schema.contactContent);
		await db.delete(schema.skills);
		await db.delete(schema.projects);
		await db.delete(schema.experience);
		await db.delete(schema.education);
		await db.delete(schema.aboutContent);
		await db.delete(schema.heros);
		await db.delete(schema.users);

		const [user] = await db
			.insert(schema.users)
			.values({
				name: "galibremo",
				email: "galibremo@gmail.com",
				password: bcrypt.hashSync("Bang@123", 10),
				image: null
			})
			.returning()
			.execute();

		await db.insert(schema.heros).values({
			userId: user.id,
			name: "Galib Remo",
			description:
				"Crafting high-performance, user-centric web applications with modern tech stacks and elegant user interfaces.",
			statusBadge: "Available for full-stack opportunities & projects",
			typewriterRoles: [
				"Software Engineer",
				"Front-end Developer",
				"Full-Stack Developer"
			],
			backgroundImage: "/try10.jpg",
			profileImage: "/me-match.jpg"
		});

		await db.insert(schema.aboutContent).values({
			heading: "Hello, Remo here...",
			paragraphOne:
				"I am a passionate Software Engineer who values honesty, respect, and meaningful relationships. I strive to align my personal and professional life with Islamic principles, maintaining deen as my priority.",
			paragraphTwo:
				"Described by friends and colleagues as supportive, humble, and understanding, I thoroughly enjoy solving complex engineering problems, building sleek full-stack products, working with great minds, and continuously becoming a better developer and individual.",
			image: "/about-me.jpg",
			resumeUrl: "/my-cv.pdf",
			socialLinks: {
				facebook: "https://www.facebook.com/galibremo",
				instagram: "https://www.instagram.com/galib_remo",
				linkedin: "https://www.linkedin.com/in/galibremo",
				email: "mailto:galibremo@gmail.com"
			}
		});

		await db.insert(schema.education).values([
			{
				title: "B.Sc. in CSE",
				fullTitle: "B.Sc. in Computer Science & Engineering",
				institution: "American International University-Bangladesh (AIUB)",
				date: "09/2019 – 01/2024",
				major: "Major in Software Engineering",
				cgpa: "CGPA: 3.73 / 4.00",
				location: "Dhaka, Bangladesh",
				isHighlight: true,
				sortOrder: 1
			},
			{
				title: "HSC",
				fullTitle: "Higher Secondary Certificate (HSC)",
				institution: "Dinajpur Government City College",
				date: "2019",
				major: "Science Division",
				cgpa: "GPA: 4.08 / 5.00",
				location: "Dinajpur, Bangladesh",
				isHighlight: false,
				sortOrder: 2
			},
			{
				title: "SSC",
				fullTitle: "Secondary School Certificate (SSC)",
				institution: "Saint Philips High School and College",
				date: "2017",
				major: "Science Division",
				cgpa: "GPA: 4.67 / 5.00",
				location: "Dinajpur, Bangladesh",
				isHighlight: false,
				sortOrder: 3
			}
		]);

		await db.insert(schema.experience).values([
			{
				image: "/uiux.jpg",
				title: "UI/UX Designer (Trainee)",
				company: "AKIJ iBOS Limited",
				duration: "1 month",
				description:
					"Built a strong design sense and deeper understanding of user experience, forming the foundation for creating intuitive, user-friendly interfaces.",
				technologies: ["Figma", "User Research", "Wireframing", "UI/UX Design"],
				sortOrder: 1
			},
			{
				image: "/React.jpg",
				title: "Software Engineer (React)",
				company: "mPower Social Enterprises Ltd.",
				duration: "Aug 2024 - Feb 2025",
				description:
					"Gaining real-world project experience, collaborating with cross-functional engineering teams, strengthening front-end architecture and performance optimization.",
				technologies: ["React", "TanStack Query", "Material UI", "TypeScript"],
				sortOrder: 2
			},
			{
				image: "/Nextjs.jpg",
				title: "Full-Stack Developer (Next.js)",
				company: "Typetech IT",
				duration: "Mar 2025 - Present",
				description:
					"Architecting and developing modern full-stack web applications. Managing both front-end UI and back-end database schemas using cutting-edge Next.js stack.",
				technologies: [
					"Next.js",
					"Express.js",
					"Drizzle ORM",
					"TypeScript",
					"Tailwind CSS"
				],
				sortOrder: 3
			}
		]);

		await db.insert(schema.projects).values([
			{
				image: "/whiteshares.webp",
				title: "White Shares Portal",
				category: "Fintech Platform",
				description:
					"Full-featured white-shares portal for investors and admins. Features real-time purchase analytics, automated charts, growth dashboards, and secure transaction workflows.",
				githubUrl: "https://github.com/galibremo/Whiteshares-Frontend",
				liveUrl: "https://whiteshares-frontend.vercel.app/login?test=investor",
				isGithubPrivate: true,
				tags: ["Next.js", "Analytics", "Tailwind CSS", "Recharts"],
				sortOrder: 1
			},
			{
				image: "/gloriaelegance-logo.png",
				title: "Gloria Elegance",
				category: "E-Commerce",
				description:
					"Luxury online store in Bangladesh offering imported premium products. Features integrated payment gateways, cart system, and real-time inventory management.",
				githubUrl: "https://github.com/typetechit/gloriaelegance-website",
				liveUrl: "https://gloriaelegance-website.vercel.app/",
				isGithubPrivate: true,
				tags: ["E-Commerce", "Next.js", "Payment Gateway"],
				sortOrder: 2
			},
			{
				image: "/pill.png",
				title: "Pill Splitter - Challenge",
				category: "Interactive Web App",
				description:
					"Interactive canvas/mouse challenge where users create, drag, overlap, and dynamically slice pill components with precision cross-hair collision logic.",
				githubUrl: "https://github.com/galibremo/pill-splitter-challenge",
				liveUrl: "https://pill-splitter-challenge-tan.vercel.app/",
				isGithubPrivate: false,
				tags: ["React", "DOM Manipulation", "Algorithms"],
				sortOrder: 3
			},
			{
				image: "/Snap.jpg",
				title: "Window Snap - Challenge",
				category: "OS Interface Simulation",
				description:
					"Simulates desktop OS window snapping. Users can drag windows to screen edges to snap into multi-grid tiling layouts smoothly.",
				githubUrl: "https://github.com/galibremo/window-tiler-challenge-starter-code",
				liveUrl: "https://window-tiler-challenge-starter-code.vercel.app/",
				isGithubPrivate: false,
				tags: ["Frontend", "Drag & Drop", "Tiling Window"],
				sortOrder: 4
			}
		]);

		await db.insert(schema.skills).values([
			{ name: "TypeScript", category: "frontend", proficiency: 80, sortOrder: 1 },
			{ name: "Redux", category: "frontend", proficiency: 88, sortOrder: 2 },
			{ name: "Tailwind", category: "frontend", proficiency: 85, sortOrder: 3 },
			{ name: "Next.js", category: "frontend", proficiency: 87, sortOrder: 4 },
			{ name: "React", category: "frontend", proficiency: 92, sortOrder: 5 },
			{ name: "TypeScript", category: "backend", proficiency: 70, sortOrder: 1 },
			{ name: "Express.js", category: "backend", proficiency: 82, sortOrder: 2 },
			{ name: "Drizzle", category: "backend", proficiency: 77, sortOrder: 3 },
			{ name: "Mongoose", category: "backend", proficiency: 78, sortOrder: 4 },
			{ name: "Next.js", category: "backend", proficiency: 75, sortOrder: 5 }
		]);

		await db.insert(schema.quotes).values([
			{
				suraName: "Surah An-Najm (53:39-40)",
				ayah: "“And that there is not for man except that [good] for which he strives. And that his effort will be seen.”",
				sortOrder: 1
			},
			{
				suraName: "Surah Al-Furqan (25:70)",
				ayah: "“Except for those who repent, believe and do righteous work. For them Allah will replace their evil deeds with good.”",
				sortOrder: 2
			},
			{
				suraName: "Surah Al-Baqarah (2:156)",
				ayah: "“Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'”",
				sortOrder: 3
			}
		]);

		await db.insert(schema.contactContent).values({
			heading: "I love to hear from you!",
			paragraph:
				"I'm always interested in hearing about new projects, engineering roles, and creative ideas. Reach out and I'll get back to you as soon as possible."
		});

		await db.insert(schema.contactInfo).values([
			{
				title: "Email",
				value: "galibremo@gmail.com",
				href: "mailto:galibremo@gmail.com",
				type: "email",
				sortOrder: 1
			},
			{
				title: "GitHub",
				value: "galibremo",
				href: "https://github.com/galibremo",
				type: "github",
				sortOrder: 2
			},
			{
				title: "Phone / WhatsApp",
				value: "+8801744716387",
				href: "https://wa.me/+8801744716387",
				type: "phone",
				sortOrder: 3
			}
		]);

		console.log("Data seed completed successfully.");
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		console.error("Data seed failed:", message);
		process.exit(1);
	}
};

main();
