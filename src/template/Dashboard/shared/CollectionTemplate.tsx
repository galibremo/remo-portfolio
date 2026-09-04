"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { ComponentType, ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { ConfirmDeleteDialog } from "@/template/Dashboard/shared/ConfirmDeleteDialog";
import { DashboardPageHeader } from "@/template/Dashboard/shared/DashboardPageHeader";

export type CollectionItem = { id: number };

export type CollectionFormProps<TItem extends CollectionItem, TValues> = {
	item: TItem | null;
	onSubmit: (values: TValues) => Promise<unknown>;
	onCancel: () => void;
	isSaving: boolean;
};

type CollectionTemplateProps<TItem extends CollectionItem, TValues> = {
	title: string;
	description: string;
	itemName: string;
	items: TItem[];
	isLoading: boolean;
	isSaving: boolean;
	isDeleting: boolean;
	columns: string[];
	renderCells: (item: TItem) => ReactNode;
	form: ComponentType<CollectionFormProps<TItem, TValues>>;
	onCreate: (values: TValues) => Promise<unknown>;
	onUpdate: (id: number, values: TValues) => Promise<unknown>;
	onDelete: (id: number) => Promise<unknown>;
};

export function CollectionTemplate<TItem extends CollectionItem, TValues>({
	title,
	description,
	itemName,
	items,
	isLoading,
	isSaving,
	isDeleting,
	columns,
	renderCells,
	form: FormComponent,
	onCreate,
	onUpdate,
	onDelete
}: CollectionTemplateProps<TItem, TValues>) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<TItem | null>(null);
	const [deleteItem, setDeleteItem] = useState<TItem | null>(null);

	const openCreate = () => {
		setEditingItem(null);
		setDialogOpen(true);
	};

	const openEdit = (item: TItem) => {
		setEditingItem(item);
		setDialogOpen(true);
	};

	const save = async (values: TValues) => {
		if (editingItem) await onUpdate(editingItem.id, values);
		else await onCreate(values);
		setDialogOpen(false);
	};

	return (
		<div className="p-6">
			<DashboardPageHeader
				title={title}
				description={description}
				actions={<Button onClick={openCreate}><Plus /> Add {itemName}</Button>}
			/>
			<div className="rounded-xl border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map(column => <TableHead key={column}>{column}</TableHead>)}
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow><TableCell colSpan={columns.length + 1}>Loading...</TableCell></TableRow>
						) : items.length === 0 ? (
							<TableRow><TableCell colSpan={columns.length + 1}>No {itemName.toLowerCase()} entries yet.</TableCell></TableRow>
						) : items.map(item => (
							<TableRow key={item.id}>
								{renderCells(item)}
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button size="icon-sm" variant="outline" onClick={() => openEdit(item)} aria-label={`Edit ${itemName}`}><Pencil /></Button>
										<Button size="icon-sm" variant="destructive" onClick={() => setDeleteItem(item)} aria-label={`Delete ${itemName}`}><Trash2 /></Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
					<DialogHeader>
						<DialogTitle>{editingItem ? "Edit" : "Add"} {itemName}</DialogTitle>
						<DialogDescription>Complete the fields below and save your changes.</DialogDescription>
					</DialogHeader>
					<FormComponent item={editingItem} onSubmit={save} onCancel={() => setDialogOpen(false)} isSaving={isSaving} />
				</DialogContent>
			</Dialog>
			<ConfirmDeleteDialog
				open={Boolean(deleteItem)}
				onOpenChange={open => { if (!open) setDeleteItem(null); }}
				title={`Delete ${itemName.toLowerCase()}?`}
				onConfirm={async () => {
					if (!deleteItem) return;
					await onDelete(deleteItem.id);
					setDeleteItem(null);
				}}
				isLoading={isDeleting}
			/>
		</div>
	);
}
