"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "john.doe@email.com",
		href: "mailto:john.doe@email.com"
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+1 (555) 123-4567",
		href: "tel:+15551234567"
	},
	{
		icon: MapPin,
		label: "Location",
		value: "San Francisco, CA",
		href: "#"
	}
];

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
			<div className="mx-auto max-w-6xl px-6 py-6 md:py-10">
				<div>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">Contact Me</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">Open to work</span>
				</div>
				<div className="mt-6 mb-4 flex flex-col items-center justify-center gap-6 md:mt-12 md:mb-6 md:flex-row md:gap-14">
					<div className="w-full space-y-4 md:space-y-6">
						<span className="block text-2xl font-semibold md:text-3xl">
							I love to hear from you!
						</span>
						<div className="text-sm md:text-lg">
							I&apos;m always interested in hearing about new projects and opportunities. Whether
							you have a question or just want to say hello, I&apos;ll do my best to get back to you
							as soon as possible.
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<Mail />
								<span>galibremo@gmail.com</span>
							</div>
							<div className="flex items-center gap-4">
								<Github />
								<span>galibremo</span>
							</div>
							<div className="flex items-center gap-4">
								<Phone />
								<span>+8801744716387</span>
							</div>
						</div>
					</div>
					<Card className="w-full rounded-md">
						<CardHeader className="gap-0 text-center">
							<CardTitle className="text-xl">Send Me a Message</CardTitle>
							<CardDescription>Feel free to reach out using the form below.</CardDescription>
						</CardHeader>
						<CardContent className="mt-1">
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
									<LoadingButton
										className="w-full cursor-pointer bg-gradient-to-r from-[#9152ee] to-[#40d3f4]"
										loadingText="Sending..."
										isLoading={isSending}
									>
										<Send className="mr-2 h-4 w-4" /> Send Message
									</LoadingButton>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
