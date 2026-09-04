"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useUpdateAboutSection from "@/hooks/consume_api/mutation/useUpdateAboutSection";
import useGetAboutSection from "@/hooks/consume_api/query/useGetAboutSection";
import { AboutSchema, type AboutSchemaType } from "@/modules/About/Validators/About.schema";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";
import { FileUploadField } from "@/template/Dashboard/shared/FileUploadField";
import { ImageUploadField } from "@/template/Dashboard/shared/ImageUploadField";

export default function AboutSectionTemplate() {
	const { aboutSection } = useGetAboutSection();
	const { updateAboutSectionAsync, isUpdateAboutSectionLoading } = useUpdateAboutSection();

	const { control, handleSubmit, reset, setValue } = useForm<AboutSchemaType>({
		resolver: zodResolver(AboutSchema),
		defaultValues: {
			heading: "",
			paragraphOne: "",
			paragraphTwo: "",
			image: "",
			resumeUrl: "",
			socialLinks: {
				facebook: "",
				instagram: "",
				linkedin: "",
				email: ""
			}
		},
		mode: "onChange"
	});

	useEffect(() => {
		if (!aboutSection) return;
		reset({
			heading: aboutSection.heading ?? "",
			paragraphOne: aboutSection.paragraphOne ?? "",
			paragraphTwo: aboutSection.paragraphTwo ?? "",
			image: aboutSection.image ?? "",
			resumeUrl: aboutSection.resumeUrl ?? "",
			socialLinks: {
				facebook: aboutSection.socialLinks?.facebook ?? "",
				instagram: aboutSection.socialLinks?.instagram ?? "",
				linkedin: aboutSection.socialLinks?.linkedin ?? "",
				email: aboutSection.socialLinks?.email ?? ""
			}
		});
	}, [aboutSection, reset]);

	const onSubmit = async (data: AboutSchemaType) => {
		await updateAboutSectionAsync(data);
	};

	return (
		<div className="p-4 md:p-6">
			<DashboardPageHeader
				title="About Section"
				description="Manage the about me content and social links."
			/>
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-5">
				<Controller
					name="heading"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="about-heading">Heading</FieldLabel>
							<FieldContent>
								<Input id="about-heading" {...field} disabled={isUpdateAboutSectionLoading} />
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="paragraphOne"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="about-p1">Paragraph one</FieldLabel>
							<FieldContent>
								<Textarea id="about-p1" rows={4} {...field} disabled={isUpdateAboutSectionLoading} />
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="paragraphTwo"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="about-p2">Paragraph two</FieldLabel>
							<FieldContent>
								<Textarea id="about-p2" rows={4} {...field} disabled={isUpdateAboutSectionLoading} />
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="image"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Image</FieldLabel>
							<FieldContent>
								<ImageUploadField
									value={field.value}
									onChange={url =>
										setValue("image", url ?? "", { shouldDirty: true, shouldValidate: true })
									}
									folder="about"
									disabled={isUpdateAboutSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="resumeUrl"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Resume PDF</FieldLabel>
							<FieldContent>
								<FileUploadField
									value={field.value}
									onChange={url =>
										setValue("resumeUrl", url, { shouldDirty: true, shouldValidate: true })
									}
									folder="documents"
									disabled={isUpdateAboutSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				{(
					[
						["socialLinks.facebook", "Facebook URL"],
						["socialLinks.instagram", "Instagram URL"],
						["socialLinks.linkedin", "LinkedIn URL"],
						["socialLinks.email", "Email link"]
					] as const
				).map(([name, label]) => (
					<Controller
						key={name}
						name={name}
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid || undefined}>
								<FieldLabel htmlFor={name}>{label}</FieldLabel>
								<FieldContent>
									<Input
										id={name}
										{...field}
										value={field.value ?? ""}
										disabled={isUpdateAboutSectionLoading}
									/>
									<FieldError>{fieldState.error?.message}</FieldError>
								</FieldContent>
							</Field>
						)}
					/>
				))}
				<Button type="submit" disabled={isUpdateAboutSectionLoading}>
					{isUpdateAboutSectionLoading ? "Saving..." : "Save about section"}
				</Button>
			</form>
		</div>
	);
}
