"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MonitorIcon as MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted before rendering to prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSetTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("system");
		} else {
			setTheme("light");
		}
	};

	// Determine the current icon component based on the theme
	const CurrentIcon = theme === "light" ? Sun : theme === "dark" ? Moon : MonitorCog;

	// Prevent hydration mismatch by not rendering until mounted
	if (!mounted) {
		return (
			<Button
				variant="outline"
				size="icon"
				className="relative cursor-pointer overflow-hidden bg-transparent"
				aria-label="Toggle theme"
			>
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			</Button>
		);
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="relative cursor-pointer overflow-hidden bg-transparent"
						onClick={handleSetTheme}
						aria-label="Toggle theme"
					>
						<AnimatePresence mode="popLayout" initial={false}>
							<motion.div
								key={theme}
								initial={{ y: -20, opacity: 0, rotate: -90 }}
								animate={{ y: 0, opacity: 1, rotate: 0 }}
								exit={{ y: 20, opacity: 0, rotate: 90 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
								className="absolute inset-0 flex items-center justify-center"
							>
								<CurrentIcon className="h-[1.2rem] w-[1.2rem]" />
							</motion.div>
						</AnimatePresence>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Current theme: {theme}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
