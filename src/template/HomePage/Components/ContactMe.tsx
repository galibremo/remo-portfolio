"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";

// Form validation schema
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters."
	}),
	email: z.email({
		message: "Please enter a valid email address."
	}),
	message: z.string().min(5, {
		message: "Message must be at least 5 characters."
	})
});

type FormData = z.infer<typeof formSchema>;

export default function ContactMe() {
	const [isSending, setIsSending] = useState(false);
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: ""
		}
	});

	// Form submission handler
	const onSubmit = async (values: FormData) => {
		setIsSending(true);

		try {
			const templateParams = {
				name: values.name,
				email: values.email,
				message: values.message
			};

			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
				templateParams,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
			);

			toast.success("Message sent successfully!");
			form.reset();
		} catch (error) {
			console.error("Failed to send message:", error);
			toast.error("Failed to send message. Please try again.");
		} finally {
			setIsSending(false);
		}
	};

	return (
		<section id="contactme" className="shadow">
			<div className="mx-auto max-w-2xl px-6 py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-4xl">Contact Me</h1>
					<span className="block text-center text-xs sm:text-sm md:text-lg">Open to work</span>
				</div>
				<div className="mt-6 flex flex-col items-center justify-center gap-4 md:mt-12 md:gap-8">
					<div className="flex flex-col items-center gap-4 md:gap-20 md:flex-row">
						<div className="flex flex-col items-center gap-2">
							<Mail />
							<span>galibremo@gmail.com</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Github />
							<span>galibremo</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Phone />
							<span>+8801744716387</span>
						</div>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
							<div className="flex w-full flex-col gap-4 md:flex-row">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Your name..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Your email..." type="email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Your message..."
												className="h-32 resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-center">
								<LoadingButton
									className="cursor-pointer"
									loadingText="Sending..."
									isLoading={isSending}
								>
									<Send className="mr-2 h-4 w-4" /> Send Message
								</LoadingButton>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</section>
	);
}
