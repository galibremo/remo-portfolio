"use client";

import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StringListInputProps = {
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	disabled?: boolean;
};

export function StringListInput({
	value,
	onChange,
	placeholder = "Type and press Enter",
	disabled
}: StringListInputProps) {
	const [draft, setDraft] = useState("");

	const addItem = () => {
		const next = draft.trim();
		if (!next) return;
		if (value.includes(next)) {
			setDraft("");
			return;
		}
		onChange([...value, next]);
		setDraft("");
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			addItem();
		}
	};

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input
					value={draft}
					onChange={event => setDraft(event.target.value)}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					disabled={disabled}
				/>
				<Button type="button" variant="secondary" onClick={addItem} disabled={disabled}>
					Add
				</Button>
			</div>
			{value.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{value.map(item => (
						<Badge key={item} variant="secondary" className="gap-1 pr-1">
							{item}
							<button
								type="button"
								className="hover:bg-muted rounded-full p-0.5"
								onClick={() => onChange(value.filter(entry => entry !== item))}
								disabled={disabled}
								aria-label={`Remove ${item}`}
							>
								<X className="size-3" />
							</button>
						</Badge>
					))}
				</div>
			) : null}
		</div>
	);
}
