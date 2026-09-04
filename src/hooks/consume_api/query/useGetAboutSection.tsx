import { useQuery } from "@tanstack/react-query";

import { aboutSectionKeys } from "@/lib/keyes";
import { AboutSectionResponse } from "@/lib/types";
import { DEFAULT_STALE_TIME } from "@/lib/utils";

import { getAboutSection } from "@/services/services";

const useGetAboutSection = (enabled: boolean = true) => {
	const result = useQuery<AboutSectionResponse, Error>({
		queryKey: aboutSectionKeys.lists(),
		queryFn: () => getAboutSection(),
		staleTime: DEFAULT_STALE_TIME,
		enabled
	});

	return {
		aboutSection: result.data?.data,
		isAboutSectionFetching: result.isFetching,
		...result
	};
};

export default useGetAboutSection;
