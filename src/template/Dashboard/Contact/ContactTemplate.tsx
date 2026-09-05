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
import { Textarea } from "@/components/ui/textarea";

import { useContactCrud } from "@/hooks/consume_api/mutation/useCollectionCrud";
import useUpdateContactSection from "@/hooks/consume_api/mutation/useUpdateContactSection";
import useGetContactSection from "@/hooks/consume_api/query/useGetContactSection";
import { ContactSchema, type ContactSchemaType } from "@/modules/Contact/Validators/Contact.schema";
import {
	ContactSectionSchema,
	type ContactSectionSchemaType
} from "@/modules/Contact/Validators/ContactSection.schema";
import { ConfirmDeleteDialog } from "@/template/Dashboard/shared/ConfirmDeleteDialog";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";

const emptyValues: ContactSchemaType = {
	title: "",
	value: "",
	href: "",
	type: "email",
	sortOrder: 0
};

export default function ContactTemplate() {
	const { items, isLoading, createAsync, updateAsync, deleteAsync, isSaving, isDeleting } =
		useContactCrud();
	const { contactSection } = useGetContactSection();
	const { updateContactSectionAsync, isUpdateContactSectionLoading } = useUpdateContactSection();
	const [open, setOpen] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const { control, handleSubmit, reset } = useForm<ContactSchemaType>({
		resolver: zodResolver(ContactSchema),
		defaultValues: emptyValues,
		mode: "onChange"
	});
	const {
		control: introControl,
		handleSubmit: handleIntroSubmit,
		reset: resetIntro
	} = useForm<ContactSectionSchemaType>({
		resolver: zodResolver(ContactSectionSchema),
		defaultValues: {
			heading: "",
			paragraph: ""
		},
		mode: "onChange"
	});

	useEffect(() => {
		if (!contactSection) return;
		resetIntro({
			heading: contactSection.heading ?? "",
			paragraph: contactSection.paragraph ?? ""
		});
	}, [contactSection, resetIntro]);

	useEffect(() => {
		if (!open) {
			setEditingId(null);
			reset(emptyValues);
		}
	}, [open, reset]);

	const onSubmit = async (data: ContactSchemaType) => {
		if (editingId) await updateAsync({ id: editingId, data });
		else await createAsync(data);
		setOpen(false);
	};

	const onIntroSubmit = async (data: ContactSectionSchemaType) => {
		await updateContactSectionAsync(data);
	};

	return (
		<div>
			<DashboardPageHeader
				title="Contact"
				description="Manage the landing-page intro copy and contact cards."
				actions={
					<Button
						onClick={() => {
							setEditingId(null);
							reset(emptyValues);
							setOpen(true);
						}}
					>
						<Plus className="mr-2 size-4" />
						Add contact
					</Button>
				}
			/>
			<form
				onSubmit={handleIntroSubmit(onIntroSubmit)}
				className="mb-8 max-w-3xl space-y-4 rounded-lg border p-5"
			>
				<h2 className="text-sm font-semibold">Intro copy</h2>
				<Controller
					name="heading"
					control={introControl}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="contact-heading">Heading</FieldLabel>
							<FieldContent>
								<Input
									id="contact-heading"
									{...field}
									disabled={isUpdateContactSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					name="paragraph"
					control={introControl}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel htmlFor="contact-paragraph">Paragraph</FieldLabel>
							<FieldContent>
								<Textarea
									id="contact-paragraph"
									rows={4}
									{...field}
									disabled={isUpdateContactSectionLoading}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</FieldContent>
						</Field>
					)}
				/>
				<Button type="submit" disabled={isUpdateContactSectionLoading}>
					{isUpdateContactSectionLoading ? "Saving..." : "Save intro"}
				</Button>
			</form>
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Value</TableHead>
							<TableHead>Type</TableHead>
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
								<TableCell colSpan={5}>No contact cards yet.</TableCell>
							</TableRow>
						) : (
							items.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.value}</TableCell>
									<TableCell>{item.type}</TableCell>
									<TableCell>{item.sortOrder}</TableCell>
									<TableCell className="flex gap-1">
										<Button
											size="icon"
											variant="ghost"
											onClick={() => {
												setEditingId(item.id);
												reset({
													title: item.title,
													value: item.value,
													href: item.href ?? "",
													type: item.type,
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
						<DialogTitle>{editingId ? "Edit contact" : "Add contact"}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{(
							[
								["title", "Title"],
								["value", "Value"],
								["href", "Href"]
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
											<Input id={name} {...field} value={field.value ?? ""} disabled={isSaving} />
											<FieldError>{fieldState.error?.message}</FieldError>
										</FieldContent>
									</Field>
								)}
							/>
						))}
						<Controller
							name="type"
							control={control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid || undefined}>
									<FieldLabel>Type</FieldLabel>
									<FieldContent>
										<Select value={field.value} onValueChange={field.onChange} disabled={isSaving}>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="email">Email</SelectItem>
												<SelectItem value="github">GitHub</SelectItem>
												<SelectItem value="phone">Phone</SelectItem>
											</SelectContent>
										</Select>
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
