"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "hugeicons-react";
import { Mail, MessageSquare, Phone, Send, type LucideIcon } from "lucide-react";
import * as motion from "motion/react-client";
import type { ComponentType } from "react";
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

import { ContactInfoType } from "@/database/adapters/Drizzle/DrizzleSchemaTypes";

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

type ContactIcon = LucideIcon | ComponentType<{ size?: number }>;

const contactTypeMeta: Record<
	string,
	{ Icon: ContactIcon; hoverBorder: string }
> = {
	email: {
		Icon: Mail,
		hoverBorder: "hover:border-red-500/40 hover:shadow-red-500/10"
	},
	github: {
		Icon: GithubIcon,
		hoverBorder: "hover:border-purple-500/40 hover:shadow-purple-500/10"
	},
	phone: {
		Icon: Phone,
		hoverBorder: "hover:border-cyan-500/40 hover:shadow-cyan-500/10"
	}
};

const defaultHover = "hover:border-purple-500/40 hover:shadow-purple-500/10";

type ContactMeProps = {
	cards: ContactInfoType[];
};

export default function ContactMe({ cards }: ContactMeProps) {
	const [isSending, setIsSending] = useState(false);
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: ""
		}
	});

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
		<section id="contactme" className="relative bg-muted/30 py-12 md:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12 text-center md:mb-16"
				>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
						<MessageSquare size={14} className="text-purple-500" />
						Let&apos;s Connect
					</div>
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Contact{" "}
						<span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
							Me
						</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-6 md:col-span-5"
					>
						<div className="space-y-3">
							<h3 className="text-2xl font-bold text-foreground">I love to hear from you!</h3>
							<p className="text-sm leading-relaxed font-normal text-muted-foreground md:text-base">
								I&apos;m always interested in hearing about new projects, engineering roles, and
								creative ideas. Reach out and I&apos;ll get back to you as soon as possible.
							</p>
						</div>

						{cards.length > 0 ? (
							<div className="space-y-3 pt-2">
								{cards.map(card => {
									const meta = contactTypeMeta[card.type];
									const Icon = meta?.Icon ?? Mail;
									const hoverBorder = meta?.hoverBorder ?? defaultHover;
									const href = card.href ?? "#";

									return (
										<a
											key={card.id}
											href={href}
											target={href.startsWith("http") ? "_blank" : undefined}
											rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
											className={`group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-xs transition-all duration-300 hover:scale-[1.02] ${hoverBorder}`}
										>
											<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-colors duration-300 group-hover:bg-purple-600 group-hover:text-white">
												<Icon size={20} />
											</div>
											<div>
												<span className="block text-xs font-medium text-muted-foreground">
													{card.title}
												</span>
												<span className="text-sm font-semibold text-foreground transition-colors group-hover:text-purple-400">
													{card.value}
												</span>
											</div>
										</a>
									);
								})}
							</div>
						) : null}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="md:col-span-7"
					>
						<Card className="glass-card-light overflow-hidden rounded-3xl border border-border/60 p-2 shadow-xl sm:p-4">
							<CardHeader className="pb-4 text-left">
								<CardTitle className="text-xl font-bold">Send Me a Message</CardTitle>
								<CardDescription className="text-xs sm:text-sm">
									Fill out the form below and I&apos;ll respond shortly.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
											className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 py-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] hover:shadow-cyan-500/30"
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
