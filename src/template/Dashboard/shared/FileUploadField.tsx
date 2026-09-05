"use client";

import { X } from "lucide-react";
import { type Ref, useImperativeHandle } from "react";

import { replaceImage, validateDocumentFile } from "@/lib/supabaseStorage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	type DeferredUploadHandle,
	isRemoteUrl,
	useDeferredUpload
} from "@/template/Dashboard/shared/deferredUpload";

type FileUploadFieldProps = {
	ref?: Ref<DeferredUploadHandle>;
	value: string | null | undefined;
	onChange: (url: string | null) => void;
	folder?: string;
	disabled?: boolean;
};

export function FileUploadField({
	ref,
	value,
	onChange,
	folder = "documents",
	disabled
}: FileUploadFieldProps) {
	const { pendingFile, uploading, error, fileInputRef, selectFile, cancelPending, commit } =
		useDeferredUpload({
			value,
			onChange,
			folder,
			validate: validateDocumentFile,
			upload: replaceImage
		});

	useImperativeHandle(ref, () => ({ commit }), [commit]);

	return (
		<div className="space-y-2">
			{pendingFile ? (
				<div className="flex items-center gap-2">
					<p className="text-muted-foreground text-xs">{pendingFile.name}</p>
					<Button
						type="button"
						size="icon-xs"
						variant="destructive"
						className="rounded-full"
						onClick={cancelPending}
						disabled={disabled || uploading}
						aria-label="Remove selected file"
					>
						<X />
					</Button>
				</div>
			) : isRemoteUrl(value) ? (
				<p className="text-muted-foreground text-xs break-all">Current file: {value}</p>
			) : null}
			<Input
				ref={fileInputRef}
				type="file"
				accept="application/pdf"
				className="ring-0!"
				disabled={disabled || uploading}
				onChange={event => selectFile(event.target.files?.[0] ?? null)}
			/>
			{uploading ? <p className="text-muted-foreground text-xs">Uploading...</p> : null}
			{error ? <p className="text-destructive text-xs">{error}</p> : null}
		</div>
	);
}
