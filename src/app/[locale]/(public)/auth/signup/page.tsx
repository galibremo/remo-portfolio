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

const signupSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string()
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const onSubmit = async (data: SignupFormData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					password: data.password
				})
			});

			if (response.ok) {
				// Auto sign in after successful registration
				const signInResult = await signIn("credentials", {
					email: data.email,
					password: data.password,
					redirect: false
				});

				if (signInResult?.ok) {
					router.push("/");
					router.refresh();
				}
			} else {
				const errorData = await response.json();
				setError(errorData.error || "Something went wrong");
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
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Create your account to get started
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<Label htmlFor="name">Full Name</Label>
							<Input
								{...form.register("name")}
								id="name"
								type="text"
								placeholder="Enter your full name"
								className="mt-1"
							/>
							{form.formState.errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.name.message}
								</p>
							)}
						</div>

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

						<div>
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								{...form.register("confirmPassword")}
								id="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								className="mt-1"
							/>
							{form.formState.errors.confirmPassword && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.confirmPassword.message}
								</p>
							)}
						</div>

						{error && <div className="text-red-500 text-sm text-center">{error}</div>}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Creating account..." : "Sign Up"}
						</Button>

						<div className="text-center">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Already have an account?{" "}
								<button
									type="button"
									onClick={() => router.push("/auth/signin")}
									className="text-blue-600 hover:text-blue-500 font-medium"
								>
									Sign in
								</button>
							</p>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
}
