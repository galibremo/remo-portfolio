"use client";

import { useState } from "react";

import {
	uploadDocument,
	validateDocumentFile
} from "@/lib/supabaseStorage";

import { Input } from "@/components/ui/input";

type FileUploadFieldProps = {
	value: string | null | undefined;
	onChange: (url: string | null) => void;
	folder?: string;
	disabled?: boolean;
};

export function FileUploadField({
	value,
	onChange,
	folder = "documents",
	disabled
}: FileUploadFieldProps) {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | undefined>();

	const handleFile = async (file: File | null) => {
		if (!file) {
			onChange(null);
			return;
		}

		const validation = validateDocumentFile(file);
		if (!validation.isValid) {
			setError(validation.error);
			return;
		}

		setError(undefined);
		setUploading(true);
		try {
			const result = await uploadDocument(file, folder);
			if (!result.success || !result.url) {
				setError(result.error ?? "Upload failed");
				return;
			}
			onChange(result.url);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="space-y-2">
			{value ? (
				<p className="text-muted-foreground text-xs break-all">Current file: {value}</p>
			) : null}
			<Input
				type="file"
				accept="application/pdf"
				disabled={disabled || uploading}
				onChange={event => handleFile(event.target.files?.[0] ?? null)}
			/>
			{uploading ? <p className="text-muted-foreground text-xs">Uploading...</p> : null}
			{error ? <p className="text-destructive text-xs">{error}</p> : null}
		</div>
	);
}
