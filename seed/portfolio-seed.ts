// import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
// import { 
// 	heroContent,
// 	aboutContent,
// 	education,
// 	experience,
// 	projects,
// 	skills,
// 	contactInfo,
// 	quotes,
// 	siteSettings
// } from "@/database/adapters/Drizzle/DrizzleSchema";

// async function seedPortfolioData() {
// 	console.log("🌱 Seeding portfolio data...");

// 	try {
// 		// Seed Hero Content
// 		await db.insert(heroContent).values({
// 			name: "Galib Remo",
// 			title: "Software Engineer",
// 			backgroundImage: "/hero-section-bg.jpg",
// 			profileImage: "/hero-section-me.jpg",
// 			isActive: true
// 		});

// 		// Seed About Content
// 		await db.insert(aboutContent).values({
// 			title: "Hello, Remo here...",
// 			description: `I am a simple, caring, and family-oriented person who values honesty, respect, and meaningful relationships. I try to live my life according to Islamic principles, keeping deen as my priority. Family and friends describe me as supportive, humble, and understanding. I enjoy spending time with loved ones, learning new things, working with great minds, and striving to become a better person by the grace of Allah.`,
// 			image: "/about-me.jpg",
// 			resumeUrl: "/resume.pdf",
// 			socialLinks: {
// 				facebook: "https://facebook.com/galibremo",
// 				instagram: "https://instagram.com/galibremo",
// 				linkedin: "https://linkedin.com/in/galibremo",
// 				email: "galibremo@email.com"
// 			},
// 			isActive: true
// 		});

// 		// Seed Education
// 		const educationData = [
// 			{
// 				title: "B.Sc. in Computer Science and Engineering",
// 				institution: "American International University-Bangladesh",
// 				startDate: "09/2019",
// 				endDate: "01/2024",
// 				major: "Software Engineering",
// 				grade: "CGPA: 3.73 / 4.00",
// 				location: "Dhaka, Bangladesh",
// 				sortOrder: 1
// 			},
// 			{
// 				title: "HSC",
// 				institution: "Dinajpur Government City College",
// 				startDate: "2019",
// 				endDate: "2019",
// 				major: "Science",
// 				grade: "GPA: 4.08 / 5.00",
// 				location: "Dinajpur, Bangladesh",
// 				sortOrder: 2
// 			},
// 			{
// 				title: "SSC",
// 				institution: "Saint Philips High School and College",
// 				startDate: "2017",
// 				endDate: "2017",
// 				major: "Science",
// 				grade: "GPA: 4.67 / 5.00",
// 				location: "Dinajpur, Bangladesh",
// 				sortOrder: 3
// 			}
// 		];

// 		await db.insert(education).values(educationData);

// 		// Seed Experience
// 		const experienceData = [
// 			{
// 				title: "UI/UX Designer (Trainee)",
// 				company: "AKIJ iBOS Limited",
// 				duration: "1 month",
// 				description: "Built a strong design sense and deeper understanding of user experience, forming the foundation for creating intuitive, user-friendly interfaces",
// 				image: "/uiux.jpg",
// 				technologies: ["Figma", "User Research", "Wireframing", "Prototyping"],
// 				sortOrder: 1
// 			},
// 			{
// 				title: "Software Engineer (React)",
// 				company: "mPower Social Enterprises Ltd.",
// 				duration: "Aug 2024 - Feb 2025",
// 				description: "Gaining real-world project experience, collaborate with talented colleagues, understand workplace culture, strengthen my technical and teamwork skills",
// 				image: "/React.jpg",
// 				technologies: ["React", "TanStackQuery", "Material UI", "TypeScript"],
// 				sortOrder: 2
// 			},
// 			{
// 				title: "Full-Stack Developer (Next js)",
// 				company: "Typetech It",
// 				duration: "Mar 2025 - Present",
// 				description: "Design and develop web applications using modern technologies. Handle both front-end and back-end tasks while continuously learning new technologies",
// 				image: "/Nextjs.jpg",
// 				technologies: ["Next.js", "Express.js", "Drizzle ORM", "TypeScript", "Tailwind CSS"],
// 				sortOrder: 3
// 			}
// 		];

// 		await db.insert(experience).values(experienceData);

