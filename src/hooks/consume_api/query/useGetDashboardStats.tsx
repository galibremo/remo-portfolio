import { useQuery } from "@tanstack/react-query";

import { dashboardStatsKeys } from "@/lib/keyes";
import { DashboardStatsResponse } from "@/lib/types";
import { DEFAULT_STALE_TIME } from "@/lib/utils";

import { getDashboardStats } from "@/services/services";

const useGetDashboardStats = (enabled: boolean = true) => {
	const result = useQuery<DashboardStatsResponse, Error>({
		queryKey: dashboardStatsKeys.lists(),
		queryFn: () => getDashboardStats(),
		staleTime: DEFAULT_STALE_TIME,
		enabled
	});

	return {
		stats: result.data?.data,
		isStatsFetching: result.isFetching,
		...result
	};
};

export default useGetDashboardStats;
