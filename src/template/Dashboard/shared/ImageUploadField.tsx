"use client";

import Image from "next/image";
import { useState } from "react";

import {
	replaceImage,
	validateImageFile
} from "@/lib/supabaseStorage";

import { Input } from "@/components/ui/input";

type ImageUploadFieldProps = {
	value: string | null | undefined;
	onChange: (url: string | null) => void;
	folder?: string;
	disabled?: boolean;
	label?: string;
};

export function ImageUploadField({
	value,
	onChange,
	folder = "uploads",
	disabled,
	label = "Image"
}: ImageUploadFieldProps) {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | undefined>();

	const handleFile = async (file: File | null) => {
		if (!file) {
			onChange(null);
			return;
		}

		const validation = validateImageFile(file);
		if (!validation.isValid) {
			setError(validation.error);
			return;
		}

		setError(undefined);
		setUploading(true);
		try {
			const result = await replaceImage(value ?? null, file, folder);
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
				<div className="flex items-center gap-3">
					<Image
						src={value}
						alt={label}
						width={80}
						height={80}
						className="h-20 w-20 rounded-lg border object-cover"
					/>
					<p className="text-muted-foreground text-xs break-all">{value}</p>
				</div>
			) : null}
			<Input
				type="file"
				accept="image/*"
				disabled={disabled || uploading}
				onChange={event => handleFile(event.target.files?.[0] ?? null)}
			/>
			{uploading ? <p className="text-muted-foreground text-xs">Uploading...</p> : null}
			{error ? <p className="text-destructive text-xs">{error}</p> : null}
			{value ? <p className="text-muted-foreground text-xs break-all">Saved: {value}</p> : null}
		</div>
	);
}