// 		// Seed Projects
// 		const projectData = [
// 			{
// 				title: "White Shares",
// 				description: "Develop white-shares portal for investors and admins. Add product purchase functionality. Add charts and graphs where users can see his monthly purchase growth and analytics.",
// 				image: "/whiteshares.webp",
// 				githubUrl: "https://github.com/typetechit/whiteshare-portal",
// 				liveUrl: "https://whiteshares-frontend-bolt.vercel.app/",
// 				technologies: ["React", "Node.js", "Charts.js", "MongoDB"],
// 				featured: true,
// 				isGithubPrivate: true,
// 				sortOrder: 1
// 			},
// 			{
// 				title: "Q Chicken",
// 				description: "Restaurant management website Added features like browse available food items. Place orders online. Track their order status. Manage their profile and order history",
// 				image: "/qchicken.png",
// 				githubUrl: "https://github.com/typetechit/quick-chicken-website",
// 				liveUrl: "https://quick-chicken-wesite.vercel.app/",
// 				technologies: ["React", "Node.js", "Express", "PostgreSQL"],
// 				featured: true,
// 				isGithubPrivate: true,
// 				sortOrder: 2
// 			},
// 			{
// 				title: "Pill Spliter - Challenge",
// 				description: "Create multiple pills using mouse. Add drag functionality. Pills can be sliced using cross-hair. Pills can overlap one another. Overlapped pills will also be sliced using one click.",
// 				image: "/pill.png",
// 				githubUrl: "https://github.com/galibremo/pill-splitter-challenge",
// 				liveUrl: "https://pill-splitter-challenge-tan.vercel.app/",
// 				technologies: ["React", "Canvas API", "TypeScript", "CSS3"],
// 				featured: true,
// 				isGithubPrivate: false,
// 				sortOrder: 3
// 			},
// 			{
// 				title: "Portfolio Website",
// 				description: "Design and develop web applications using modern technologies. Handle both front-end and back-end tasks while continuously learning new technologies",
// 				image: "/Nextjs.jpg",
// 				githubUrl: "",
// 				liveUrl: "",
// 				technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
// 				featured: false,
// 				isGithubPrivate: false,
// 				sortOrder: 4
// 			}
// 		];

// 		await db.insert(projects).values(projectData);

// 		// Seed Skills
// 		const skillsData = [
// 			// Frontend Skills
// 			{ name: "React", category: "frontend", proficiency: 92, sortOrder: 1 },
// 			{ name: "Next.js", category: "frontend", proficiency: 87, sortOrder: 2 },
// 			{ name: "Tailwind", category: "frontend", proficiency: 85, sortOrder: 3 },
// 			{ name: "Redux", category: "frontend", proficiency: 88, sortOrder: 4 },
// 			{ name: "TypeScript", category: "frontend", proficiency: 80, sortOrder: 5 },
			
// 			// Backend Skills
// 			{ name: "Node.js", category: "backend", proficiency: 85, sortOrder: 1 },
// 			{ name: "Express.js", category: "backend", proficiency: 82, sortOrder: 2 },
// 			{ name: "PostgreSQL", category: "backend", proficiency: 78, sortOrder: 3 },
// 			{ name: "Drizzle ORM", category: "backend", proficiency: 75, sortOrder: 4 },
// 			{ name: "MongoDB", category: "backend", proficiency: 80, sortOrder: 5 }
// 		];

// 		await db.insert(skills).values(skillsData);

// 		// Seed Contact Info
// 		const contactData = [
// 			{
// 				type: "email",
// 				label: "Email",
// 				value: "john.doe@email.com",
// 				href: "mailto:john.doe@email.com",
// 				icon: "Mail",
// 				sortOrder: 1
// 			},
// 			{
// 				type: "phone",
// 				label: "Phone",
// 				value: "+1 (555) 123-4567",
// 				href: "tel:+15551234567",
// 				icon: "Phone",
// 				sortOrder: 2
// 			},
// 			{
// 				type: "location",
// 				label: "Location",
// 				value: "San Francisco, CA",
// 				href: "#",
// 				icon: "MapPin",
// 				sortOrder: 3
// 			}
// 		];

// 		await db.insert(contactInfo).values(contactData);

// 		// Seed Quotes (if you want to add testimonials/quotes section)
// 		const quotesData = [
// 			{
// 				content: "The only way to do great work is to love what you do.",
// 				author: "Steve Jobs",
// 				position: "Co-founder",
// 				company: "Apple Inc.",
// 				sortOrder: 1
// 			}
// 		];

// 		await db.insert(quotes).values(quotesData);

// 		// Seed Site Settings
// 		const settingsData = [
// 			{
// 				key: "site_title",
// 				value: "Galib Remo - Portfolio",
// 				description: "Main site title",
// 				type: "text",
// 				category: "general"
// 			},
// 			{
// 				key: "site_description",
// 				value: "Full-Stack Developer specializing in React, Next.js, and modern web technologies",
// 				description: "Site meta description",
// 				type: "text",
// 				category: "seo"
// 			},
// 			{
// 				key: "contact_email",
// 				value: "galibremo@email.com",
// 				description: "Primary contact email",
// 				type: "email",
// 				category: "contact"
// 			},
// 			{
// 				key: "github_profile",
// 				value: "https://github.com/galibremo",
// 				description: "GitHub profile URL",
// 				type: "url",
// 				category: "social"
// 			},
// 			{
// 				key: "linkedin_profile",
// 				value: "https://linkedin.com/in/galibremo",
// 				description: "LinkedIn profile URL",
// 				type: "url",
// 				category: "social"
// 			}
// 		];

// 		await db.insert(siteSettings).values(settingsData);

// 		console.log("✅ Portfolio data seeded successfully!");
// 	} catch (error) {
// 		console.error("❌ Error seeding portfolio data:", error);
// 		throw error;
// 	}
// }

// // Only run if this file is executed directly
// if (require.main === module) {
// 	seedPortfolioData()
// 		.then(() => {
// 			console.log("🎉 Seeding completed!");
// 			process.exit(0);
// 		})
// 		.catch((error) => {
// 			console.error("❌ Seeding failed:", error);
// 			process.exit(1);
// 		});
// }

// export { seedPortfolioData };
