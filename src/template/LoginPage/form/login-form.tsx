"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { LoadingButton } from "@/components/ui/loading-button";

import { useRouter } from "@/i18n/navigation";

// Define the form schema with Zod
const formSchema = z.object({
	email: z.email({
		message: "Please enter a valid email address."
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters."
	})
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	// Initialize the form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true);
		try {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false
			});

			if (result?.error) {
				toast.error("Invalid email or password");
			} else if (result?.ok) {
				router.push("/dashboard");
				toast.success("Successfully logged in!");
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="gap-0.5">
					<CardTitle className="text-xl">Login to your account</CardTitle>
					<CardDescription>Enter your credentials to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Enter your email" type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel>Password</FormLabel>
											{/* <a
												href="#"
												className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</a> */}
										</div>
										<FormControl>
											<InputPassword placeholder="Enter your password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex flex-col gap-3">
								<LoadingButton loadingText="Logging in..." isLoading={isLoading} className="w-full">
									Login
								</LoadingButton>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

