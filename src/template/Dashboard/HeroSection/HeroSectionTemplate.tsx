"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useUpdateHeroSection from "@/hooks/consume_api/mutation/useUpdateHeroSection";
import useGetHeroSection from "@/hooks/consume_api/query/useGetHeroSection";
import { HeroSchema, type HeroSchemaType } from "@/modules/Hero/Validators/Hero.schema";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";
import { ImageUploadField } from "@/template/Dashboard/shared/ImageUploadField";
import { StringListInput } from "@/template/Dashboard/shared/StringListInput";

export default function HeroSectionTemplate() {
	const { heroSection } = useGetHeroSection();
	const { updateHeroSectionAsync, isUpdateHeroSectionLoading } = useUpdateHeroSection();

	const { control, handleSubmit, reset, setValue } = useForm<HeroSchemaType>({
		resolver: zodResolver(HeroSchema),
		defaultValues: {
			name: "",
			description: "",
			statusBadge: "",
			typewriterRoles: [],
			backgroundImage: null,
			profileImage: null
		},
		mode: "onChange"
	});

	useEffect(() => {
		if (!heroSection) return;
		reset({
			name: heroSection.name ?? "",
			description: heroSection.description ?? "",
			statusBadge: heroSection.statusBadge ?? "",
			typewriterRoles: heroSection.typewriterRoles ?? [],
			backgroundImage: heroSection.backgroundImage ?? null,
			profileImage: heroSection.profileImage ?? null
		});
	}, [heroSection, reset]);

	const onSubmit = async (data: HeroSchemaType) => {
		await updateHeroSectionAsync(data);
	};

	return (
		<div className="p-4 md:p-6">
			<DashboardPageHeader
				title="Hero Section"
				description="Manage the landing page hero content."
			/>
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-5">
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="hero-name">Name</FieldLabel>
							<FieldContent>
								<Input id="hero-name" {...field} disabled={isUpdateHeroSectionLoading} />
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="statusBadge"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="hero-badge">Status badge</FieldLabel>
							<FieldContent>
								<Input
									id="hero-badge"
									{...field}
									value={field.value ?? ""}
									disabled={isUpdateHeroSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="hero-description">Description</FieldLabel>
							<FieldContent>
								<Textarea
									id="hero-description"
									{...field}
									rows={4}
									disabled={isUpdateHeroSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="typewriterRoles"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Typewriter roles</FieldLabel>
							<FieldContent>
								<StringListInput
									value={field.value ?? []}
									onChange={field.onChange}
									disabled={isUpdateHeroSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="backgroundImage"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Background image</FieldLabel>
							<FieldContent>
								<ImageUploadField
									value={field.value}
									onChange={url =>
										setValue("backgroundImage", url, {
											shouldDirty: true,
											shouldValidate: true
										})
									}
									folder="hero"
									disabled={isUpdateHeroSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="profileImage"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Profile image</FieldLabel>
							<FieldContent>
								<ImageUploadField
									value={field.value}
									onChange={url =>
										setValue("profileImage", url, {
											shouldDirty: true,
											shouldValidate: true
										})
									}
									folder="hero"
									disabled={isUpdateHeroSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Button type="submit" disabled={isUpdateHeroSectionLoading}>
					{isUpdateHeroSectionLoading ? "Saving..." : "Save hero section"}
				</Button>
			</form>
		</div>
	);
}
