import { InferSelectModel } from "drizzle-orm";

import { users } from "@/database/adapters/Drizzle/DrizzleSchema";

// Database Schema Type
export type UserDatabaseSchemaType = InferSelectModel<typeof users>;
