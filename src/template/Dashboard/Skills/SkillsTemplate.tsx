"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

import { useSkillsCrud } from "@/hooks/consume_api/mutation/useCollectionCrud";
import { SkillSchema, type SkillSchemaType } from "@/modules/Skills/Validators/Skill.schema";
import { ConfirmDeleteDialog } from "@/template/Dashboard/shared/ConfirmDeleteDialog";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";

const emptyValues: SkillSchemaType = {
	name: "",
	category: "frontend",
	proficiency: 0,
	sortOrder: 0
};

export default function SkillsTemplate() {
	const { items, isLoading, createAsync, updateAsync, deleteAsync, isSaving, isDeleting } =
		useSkillsCrud();
	const [open, setOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const { control, handleSubmit, reset } = useForm<SkillSchemaType>({
		resolver: zodResolver(SkillSchema),
		defaultValues: emptyValues,
		mode: "onChange"
	});

	useEffect(() => {
		if (!open) {
			setEditingId(null);
			reset(emptyValues);
		}
	}, [open, reset]);

	const onSubmit = async (data: SkillSchemaType) => {
		if (editingId) await updateAsync({ id: editingId, data });
		else await createAsync(data);
		setOpen(false);
	};

	return (
		<div>
			<DashboardPageHeader
				title="Skills"
				description="Manage frontend and backend skill proficiency."
				actions={
					<Button
						onClick={() => {
							setEditingId(null);
							reset(emptyValues);
							setOpen(true);
						}}
					>
						<Plus className="mr-2 size-4" />
						Add skill
					</Button>
				}
			/>
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Proficiency</TableHead>
							<TableHead>Order</TableHead>
							<TableHead className="w-28">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5}>Loading...</TableCell>
							</TableRow>
						) : items.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5}>No skills yet.</TableCell>
							</TableRow>
						) : (
							items.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.category}</TableCell>
									<TableCell>{item.proficiency}</TableCell>
									<TableCell>{item.sortOrder}</TableCell>
									<TableCell className="flex gap-1">
										<Button
											size="icon"
											variant="ghost"
											onClick={() => {
												setEditingId(item.id);
												reset({
													name: item.name,
													category: item.category,
													proficiency: item.proficiency,
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
						<DialogTitle>{editingId ? "Edit skill" : "Add skill"}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="name">Name</FieldLabel>
									<FieldContent>
										<Input id="name" {...field} disabled={isSaving} />
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
						<Controller
							name="category"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel>Category</FieldLabel>
									<FieldContent>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={isSaving}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="frontend">Frontend</SelectItem>
												<SelectItem value="backend">Backend</SelectItem>
											</SelectContent>
										</Select>
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
						<Controller
							name="proficiency"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="proficiency">Proficiency (0-100)</FieldLabel>
									<FieldContent>
										<Input
											id="proficiency"
											type="number"
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
							name="sortOrder"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
									<FieldContent>
										<Input
											id="sortOrder"
											type="number"
											value={field.value ?? 0}
											onChange={event => field.onChange(Number(event.target.value))}
											disabled={isSaving}
										/>
										<FieldError>{fieldState.error?.message}</FieldError>
									</FieldContent>
								</Field>
							)}
						/>
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
