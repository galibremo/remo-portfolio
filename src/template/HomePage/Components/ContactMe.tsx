"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Mail, Phone, Send } from "lucide-react";
import { easeOut } from "motion/react";
import * as motion from "motion/react-client";
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

const fadeInVariants = {
	hidden: {
		opacity: 0,
		x: 30
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: easeOut
		}
	}
};

// Form animation with slight scale effect
const formVariants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
		x: 30
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: 0,
		transition: {
			duration: 0.8,
			ease: easeOut
		}
	}
};

const socialLinkVariants = {
	hidden: {
		opacity: 0,
		scale: 0.8
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: easeOut
		}
	}
};

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
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", bounce: 0.7, stiffness: 400, damping: 10, duration: 0.8 }}
					viewport={{ once: true, amount: "all" }}
				>
					<h1 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">Contact Me</h1>
					<span className="block text-center text-xs sm:text-sm md:text-base">Open to work</span>
				</motion.div>
				<div className="mt-6 mb-4 flex flex-col items-center justify-center gap-6 md:mt-12 md:mb-6 md:flex-row md:gap-14 overflow-hidden">
					<div className="w-full space-y-4 md:space-y-6">
						<motion.span
							variants={fadeInVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.8 }}
							className="block text-2xl font-semibold md:text-3xl"
						>
							I love to hear from you!
						</motion.span>
						<motion.p
							variants={fadeInVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.6 }}
							className="text-sm md:text-lg"
						>
							I&apos;m always interested in hearing about new projects and opportunities. Whether
							you have a question or just want to say hello, I&apos;ll do my best to get back to you
							as soon as possible.
						</motion.p>
						<div className="flex flex-col gap-4">
							<motion.div
								className="flex items-center gap-4"
								variants={socialLinkVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								<Mail />
								<span>galibremo@gmail.com</span>
							</motion.div>
							<motion.div
								className="flex items-center gap-4"
								variants={socialLinkVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								<Github />
								<span>galibremo</span>
							</motion.div>
							<motion.div
								className="flex items-center gap-4"
								variants={socialLinkVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								<Phone />
								<span>+8801744716387</span>
							</motion.div>
						</div>
					</div>
					<motion.div
						className="w-full"
						variants={formVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.8 }}
					>
						<Card className="rounded-md">
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
					</motion.div>
				</div>
			</div>
		</section>
	);
}
