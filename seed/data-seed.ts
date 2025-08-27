import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/database/adapters/Drizzle/DrizzleSchema";
import { HerosType, UserDatabaseSchemaType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

const user: Omit<UserDatabaseSchemaType, "id">[] = [
	{
		name: "galibremo",
		email: "galibremo@gmail.com",
		password: bcrypt.hashSync("Bang@123", 10),
		image: null,
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

const heros: Omit<HerosType, "id">[] = [
	{
		name: "Galib Remo",
		description: "Software Engineer",
		backgroundImage: "",
		profileImage: "",
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

const main = async () => {
	try {
		console.log("Starting data seed...");

		await db.delete(schema.users);
		await db.insert(schema.users).values(user).returning().execute();

		await db.delete(schema.heros);
		await db.insert(schema.heros).values(heros).returning().execute();

		console.log("Data seed completed successfully.");
	} catch (error: any) {
		console.error("Data seed failed:", error.message);
	}
};

main();
