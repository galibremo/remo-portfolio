"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputPasswordProps extends Omit<React.ComponentProps<"input">, "type"> {
	showToggleButton?: boolean;
	toggleButtonProps?: Partial<React.ComponentProps<typeof Button>>;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
	({ className, showToggleButton = true, toggleButtonProps, ...props }, ref) => {
		const [isVisible, setIsVisible] = useState(false);

		const toggleVisibility = () => {
			setIsVisible(prev => !prev);
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				toggleVisibility();
			}
		};

		return (
			<div className="relative">
				<Input
					type={isVisible ? "text" : "password"}
					className={cn("pr-12", className)}
					ref={ref}
					{...props}
				/>
				{showToggleButton && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
						onClick={toggleVisibility}
						onKeyDown={handleKeyDown}
						aria-label={isVisible ? "Hide password" : "Show password"}
						tabIndex={0}
						{...toggleButtonProps}
					>
						{isVisible ? (
							<Eye className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
						) : (
							<EyeOff className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
						)}
					</Button>
				)}
			</div>
		);
	}
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
export type { InputPasswordProps };
