"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { deleteImage, formatFileSize, uploadImage, validateImageFile } from "@/lib/supabaseStorage";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { HeroSchema, type HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";

export default function HeroSectionTemplate() {
	const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);
	const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
	const [backgroundImageUploading, setBackgroundImageUploading] = useState(false);
	const [profileImageUploading, setProfileImageUploading] = useState(false);
	const [uploadErrors, setUploadErrors] = useState<{
		backgroundImage?: string;
		profileImage?: string;
	}>({});

	const form = useForm<HeroSchemaType>({
		resolver: zodResolver(HeroSchema),
		defaultValues: {
			name: "",
			description: "",
			backgroundImage: null,
			profileImage: null
		},
		mode: "onChange"
	});

	const onSubmit = async (data: HeroSchemaType) => {
		console.log("Form submitted with data:", data);
	};

	const handleBackgroundImageUpload = async (file: File | null) => {
		if (!file) {
			setBackgroundImageFile(null);
			form.setValue("backgroundImage", null);
			return;
		}

		// Validate file
		const validation = validateImageFile(file);
		if (!validation.isValid) {
			setUploadErrors(prev => ({ ...prev, backgroundImage: validation.error }));
			return;
		}

		// Clear previous errors
		setUploadErrors(prev => ({ ...prev, backgroundImage: undefined }));
		setBackgroundImageFile(file);
		setBackgroundImageUploading(true);

		try {
			const result = await uploadImage(file, "hero");

			if (result.success && result.url) {
				form.setValue("backgroundImage", result.url);
				console.log("Background image uploaded successfully:", result.url);
			} else {
				setUploadErrors(prev => ({
					...prev,
					backgroundImage: result.error || "Upload failed"
				}));
			}
		} catch (error) {
			setUploadErrors(prev => ({
				...prev,
				backgroundImage: "Upload failed. Please try again."
			}));
		} finally {
			setBackgroundImageUploading(false);
		}
	};

	const handleProfileImageUpload = async (file: File | null) => {
		if (!file) {
			setProfileImageFile(null);
			form.setValue("profileImage", null);
			return;
		}

		// Validate file
		const validation = validateImageFile(file);
		if (!validation.isValid) {
			setUploadErrors(prev => ({ ...prev, profileImage: validation.error }));
			return;
		}

		// Clear previous errors
		setUploadErrors(prev => ({ ...prev, profileImage: undefined }));
		setProfileImageFile(file);
		setProfileImageUploading(true);

		try {
			const result = await uploadImage(file, "hero");

			if (result.success && result.url) {
				form.setValue("profileImage", result.url);
				console.log("Profile image uploaded successfully:", result.url);
			} else {
				setUploadErrors(prev => ({
					...prev,
					profileImage: result.error || "Upload failed"
				}));
			}
		} catch (error) {
			setUploadErrors(prev => ({
				...prev,
				profileImage: "Upload failed. Please try again."
			}));
		} finally {
			setProfileImageUploading(false);
		}
	};

	const handleDeleteImage = async (imageType: "background" | "profile") => {
		const currentUrl =
			imageType === "background"
				? form.getValues("backgroundImage")
				: form.getValues("profileImage");

		if (!currentUrl) return;

		try {
			const result = await deleteImage(currentUrl);
			if (result.success) {
				if (imageType === "background") {
					form.setValue("backgroundImage", null);
					setBackgroundImageFile(null);
				} else {
					form.setValue("profileImage", null);
					setProfileImageFile(null);
				}
				console.log(`${imageType} image deleted successfully`);
			} else {
				console.error(`Failed to delete ${imageType} image:`, result.error);
			}
		} catch (error) {
			console.error(`Error deleting ${imageType} image:`, error);
		}
	};

	return (
		<div className="container mx-auto max-w-2xl py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Update Hero Section</h1>
				<p className="text-muted-foreground mt-2">
					Manage your portfolio hero section content and images.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your full name" {...field} />
								</FormControl>
								<FormDescription>
									This will be displayed as your main name in the hero section.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter your professional description or tagline"
										className="min-h-24"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									A brief description about yourself that will appear in the hero section.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="backgroundImage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<div className="space-y-4">
										<Input
											type="file"
											accept="image/*"
											onChange={e => {
												const file = e.target.files?.[0] || null;
												handleBackgroundImageUpload(file);
											}}
											disabled={backgroundImageUploading}
										/>
										{backgroundImageUploading && (
											<div className="text-sm text-blue-600">Uploading background image...</div>
										)}
										{uploadErrors.backgroundImage && (
											<div className="text-sm text-red-600">{uploadErrors.backgroundImage}</div>
										)}
										{field.value && !backgroundImageUploading && (
											<div className="flex items-center justify-between rounded border bg-green-50 p-2">
												<div className="text-sm text-green-700">
													✓ Background image uploaded successfully
												</div>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleDeleteImage("background")}
													className="text-red-600 hover:bg-red-50 hover:text-red-700"
												>
													Delete
												</Button>
											</div>
										)}
										{backgroundImageFile && (
											<div className="text-muted-foreground text-sm">
												Selected: {backgroundImageFile.name} (
												{formatFileSize(backgroundImageFile.size)})
											</div>
										)}
									</div>
								</FormControl>
								<FormDescription>
									Upload a background image for your hero section (Max: 2MB, formats: JPEG, PNG).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="profileImage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Profile Image</FormLabel>
								<FormControl>
									<div className="space-y-4">
										<Input
											type="file"
											accept="image/*"
											onChange={e => {
												const file = e.target.files?.[0] || null;
												handleProfileImageUpload(file);
											}}
											disabled={profileImageUploading}
										/>
										{profileImageUploading && (
											<div className="text-sm text-blue-600">Uploading profile image...</div>
										)}
										{uploadErrors.profileImage && (
											<div className="text-sm text-red-600">{uploadErrors.profileImage}</div>
										)}
										{field.value && !profileImageUploading && (
											<div className="flex items-center justify-between rounded border bg-green-50 p-2">
												<div className="text-sm text-green-700">
													✓ Profile image uploaded successfully
												</div>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleDeleteImage("profile")}
													className="text-red-600 hover:bg-red-50 hover:text-red-700"
												>
													Delete
												</Button>
											</div>
										)}
										{profileImageFile && (
											<div className="text-muted-foreground text-sm">
												Selected: {profileImageFile.name} ({formatFileSize(profileImageFile.size)})
											</div>
										)}
									</div>
								</FormControl>
								<FormDescription>
									Upload your profile image for the hero section (Max: 2MB, formats: JPEG, PNG).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex gap-4 pt-4">
						<Button
							type="submit"
							disabled={
								form.formState.isSubmitting || backgroundImageUploading || profileImageUploading
							}
							className="flex-1"
						>
							{form.formState.isSubmitting
								? "Updating..."
								: backgroundImageUploading || profileImageUploading
									? "Uploading images..."
									: "Update Hero Section"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								form.reset();
								setBackgroundImageFile(null);
								setProfileImageFile(null);
								setUploadErrors({});
							}}
							disabled={
								form.formState.isSubmitting || backgroundImageUploading || profileImageUploading
							}
						>
							Reset
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
