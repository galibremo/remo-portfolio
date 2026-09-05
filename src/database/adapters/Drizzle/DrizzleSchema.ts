import { relations } from "drizzle-orm";
import { boolean, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
	id: serial("id").primaryKey(),
	name: text("name"),
	email: text("email").unique().notNull(),
	password: text("password"),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const heros = pgTable("hero_content", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").references(() => users.id),
	name: text("name").notNull(),
	description: text("description").notNull(),
	statusBadge: text("status_badge"),
	typewriterRoles: json("typewriter_roles").$type<string[]>().default([]),
	backgroundImage: text("background_image"),
	profileImage: text("profile_image"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const aboutContent = pgTable("about_content", {
	id: serial("id").primaryKey(),
	heading: text("heading").notNull(),
	paragraphOne: text("paragraph_one").notNull(),
	paragraphTwo: text("paragraph_two").notNull(),
	image: text("image").notNull(),
	resumeUrl: text("resume_url"),
	socialLinks: json("social_links").$type<{
		facebook?: string;
		instagram?: string;
		linkedin?: string;
		email?: string;
	}>(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const education = pgTable("education", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	fullTitle: text("full_title").notNull(),
	institution: text("institution").notNull(),
	date: text("date").notNull(),
	major: text("major"),
	cgpa: text("cgpa"),
	location: text("location").notNull(),
	isHighlight: boolean("is_highlight").notNull().default(false),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const experience = pgTable("experience", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	company: text("company").notNull(),
	duration: text("duration").notNull(),
	description: text("description").notNull(),
	image: text("image").notNull(),
	technologies: json("technologies").$type<string[]>().default([]),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const projects = pgTable("projects", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	category: text("category").notNull(),
	description: text("description").notNull(),
	image: text("image").notNull(),
	githubUrl: text("github_url"),
	liveUrl: text("live_url"),
	tags: json("tags").$type<string[]>().default([]),
	isGithubPrivate: boolean("is_github_private").notNull().default(false),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const skills = pgTable("skills", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	category: text("category").notNull(),
	proficiency: integer("proficiency").notNull(),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const contactInfo = pgTable("contact_info", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	value: text("value").notNull(),
	href: text("href"),
	type: text("type").notNull(),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const contactContent = pgTable("contact_content", {
	id: serial("id").primaryKey(),
	heading: text("heading").notNull(),
	paragraph: text("paragraph").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const quotes = pgTable("quotes", {
	id: serial("id").primaryKey(),
	suraName: text("sura_name").notNull(),
	ayah: text("ayah").notNull(),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
});

export const usersRelations = relations(users, ({ one }) => ({
	heroSection: one(heros, {
		fields: [users.id],
		references: [heros.userId]
	})
}));

export const herosRelations = relations(heros, ({ one }) => ({
	user: one(users, {
		fields: [heros.userId],
		references: [users.id]
	})
}));
