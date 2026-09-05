import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

config({ path: ".env.local" });
config();

import * as schema from "./DrizzleSchema";

const connectionString = process.env.DATABASE_URL as string;

const isNeon = connectionString?.includes("neon.tech");

const db = isNeon
	? drizzleNeon(neon(connectionString), { schema })
	: drizzlePg(new Pool({ connectionString }), { schema });

export default db;

