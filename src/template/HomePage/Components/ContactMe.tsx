"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "hugeicons-react";
import { Mail, MessageSquare, Phone, Send, Sparkles } from "lucide-react";
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

	const contactCards = [
		{
			title: "Email",
			value: "galibremo@gmail.com",
			Icon: Mail,
			href: "mailto:galibremo@gmail.com",
			hoverBorder: "hover:border-red-500/40 hover:shadow-red-500/10"
		},
		{
			title: "GitHub",
			value: "galibremo",
			Icon: GithubIcon,
			href: "https://github.com/galibremo",
			hoverBorder: "hover:border-purple-500/40 hover:shadow-purple-500/10"
		},
		{
			title: "Phone / WhatsApp",
			value: "+8801744716387",
			Icon: Phone,
			href: "https://wa.me/+8801744716387",
			hoverBorder: "hover:border-cyan-500/40 hover:shadow-cyan-500/10"
		}
	];

	return (
		<section id="contactme" className="relative py-12 md:py-24 bg-muted/30">
			<div className="mx-auto max-w-6xl px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
						<MessageSquare size={14} className="text-purple-500" />
						Let&apos;s Connect
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Contact <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Me</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					{/* Left Info Column */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="md:col-span-5 space-y-6"
					>
						<div className="space-y-3">
							<h3 className="text-2xl font-bold text-foreground">
								I love to hear from you!
							</h3>
							<p className="text-sm md:text-base text-muted-foreground font-normal leading-relaxed">
								I&apos;m always interested in hearing about new projects, engineering roles, and creative ideas. Reach out and I&apos;ll get back to you as soon as possible.
							</p>
						</div>

						{/* Contact Detail Cards */}
						<div className="space-y-3 pt-2">
							{contactCards.map(({ title, value, Icon, href, hoverBorder }) => (
								<a
									key={title}
									href={href}
									target={href.startsWith("http") ? "_blank" : undefined}
									rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
									className={`flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-all duration-300 hover:scale-[1.02] shadow-xs group ${hoverBorder}`}
								>
									<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
										<Icon size={20} />
									</div>
									<div>
										<span className="block text-xs text-muted-foreground font-medium">{title}</span>
										<span className="text-sm font-semibold text-foreground group-hover:text-purple-400 transition-colors">
											{value}
										</span>
									</div>
								</a>
							))}
						</div>
					</motion.div>

					{/* Right Form Column */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="md:col-span-7"
					>
						<Card className="glass-card-light rounded-3xl border border-border/60 shadow-xl overflow-hidden p-2 sm:p-4">
							<CardHeader className="text-left pb-4">
								<CardTitle className="text-xl font-bold">Send Me a Message</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Fill out the form below and I&apos;ll respond shortly.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-xs font-semibold">Name</FormLabel>
														<FormControl>
															<Input
																placeholder="Your name..."
																className="rounded-xl border-border/60 bg-background/50 focus-visible:ring-purple-500"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-xs font-semibold">Email</FormLabel>
														<FormControl>
															<Input
																placeholder="Your email..."
																type="email"
																className="rounded-xl border-border/60 bg-background/50 focus-visible:ring-purple-500"
																{...field}
															/>
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
													<FormLabel className="text-xs font-semibold">Message</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Tell me about your project or opportunity..."
															className="h-32 resize-none rounded-xl border-border/60 bg-background/50 focus-visible:ring-purple-500"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<LoadingButton
											className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 py-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-cyan-500/30 hover:scale-[1.01] transition-all cursor-pointer"
											loadingText="Sending Message..."
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

