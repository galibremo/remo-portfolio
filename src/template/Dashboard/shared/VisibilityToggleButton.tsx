"use client";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";

type VisibilityToggleButtonProps = {
	isHidden: boolean;
	disabled?: boolean;
	onToggle: () => void;
};

/**
 * Dashboard table action that toggles landing-page visibility.
 * Eye = visible on landing; EyeOff = hidden from landing.
 */
export function VisibilityToggleButton({
	isHidden,
	disabled,
	onToggle
}: VisibilityToggleButtonProps) {
	return (
		<Button
			size="icon"
			variant="ghost"
			type="button"
			onClick={onToggle}
			disabled={disabled}
			aria-label={isHidden ? "Show on landing page" : "Hide from landing page"}
			title={isHidden ? "Show on landing page" : "Hide from landing page"}
		>
			{isHidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
		</Button>
	);
}
