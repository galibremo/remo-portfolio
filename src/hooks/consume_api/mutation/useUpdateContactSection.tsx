import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { contactSectionKeys } from "@/lib/keyes";

import { updateContactSection } from "@/services/services";

const useUpdateContactSection = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, mutate, error, isSuccess, isError, isPending } = useMutation({
		mutationFn: updateContactSection,
		onSettled: (_, mutationError) => {
			if (mutationError) {
				if (axios.isAxiosError(mutationError)) {
					toast.error(mutationError.response?.data?.message ?? "Failed to update contact intro");
				} else {
					toast.error("Failed to update contact intro!");
				}
			} else {
				toast.success("Contact intro updated successfully!");
				queryClient.invalidateQueries({ queryKey: contactSectionKeys.all });
			}
		}
	});

	return {
		updateContactSection: mutate,
		updateContactSectionAsync: mutateAsync,
		isUpdateContactSectionLoading: isPending,
		updateContactSectionError: error,
		isUpdateContactSectionError: isError,
		isUpdateContactSectionSuccess: isSuccess
	};
};

export default useUpdateContactSection;
