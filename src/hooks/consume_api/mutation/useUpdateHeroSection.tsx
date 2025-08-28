import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { heroSectionKeys } from "@/lib/keyes";

import { updateHeroSection } from "@/services/services";

const useUpdateHeroSection = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, mutate, error, isSuccess, isError, isPending } = useMutation({
		mutationFn: updateHeroSection,
		onSettled: (_, error) => {
			if (error) {
				if (axios.isAxiosError(error)) {
					const axiosError = error;

					if (axiosError.response) {
						const { status, data } = axiosError.response;

						if (status === 401) {
							toast.error("Unauthorized access");
						} else {
							console.error(`Request failed with status ${status}`, data);
							toast.error(`Request failed with status ${status}`);
						}
					} else if (axiosError.request) {
						console.error("No response received from the server");
						toast.error("No response received from the server");
					} else {
						console.error("Error setting up the request:", axiosError.message);
						toast.error("Error setting up the request");
					}
				} else {
					console.error("Unexpected error:", error);
					toast.error("Failed to update hero section!");
				}
			} else {
				toast.success("Hero section updated successfully!");
				queryClient.invalidateQueries({ queryKey: heroSectionKeys.all });
			}
		}
	});

	return {
		updateHeroSection: mutate,
		updateHeroSectionAsync: mutateAsync,
		isUpdateHeroSectionLoading: isPending,
		updateHeroSectionError: error,
		isUpdateHeroSectionError: isError,
		isUpdateHeroSectionSuccess: isSuccess
	};
};

export default useUpdateHeroSection;
