"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
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
import {
	type DeferredUploadHandle,
	commitDeferredUpload
} from "@/template/Dashboard/shared/deferredUpload";

export default function HeroSectionTemplate() {
	const { heroSection } = useGetHeroSection();
	const { updateHeroSectionAsync, isUpdateHeroSectionLoading } = useUpdateHeroSection();
	const backgroundImageRef = useRef<DeferredUploadHandle>(null);
	const profileImageRef = useRef<DeferredUploadHandle>(null);
	const [isCommitting, setIsCommitting] = useState(false);
	const isBusy = isUpdateHeroSectionLoading || isCommitting;

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
		setIsCommitting(true);
		try {
			const backgroundImage = await commitDeferredUpload(backgroundImageRef, data.backgroundImage);
			const profileImage = await commitDeferredUpload(profileImageRef, data.profileImage);
			await updateHeroSectionAsync({ ...data, backgroundImage, profileImage });
		} catch {
			// Upload errors are shown on the field
		} finally {
			setIsCommitting(false);
		}
	};

	return (
		<div>
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
								<Input id="hero-name" className="ring-0!" {...field} disabled={isBusy} />
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
								<Input id="hero-badge" className="ring-0!" {...field} value={field.value ?? ""} disabled={isBusy} />
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
								<Textarea id="hero-description" className="ring-0!" {...field} rows={4} disabled={isBusy} />
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
									disabled={isBusy}
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
									ref={backgroundImageRef}
									value={field.value}
									onChange={url =>
										setValue("backgroundImage", url, {
											shouldDirty: true,
											shouldValidate: true
										})
									}
									folder="hero"
									disabled={isBusy}
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
									ref={profileImageRef}
									value={field.value}
									onChange={url =>
										setValue("profileImage", url, {
											shouldDirty: true,
											shouldValidate: true
										})
									}
									folder="hero"
									disabled={isBusy}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Button type="submit" disabled={isBusy}>
					{isBusy ? "Saving..." : "Save hero section"}
				</Button>
			</form>
		</div>
	);
}
