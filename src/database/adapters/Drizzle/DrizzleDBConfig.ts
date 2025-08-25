// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// import * as schema from "./DrizzleSchema";

// // Create the postgres connection
// const client = postgres(process.env.DATABASE_URL!);
// const db = drizzle(client, { schema });

// export default db;


import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./DrizzleSchema";

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

export default db;
