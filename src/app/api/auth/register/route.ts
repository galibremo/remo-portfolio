import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
import { users } from "@/database/adapters/Drizzle/DrizzleSchema";

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedFields = registerSchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: "Invalid fields",
					details: validatedFields.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { name, email, password } = validatedFields.data;

		// Check if user already exists - using any to bypass type issues
		const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (existingUser.length > 0) {
			return NextResponse.json({ error: "User already exists" }, { status: 400 });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user
		const [newUser] = await db
			.insert(users)
			.values({
				name,
				email,
				password: hashedPassword
			})
			.returning({
				id: users.id,
				name: users.name,
				email: users.email
			});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: newUser
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
