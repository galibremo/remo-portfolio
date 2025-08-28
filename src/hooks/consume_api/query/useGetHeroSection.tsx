import { useQuery } from "@tanstack/react-query";

import { heroSectionKeys } from "@/lib/keyes";
import { HeroSectionResponse } from "@/lib/types";
import { DEFAULT_STALE_TIME } from "@/lib/utils";

import { getHeroSection } from "@/services/services";

const useGetHeroSection = (enabled: boolean = true) => {
	const result = useQuery<HeroSectionResponse, Error>({
		queryKey: heroSectionKeys.lists(),
		queryFn: () => getHeroSection(),
		staleTime: DEFAULT_STALE_TIME,
		enabled
	});

	return {
		heroSection: result.data?.data,
		isHeroSectionFetching: result.isFetching,
		isHeroSectionFetched: result.isFetched,
		...result
	};
};

export default useGetHeroSection;
