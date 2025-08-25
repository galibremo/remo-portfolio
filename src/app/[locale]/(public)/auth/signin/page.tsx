"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

const signinSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SignInPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (data: SigninFormData) => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false
			});

			if (result?.error) {
				setError("Invalid email or password");
			} else if (result?.ok) {
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md p-8">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Enter your email and password to access your account
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								{...form.register("email")}
								id="email"
								type="email"
								placeholder="Enter your email"
								className="mt-1"
							/>
							{form.formState.errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.email.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								{...form.register("password")}
								id="password"
								type="password"
								placeholder="Enter your password"
								className="mt-1"
							/>
							{form.formState.errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.password.message}
								</p>
							)}
						</div>

						{error && <div className="text-red-500 text-sm text-center">{error}</div>}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Signing in..." : "Sign In"}
						</Button>

						<div className="text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Don&apos;t have an account?{" "}
								<button
									type="button"
									onClick={() => router.push("/auth/signup")}
									className="text-blue-600 hover:text-blue-500 font-medium"
								>
									Sign up
								</button>
							</p>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
}
