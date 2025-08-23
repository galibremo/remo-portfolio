"use client";

import {
	Bar,
	BarChart,
	BarSeries,
	Gradient,
	GradientStop,
	LinearXAxis,
	LinearXAxisTickSeries,
	LinearYAxis,
	LinearYAxisTickLabel,
	LinearYAxisTickSeries
} from "reaviz";

interface ChartCategoryData {
	key: string;
	data: number;
}

const baseCategoryDataRaw: ChartCategoryData[] = [
	{ key: "TypeScript", data: 70 },
	{ key: "Express.js", data: 82 },
	{ key: "Drizzle", data: 77 },
	{ key: "Mongoose", data: 78 },
	{ key: "Next.js", data: 75 }
];

const chartColors = ["#9152EE", "#40D3F4", "#40E5D1", "#4C86FF"];

export default function BackEndBar() {
	return (
		<div className="h-[200px] w-full min-w-[200px] flex-grow">
			<BarChart
				id="detailed-horizontal-incident-chart"
				height={200}
				data={baseCategoryDataRaw}
				yAxis={
					<LinearYAxis
						type="category"
						tickSeries={
							<LinearYAxisTickSeries
								label={
									<LinearYAxisTickLabel
										format={(text: string) => (text.length > 10 ? `${text.slice(0, 10)}...` : text)}
										fill="#9A9AAF"
									/>
								}
							/>
						}
					/>
				}
				xAxis={
					<LinearXAxis
						type="value"
						domain={[0, 100]}
						axisLine={null}
						tickSeries={<LinearXAxisTickSeries tickSize={50} />}
					/>
				}
				series={
					<BarSeries
						layout="horizontal"
						bar={
							<Bar
								gradient={
									<Gradient
										stops={[
											<GradientStop offset="0%" color="#9152EE" />,
											<GradientStop offset="100%" color="#40D3F4" />
										]}
									/>
								}
								style={{ cursor: "default" }}
							/>
						}
						colorScheme={chartColors}
						padding={0.1}
					/>
				}
			/>
		</div>
	);
}

