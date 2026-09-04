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
import { useEffect, useRef, useState } from "react";

import { SkillChartDatum } from "@/lib/portfolio";

const chartColors = ["#9152EE", "#40D3F4", "#40E5D1", "#4C86FF"];

type FrontEndBarProps = {
	data: SkillChartDatum[];
};

export default function FrontEndBar({ data }: FrontEndBarProps) {
	const [inView, setInView] = useState(false);
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		if (chartRef.current) {
			observer.observe(chartRef.current);
		}
		return () => observer.disconnect();
	}, []);

	if (data.length === 0) {
		return null;
	}

	return (
		<div ref={chartRef} className="flex h-[200px] w-full min-w-[200px] flex-grow">
			{inView ? (
				<BarChart
					id="frontend-skill-chart"
					height={200}
					data={data}
					yAxis={
						<LinearYAxis
							type="category"
							tickSeries={
								<LinearYAxisTickSeries
									label={
										<LinearYAxisTickLabel
											format={(text: string) =>
												text.length > 10 ? `${text.slice(0, 10)}...` : text
											}
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
												<GradientStop key="0%" offset="0%" color="#9152EE" />,
												<GradientStop key="100%" offset="100%" color="#40E5D1" />
											]}
										/>
									}
									style={{ cursor: "default" }}
								/>
							}
							colorScheme={chartColors}
							padding={0.2}
						/>
					}
				/>
			) : null}
		</div>
	);
}
