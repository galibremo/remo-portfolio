import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { aboutSectionKeys } from "@/lib/keyes";

import { updateAboutSection } from "@/services/services";

const useUpdateAboutSection = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, mutate, error, isSuccess, isError, isPending } = useMutation({
		mutationFn: updateAboutSection,
		onSettled: (_, mutationError) => {
			if (mutationError) {
				if (axios.isAxiosError(mutationError)) {
					toast.error(mutationError.response?.data?.message ?? "Failed to update about section");
				} else {
					toast.error("Failed to update about section!");
				}
			} else {
				toast.success("About section updated successfully!");
				queryClient.invalidateQueries({ queryKey: aboutSectionKeys.all });
			}
		}
	});

	return {
		updateAboutSection: mutate,
		updateAboutSectionAsync: mutateAsync,
		isUpdateAboutSectionLoading: isPending,
		updateAboutSectionError: error,
		isUpdateAboutSectionError: isError,
		isUpdateAboutSectionSuccess: isSuccess
	};
};

export default useUpdateAboutSection;
