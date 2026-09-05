"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

import { useEducationCrud } from "@/hooks/consume_api/mutation/useCollectionCrud";
import {
	EducationSchema,
	type EducationSchemaType
} from "@/modules/Education/Validators/Education.schema";
import { ConfirmDeleteDialog } from "@/template/Dashboard/shared/ConfirmDeleteDialog";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";
import { VisibilityToggleButton } from "@/template/Dashboard/shared/VisibilityToggleButton";

const emptyValues: EducationSchemaType = {
	title: "",
	fullTitle: "",
	institution: "",
	date: "",
	major: "",
	cgpa: "",
	location: "",
	isHighlight: false,
	isHidden: false,
	sortOrder: 0
};

export default function EducationTemplate() {
	const { items, isLoading, createAsync, updateAsync, deleteAsync, isSaving, isDeleting } =
		useEducationCrud();
	const [open, setOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const { control, handleSubmit, reset } = useForm<EducationSchemaType>({
		resolver: zodResolver(EducationSchema),
		defaultValues: emptyValues,
		mode: "onChange"
	});

	useEffect(() => {
		if (!open) {
			setEditingId(null);
			reset(emptyValues);
		}
	}, [open, reset]);

	const openCreate = () => {
		setEditingId(null);
		reset(emptyValues);
		setOpen(true);
	};

	const openEdit = (item: EducationSchemaType & { id: number; isHidden: boolean }) => {
		setEditingId(item.id);
		reset({
			title: item.title,
			fullTitle: item.fullTitle,
			institution: item.institution,
			date: item.date,
			major: item.major ?? "",
			cgpa: item.cgpa ?? "",
			location: item.location,
			isHighlight: item.isHighlight,
			isHidden: item.isHidden,
			sortOrder: item.sortOrder
		});
		setOpen(true);
	};

	const onSubmit = async (data: EducationSchemaType) => {
		if (editingId) await updateAsync({ id: editingId, data });
		else await createAsync(data);
		setOpen(false);
	};

	return (
		<div>
			<DashboardPageHeader
				title="Education"
				description="Manage education timeline entries."
				actions={
					<Button onClick={openCreate}>
						<Plus className="mr-2 size-4" />
						Add education
					</Button>
				}
			/>

			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Institution</TableHead>
							<TableHead>Date</TableHead>
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
								<TableCell colSpan={5}>No education entries yet.</TableCell>
							</TableRow>
						) : (
							items.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.institution}</TableCell>
									<TableCell>{item.date}</TableCell>
									<TableCell>{item.sortOrder}</TableCell>
									<TableCell className="flex gap-1">
										<VisibilityToggleButton
											isHidden={item.isHidden}
											disabled={isSaving}
											onToggle={() =>
												updateAsync({
													id: item.id,
													data: {
														title: item.title,
														fullTitle: item.fullTitle,
														institution: item.institution,
														date: item.date,
														major: item.major ?? "",
														cgpa: item.cgpa ?? "",
														location: item.location,
														isHighlight: item.isHighlight,
														isHidden: !item.isHidden,
														sortOrder: item.sortOrder
													}
												})
											}
										/>
										<Button size="icon" variant="ghost" onClick={() => openEdit(item)}>
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
						<DialogTitle>{editingId ? "Edit education" : "Add education"}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col gap-4">
						<DialogBody className="space-y-4 pr-1">
						{(
							[
								["title", "Title"],
								["fullTitle", "Full title"],
								["institution", "Institution"],
								["date", "Date"],
								["major", "Major"],
								["cgpa", "CGPA"],
								["location", "Location"]
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
											<Input id={name} className="ring-0!" {...field} value={field.value ?? ""} disabled={isSaving} />
											<FieldError>{fieldState.error?.message}</FieldError>
										</FieldContent>
									</Field>
								)}
							/>
						))}
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
											disabled={isSaving}
										/>
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
						<Controller
							name="isHighlight"
							control={control}
							render={({ field, fieldState }) => (
								<Field orientation="horizontal" data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="isHighlight">Highlight</FieldLabel>
									<FieldContent>
										<Switch
											id="isHighlight"
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={isSaving}
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
							<Button type="submit" disabled={isSaving}>
								{isSaving ? "Saving..." : "Save"}
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
