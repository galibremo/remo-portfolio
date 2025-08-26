import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// users table
export const users = pgTable("user", {
	id: serial("id").primaryKey(),
	name: text("name"),
	email: text("email").unique().notNull(),
	password: text("password"),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

// // Hero Section Content
// export const heroContent = pgTable("hero_content", {
// 	id: serial("id").primaryKey(),
// 	name: text("name").notNull(),
// 	title: text("title").notNull(),
// 	backgroundImage: text("background_image").notNull(),
// 	profileImage: text("profile_image").notNull(),
// 	isActive: boolean("is_active").notNull().default(true),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // About Me Section
// export const aboutContent = pgTable("about_content", {
// 	id: serial("id").primaryKey(),
// 	title: text("title").notNull(),
// 	description: text("description").notNull(),
// 	image: text("image").notNull(),
// 	resumeUrl: text("resume_url"),
// 	socialLinks: json("social_links").$type<{
// 		facebook?: string;
// 		instagram?: string;
// 		linkedin?: string;
// 		email?: string;
// 	}>(),
// 	isActive: boolean("is_active").notNull().default(true),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Education
// export const education = pgTable("education", {
// 	id: serial("id").primaryKey(),
// 	title: text("title").notNull(),
// 	institution: text("institution").notNull(),
// 	startDate: text("start_date").notNull(),
// 	endDate: text("end_date"),
// 	major: text("major"),
// 	grade: text("grade"), // CGPA/GPA
// 	location: text("location").notNull(),
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Professional Experience
// export const experience = pgTable("experience", {
// 	id: serial("id").primaryKey(),
// 	title: text("title").notNull(),
// 	company: text("company").notNull(),
// 	duration: text("duration").notNull(),
// 	description: text("description").notNull(),
// 	image: text("image").notNull(),
// 	technologies: json("technologies").$type<string[]>(),
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Projects
// export const projects = pgTable("projects", {
// 	id: serial("id").primaryKey(),
// 	title: text("title").notNull(),
// 	description: text("description").notNull(),
// 	image: text("image").notNull(),
// 	githubUrl: text("github_url"),
// 	liveUrl: text("live_url"),
// 	technologies: json("technologies").$type<string[]>(),
// 	featured: boolean("featured").notNull().default(false),
// 	isGithubPrivate: boolean("is_github_private").notNull().default(false),
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Technical Skills
// export const skills = pgTable("skills", {
// 	id: serial("id").primaryKey(),
// 	name: text("name").notNull(),
// 	category: text("category").notNull(), // 'frontend' or 'backend'
// 	proficiency: integer("proficiency").notNull(), // 0-100
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Contact Information
// export const contactInfo = pgTable("contact_info", {
// 	id: serial("id").primaryKey(),
// 	type: text("type").notNull(), // 'email', 'phone', 'location'
// 	label: text("label").notNull(),
// 	value: text("value").notNull(),
// 	href: text("href"),
// 	icon: text("icon"), // Icon name for lucide-react
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Quotes/Testimonials
// export const quotes = pgTable("quotes", {
// 	id: serial("id").primaryKey(),
// 	content: text("content").notNull(),
// 	author: text("author"),
// 	position: text("position"),
// 	company: text("company"),
// 	image: text("image"),
// 	isActive: boolean("is_active").notNull().default(true),
// 	sortOrder: integer("sort_order").notNull().default(0),
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// // Site Settings (Global configurations)
// export const siteSettings = pgTable("site_settings", {
// 	id: serial("id").primaryKey(),
// 	key: text("key").notNull().unique(),
// 	value: text("value").notNull(),
// 	description: text("description"),
// 	type: text("type").notNull().default("text"), // 'text', 'number', 'boolean', 'json', 'url', 'email'
// 	category: text("category").notNull().default("general"), // 'general', 'seo', 'contact', 'social'
// 	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
// });

// /**
//  * All the relations between the tables are defined here
//  * The relations are used to fetch data from multiple tables
//  * in a single query
//  */

// // User relations (if you plan to have multiple users managing content)
// export const usersRelations = relations(users, ({ many }) => ({
// 	// Future: content created by users
// }));
