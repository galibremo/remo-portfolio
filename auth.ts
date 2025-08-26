import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
import { users } from "@/database/adapters/Drizzle/DrizzleSchema";

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt"
	},
	trustHost: true,
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				try {
					const validatedFields = loginSchema.safeParse(credentials);

					if (!validatedFields.success) {
						return null;
					}

					const { email, password } = validatedFields.data;

					// Find user by email
					const result = await db
						.select({
							id: users.id,
							email: users.email,
							password: users.password,
							name: users.name,
							image: users.image
						})
						.from(users)
						.where(eq(users.email, email))
						.limit(1);

					if (!result.length || !result[0].password) {
						return null;
					}

					// Verify password
					const isValidPassword = await bcrypt.compare(password, result[0].password);

					if (!isValidPassword) {
						return null;
					}

					// Return user object
					return {
						id: result[0].id.toString(),
						email: result[0].email,
						name: result[0].name || null,
						image: result[0].image || null
					};
				} catch (error) {
					console.error("Authorization error:", error);
					return null;
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		}
	},
	pages: {
		signIn: "/login"
	}
});
