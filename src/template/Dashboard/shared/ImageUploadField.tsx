"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { type Ref, useImperativeHandle } from "react";

import { replaceImage, validateImageFile } from "@/lib/supabaseStorage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	type DeferredUploadHandle,
	useDeferredUpload
} from "@/template/Dashboard/shared/deferredUpload";

type ImageUploadFieldProps = {
	ref?: Ref<DeferredUploadHandle>;
	value: string | null | undefined;
	onChange: (url: string | null) => void;
	folder?: string;
	disabled?: boolean;
	label?: string;
};

export function ImageUploadField({
	ref,
	value,
	onChange,
	folder = "uploads",
	disabled,
	label = "Image"
}: ImageUploadFieldProps) {
	const {
		pendingFile,
		displayUrl,
		uploading,
		error,
		fileInputRef,
		selectFile,
		cancelPending,
		commit
	} = useDeferredUpload({
		value,
		onChange,
		folder,
		validate: validateImageFile,
		upload: replaceImage
	});

	useImperativeHandle(ref, () => ({ commit }), [commit]);

	const isBlobPreview = Boolean(displayUrl?.startsWith("blob:"));

	return (
		<div className="space-y-2">
			{displayUrl ? (
				<div className="flex items-center gap-3">
					<div className="relative size-20 shrink-0">
						{isBlobPreview ? (
							// Blob previews are local object URLs; next/image cannot optimize them.
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={displayUrl}
								alt={label}
								className="size-20 rounded-lg border object-cover"
							/>
						) : (
							<Image
								src={displayUrl}
								alt={label}
								width={80}
								height={80}
								className="size-20 rounded-lg border object-cover"
							/>
						)}
						{pendingFile ? (
							<Button
								type="button"
								size="icon-xs"
								variant="destructive"
								className="absolute -top-2 -right-2 rounded-full"
								onClick={cancelPending}
								disabled={disabled || uploading}
								aria-label="Remove selected image"
							>
								<X />
							</Button>
						) : null}
					</div>
				</div>
			) : null}
			<Input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				disabled={disabled || uploading}
				onChange={event => selectFile(event.target.files?.[0] ?? null)}
			/>
			{uploading ? <p className="text-muted-foreground text-xs">Uploading...</p> : null}
			{error ? <p className="text-destructive text-xs">{error}</p> : null}
		</div>
	);
}
