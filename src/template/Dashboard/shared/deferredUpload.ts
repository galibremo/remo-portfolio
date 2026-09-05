"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import { deleteImage, type UploadResult } from "@/lib/supabaseStorage";

export type DeferredUploadHandle = {
	commit: () => Promise<string | null>;
};

/**
 * True when the value is a stored (non-blob) URL that can be persisted to the database.
 */
export function isRemoteUrl(url: string | null | undefined): url is string {
	return typeof url === "string" && url.length > 0 && !url.startsWith("blob:");
}

/**
 * Returns a persisted URL, or null if the value is empty or a local preview.
 */
export function toPersistedUrl(url: string | null | undefined): string | null {
	return isRemoteUrl(url) ? url : null;
}

/**
 * Uploads a pending file on a deferred field. Throws on upload failure so the form save is skipped.
 * Never returns a `blob:` preview URL.
 */
export async function commitDeferredUpload(
	ref: RefObject<DeferredUploadHandle | null>,
	fallback: string | null | undefined
): Promise<string | null> {
	if (ref.current) {
		return ref.current.commit();
	}
	return toPersistedUrl(fallback);
}

type UseDeferredUploadOptions = {
	value: string | null | undefined;
	onChange: (url: string | null) => void;
	folder: string;
	validate: (file: File) => { isValid: boolean; error?: string };
	upload: (oldUrl: string | null, file: File, folder: string) => Promise<UploadResult>;
};

/**
 * Holds a chosen file locally until `commit()` uploads it to storage.
 * Clearing a saved file defers storage deletion until `commit()`.
 */
export function useDeferredUpload({
	value,
	onChange,
	folder,
	validate,
	upload
}: UseDeferredUploadOptions) {
	const [pendingFile, setPendingFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	/** True after clearSaved until a new pick or parent resets a remote value. */
	const [hasClearedSaved, setHasClearedSaved] = useState(false);

	const committedRemoteUrlRef = useRef<string | null>(toPersistedUrl(value));
	const pendingDeleteUrlRef = useRef<string | null>(null);
	const pendingFileRef = useRef<File | null>(null);
	const previewUrlRef = useRef<string | null>(null);
	const onChangeRef = useRef(onChange);
	const uploadRef = useRef(upload);
	const folderRef = useRef(folder);
	const fileInputRef = useRef<HTMLInputElement>(null);

	onChangeRef.current = onChange;
	uploadRef.current = upload;
	folderRef.current = folder;

	useEffect(() => {
		if (pendingFileRef.current) return;
		if (isRemoteUrl(value)) {
			committedRemoteUrlRef.current = value;
			pendingDeleteUrlRef.current = null;
			setHasClearedSaved(false);
		}
	}, [value]);

	const revokePreview = () => {
		if (previewUrlRef.current?.startsWith("blob:")) {
			URL.revokeObjectURL(previewUrlRef.current);
		}
	};

	useEffect(() => {
		return () => {
			if (previewUrlRef.current?.startsWith("blob:")) {
				URL.revokeObjectURL(previewUrlRef.current);
			}
		};
	}, []);

	const resetFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const cancelPending = () => {
		revokePreview();
		pendingFileRef.current = null;
		previewUrlRef.current = null;
		setPendingFile(null);
		setPreviewUrl(null);
		setError(undefined);
		resetFileInput();

		if (!committedRemoteUrlRef.current && pendingDeleteUrlRef.current) {
			committedRemoteUrlRef.current = pendingDeleteUrlRef.current;
			pendingDeleteUrlRef.current = null;
		}
		setHasClearedSaved(false);
		onChangeRef.current(committedRemoteUrlRef.current);
	};

	/**
	 * Clears a saved remote image from the field. Storage deletion runs on commit().
	 */
	const clearSaved = () => {
		const remoteToRemove =
			committedRemoteUrlRef.current ?? toPersistedUrl(value) ?? pendingDeleteUrlRef.current;

		revokePreview();
		pendingFileRef.current = null;
		previewUrlRef.current = null;
		setPendingFile(null);
		setPreviewUrl(null);
		setError(undefined);
		resetFileInput();

		if (remoteToRemove) {
			pendingDeleteUrlRef.current = remoteToRemove;
		}
		committedRemoteUrlRef.current = null;
		setHasClearedSaved(true);
		onChangeRef.current(null);
	};

	const selectFile = (file: File | null) => {
		if (!file) {
			cancelPending();
			return;
		}

		const validation = validate(file);
		if (!validation.isValid) {
			setError(validation.error);
			resetFileInput();
			return;
		}

		setError(undefined);
		revokePreview();

		const blobUrl = URL.createObjectURL(file);
		pendingFileRef.current = file;
		previewUrlRef.current = blobUrl;
		setPendingFile(file);
		setPreviewUrl(blobUrl);
		setHasClearedSaved(false);
		onChangeRef.current(blobUrl);
	};

	const commit = useCallback(async (): Promise<string | null> => {
		const file = pendingFileRef.current;
		const urlToDelete = pendingDeleteUrlRef.current;
		const oldUrl = urlToDelete ?? committedRemoteUrlRef.current;

		if (!file) {
			if (urlToDelete) {
				setUploading(true);
				setError(undefined);
				try {
					const result = await deleteImage(urlToDelete);
					if (!result.success) {
						const message = result.error ?? "Delete failed";
						setError(message);
						throw new Error(message);
					}
					pendingDeleteUrlRef.current = null;
					committedRemoteUrlRef.current = null;
					setHasClearedSaved(false);
					onChangeRef.current(null);
					return null;
				} finally {
					setUploading(false);
				}
			}
			return committedRemoteUrlRef.current;
		}

		setUploading(true);
		setError(undefined);
		try {
			const result = await uploadRef.current(oldUrl, file, folderRef.current);
			if (!result.success || !result.url) {
				const message = result.error ?? "Upload failed";
				setError(message);
				throw new Error(message);
			}

			revokePreview();
			pendingFileRef.current = null;
			previewUrlRef.current = null;
			pendingDeleteUrlRef.current = null;
			committedRemoteUrlRef.current = result.url;
			setPendingFile(null);
			setPreviewUrl(null);
			setHasClearedSaved(false);
			resetFileInput();
			onChangeRef.current(result.url);
			return result.url;
		} finally {
			setUploading(false);
		}
	}, []);

	const displayUrl =
		previewUrl ?? (hasClearedSaved ? null : toPersistedUrl(value));

	return {
		pendingFile,
		displayUrl,
		uploading,
		error,
		fileInputRef,
		selectFile,
		cancelPending,
		clearSaved,
		commit,
		hasPending: Boolean(pendingFile),
		canClear: Boolean(displayUrl)
	};
}
