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

/**
 * All the relations between the tables are defined here
 * The relations are used to fetch data from multiple tables
 * in a single query
 */

//user_relations
