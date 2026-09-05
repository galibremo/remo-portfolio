"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { useExperienceCrud } from "@/hooks/consume_api/mutation/useCollectionCrud";
import {
	ExperienceSchema,
	type ExperienceSchemaType
} from "@/modules/Experience/Validators/Experience.schema";
import { ConfirmDeleteDialog } from "@/template/Dashboard/shared/ConfirmDeleteDialog";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";
import { ImageUploadField } from "@/template/Dashboard/shared/ImageUploadField";
import { StringListInput } from "@/template/Dashboard/shared/StringListInput";
import { VisibilityToggleButton } from "@/template/Dashboard/shared/VisibilityToggleButton";
import {
	type DeferredUploadHandle,
	commitDeferredUpload
} from "@/template/Dashboard/shared/deferredUpload";

const emptyValues: ExperienceSchemaType = {
	title: "",
	company: "",
	duration: "",
	description: "",
	image: "",
	technologies: [],
	isHidden: false,
	sortOrder: 0
};

export default function ExperienceTemplate() {
	const { items, isLoading, createAsync, updateAsync, deleteAsync, isSaving, isDeleting } =
		useExperienceCrud();
	const imageRef = useRef<DeferredUploadHandle>(null);
	const [isCommitting, setIsCommitting] = useState(false);
	const isBusy = isSaving || isCommitting;
	const [open, setOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const { control, handleSubmit, reset, setValue } = useForm<ExperienceSchemaType>({
		resolver: zodResolver(ExperienceSchema),
		defaultValues: emptyValues,
		mode: "onChange"
	});

	useEffect(() => {
		if (!open) {
			setEditingId(null);
			reset(emptyValues);
		}
	}, [open, reset]);

	const onSubmit = async (data: ExperienceSchemaType) => {
		setIsCommitting(true);
		try {
			const image = (await commitDeferredUpload(imageRef, data.image)) ?? "";
			const payload = { ...data, image };
			if (editingId) await updateAsync({ id: editingId, data: payload });
			else await createAsync(payload);
			setOpen(false);
		} catch {
			// Upload errors are shown on the field
		} finally {
			setIsCommitting(false);
		}
	};

	return (
		<div>
			<DashboardPageHeader
				title="Experience"
				description="Manage professional experience entries."
				actions={
					<Button
						onClick={() => {
							setEditingId(null);
							reset(emptyValues);
							setOpen(true);
						}}
					>
						<Plus className="mr-2 size-4" />
						Add experience
					</Button>
				}
			/>
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Company</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Order</TableHead>
							<TableHead className="w-36">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5}>Loading...</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5}>No experience entries yet.</TableCell>
							</TableRow>
						) : (
							items.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.company}</TableCell>
									<TableCell>{item.duration}</TableCell>
									<TableCell>{item.sortOrder}</TableCell>
									<TableCell className="flex gap-1">
										<VisibilityToggleButton
											isHidden={item.isHidden}
											disabled={isBusy}
											onToggle={() =>
												updateAsync({
													id: item.id,
													data: {
														title: item.title,
														company: item.company,
														duration: item.duration,
														description: item.description,
														image: item.image,
														technologies: item.technologies ?? [],
														isHidden: !item.isHidden,
														sortOrder: item.sortOrder
													}
												})
											}
										/>
										<Button
											size="icon"
											variant="ghost"
											onClick={() => {
												setEditingId(item.id);
												reset({
													title: item.title,
													company: item.company,
													duration: item.duration,
													description: item.description,
													image: item.image,
													technologies: item.technologies ?? [],
													isHidden: item.isHidden,
													sortOrder: item.sortOrder
												});
												setOpen(true);
											}}
										>
											<Pencil className="size-4" />
										</Button>
										<Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)}>
											<Trash2 className="size-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>{editingId ? "Edit experience" : "Add experience"}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col gap-4">
						<DialogBody className="space-y-4 pr-1">
						{(
							[
								["title", "Title"],
								["company", "Company"],
								["duration", "Duration"]
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
											<Input id={name} className="ring-0!" {...field} disabled={isBusy} />
											<FieldError>{fieldState.error?.message}</FieldError>
										</FieldContent>
									</Field>
								)}
							/>
						))}
						<Controller
							name="description"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<FieldContent>
										<Textarea id="description" rows={4} className="ring-0!" {...field} disabled={isBusy} />
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
											ref={imageRef}
											value={field.value}
											onChange={url =>
												setValue("image", url ?? "", {
													shouldDirty: true,
													shouldValidate: true
												})
											}
											folder="experience"
											disabled={isBusy}
										/>
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
						<Controller
							name="technologies"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel>Technologies</FieldLabel>
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
							name="sortOrder"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
									<FieldContent>
										<Input
											id="sortOrder"
											type="number"
											className="ring-0!"
											value={field.value ?? 0}
											onChange={event => field.onChange(Number(event.target.value))}
											disabled={isBusy}
										/>
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
						</DialogBody>
						<DialogFooter>
							<Button type="button" variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" disabled={isBusy}>
								{isBusy ? "Saving..." : "Save"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={openState => !openState && setDeleteId(null)}
				isLoading={isDeleting}
				onConfirm={async () => {
					if (deleteId) await deleteAsync(deleteId);
					setDeleteId(null);
				}}
			/>
		</div>
	);
}
