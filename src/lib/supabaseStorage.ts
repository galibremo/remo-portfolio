import { supabase } from "./supabaseClient";

const BUCKET_NAME = "my-portfolio-image";

export interface UploadResult {
	success: boolean;
	url?: string;
	error?: string;
}

/**
 * Upload an image to Supabase storage
 * @param file - The file to upload
 * @param folder - Optional folder path (e.g., 'hero', 'projects')
 * @returns Promise with upload result containing success status and URL or error
 */
export async function uploadImage(file: File, folder: string = ""): Promise<UploadResult> {
	try {
		// Generate unique filename with timestamp
		const timestamp = Date.now();
		const fileExtension = file.name.split(".").pop();
		const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
		const filePath = folder ? `${folder}/${fileName}` : fileName;

		console.log("Attempting to upload file:", { fileName, filePath, bucketName: BUCKET_NAME });

		// Upload file to Supabase storage
		const { data, error } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: false
			});

		if (error) {
			console.error("Upload error details:", error);
			return {
				success: false,
				error: `Upload failed: ${error.message}. Please check your bucket policies.`
			};
		}

		console.log("Upload successful:", data);

		// Get public URL
		const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

		console.log("Generated public URL:", publicUrlData.publicUrl);

		return {
			success: true,
			url: publicUrlData.publicUrl
		};
	} catch (error) {
		console.error("Upload error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Upload failed"
		};
	}
}

/**
 * Delete an image from Supabase storage
 * @param imageUrl - The full URL of the image to delete
 * @returns Promise with deletion result
 */
export async function deleteImage(imageUrl: string): Promise<{ success: boolean; error?: string }> {
	try {
		// Extract file path from URL
		const url = new URL(imageUrl);
		const pathParts = url.pathname.split("/");
		const bucketIndex = pathParts.findIndex(part => part === BUCKET_NAME);
		
		if (bucketIndex === -1) {
			return {
				success: false,
				error: "Invalid image URL - bucket not found"
			};
		}

		const filePath = pathParts.slice(bucketIndex + 1).join("/");

		if (!filePath) {
			return {
				success: false,
				error: "Invalid image URL - file path not found"
			};
		}

		// Delete file from Supabase storage
		const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

		if (error) {
			console.error("Delete error:", error);
			return {
				success: false,
				error: error.message
			};
		}

		return { success: true };
	} catch (error) {
		console.error("Delete error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Delete failed"
		};
	}
}

/**
 * Replace an existing image with a new one
 * @param oldImageUrl - URL of the existing image to delete
 * @param newFile - New file to upload
 * @param folder - Optional folder path
 * @returns Promise with upload result
 */
export async function replaceImage(
	oldImageUrl: string | null,
	newFile: File,
	folder: string = ""
): Promise<UploadResult> {
	try {
		// Upload new image first
		const uploadResult = await uploadImage(newFile, folder);
		
		if (!uploadResult.success) {
			return uploadResult;
		}

		// If old image exists, delete it
		if (oldImageUrl) {
			const deleteResult = await deleteImage(oldImageUrl);
			if (!deleteResult.success) {
				console.warn("Failed to delete old image:", deleteResult.error);
				// Don't fail the whole operation if deletion fails
			}
		}

		return uploadResult;
	} catch (error) {
		console.error("Replace image error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Replace failed"
		};
	}
}

/**
 * Get file size in a human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Test Supabase storage connection and permissions
 * @returns Promise with test result
 */
export async function testStorageConnection(): Promise<{ success: boolean; message: string }> {
	try {
		// Try to list buckets to test connection
		const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
		
		if (bucketsError) {
			return {
				success: false,
				message: `Failed to connect to Supabase storage: ${bucketsError.message}`
			};
		}

		console.log("Available buckets:", buckets);
		
		const targetBucket = buckets?.find(bucket => bucket.name === BUCKET_NAME);
		if (!targetBucket) {
			return {
				success: false,
				message: `Bucket '${BUCKET_NAME}' not found. Available buckets: ${buckets?.map(b => b.name).join(', ')}`
			};
		}

		// Try to list files in the bucket to test permissions
		const { data: files, error: listError } = await supabase.storage
			.from(BUCKET_NAME)
			.list('hero', {
				limit: 1
			});

		if (listError) {
			return {
				success: false,
				message: `Cannot access bucket '${BUCKET_NAME}': ${listError.message}. Please check RLS policies.`
			};
		}

		return {
			success: true,
			message: `Successfully connected to bucket '${BUCKET_NAME}'. ${files?.length || 0} files found in 'hero' folder.`
		};
	} catch (error) {
		return {
			success: false,
			message: `Storage test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
		};
	}
}

/**
 * Validate file type and size
 * @param file - File to validate
 * @param maxSizeInMB - Maximum file size in MB (default: 5MB)
 * @param allowedTypes - Allowed MIME types
 * @returns Validation result
 */
export function validateImageFile(
	file: File,
	maxSizeInMB: number = 5,
	allowedTypes: string[] = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
): { isValid: boolean; error?: string } {
	// Check file type
	if (!allowedTypes.includes(file.type)) {
		return {
			isValid: false,
			error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`
		};
	}

	// Check file size
	const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
	if (file.size > maxSizeInBytes) {
		return {
			isValid: false,
			error: `File too large. Maximum size: ${maxSizeInMB}MB (current: ${formatFileSize(file.size)})`
		};
	}

	return { isValid: true };
}
