import HomeTemplate from "@/template/HomePage/HomeTemplate";

import { getPortfolioContent } from "@/services/portfolioContent";

export const revalidate = 60;

export default async function HomePage() {
	const content = await getPortfolioContent();
	return <HomeTemplate content={content} />;
}
