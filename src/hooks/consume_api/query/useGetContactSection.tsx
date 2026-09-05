import { useQuery } from "@tanstack/react-query";

import { contactSectionKeys } from "@/lib/keyes";
import { ContactSectionResponse } from "@/lib/types";
import { DEFAULT_STALE_TIME } from "@/lib/utils";

import { getContactSection } from "@/services/services";

const useGetContactSection = (enabled: boolean = true) => {
	const result = useQuery<ContactSectionResponse, Error>({
		queryKey: contactSectionKeys.lists(),
		queryFn: () => getContactSection(),
		staleTime: DEFAULT_STALE_TIME,
		enabled
	});

	return {
		contactSection: result.data?.data,
		isContactSectionFetching: result.isFetching,
		...result
	};
};

export default useGetContactSection;
