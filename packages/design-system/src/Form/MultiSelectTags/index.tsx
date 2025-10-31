import { useState, useRef, useEffect, type ReactNode } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";

export type Option = { value: string; label: string };

type Props = {
	name: string;
	options: Option[];
	initialSelected?: string[];
	onChange?: (values: string[]) => void;
	className?: string;
	placeholder?: string;
	icon?: ReactNode;
};

export function MultiSelectTags({
	name,
	options,
	initialSelected = [],
	onChange,
	className,
	placeholder = "Select…",
	icon,
}: Props) {
	const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const toggleOption = (value: string) => {
		setSelected((prev) => {
			const exists = prev.has(value);
			if (exists) prev.delete(value);
			else prev.add(value);
			onChange?.([...prev]);
			return new Set(prev);
		});
	};

	const removeTag = (value: string) => {
		setSelected((prev) => {
			prev.delete(value);
			onChange?.([...prev]);
			return new Set(prev);
		});
	};

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!wrapperRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={clsx(classes.container, className)} ref={wrapperRef}>
			{icon && <span className={classes.icon}>{icon}</span>}
			<ul
				tabIndex={0}
				className={clsx(classes.tags)}
				onClick={(e) => {
					e.preventDefault();
					setIsOpen((prev) => !prev);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen((prev) => !prev);
					}
				}}
			>
				{selected.size === 0 ? (
					<li className={classes.placeholder}>{placeholder}</li>
				) : (
					options.map(({ value, label }) => {
						if (!selected.has(value)) return null;

						return (
							<li
								key={value}
								className={classes.tag}
								tabIndex={0}
								onClick={(e) => {
									e.stopPropagation();
									removeTag(value);
								}}
								aria-label={`Retirer ${label}`}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.stopPropagation();
										removeTag(value);
									}
								}}
							>
								{label}
								<span role="button" className={classes.removeBtn}>
									×
								</span>
								<input type="hidden" name={name} value={value} />
							</li>
						);
					})
				)}
			</ul>
			<span className={classes.chevron}>{isOpen ? "▲" : "▼"}</span>
			{isOpen && (
				<div className={classes.dropdown} role="listbox" aria-multiselectable="true">
					{options.map(({ value, label }) => (
						<label key={value} className={classes.option}>
							<input
								type="checkbox"
								checked={selected.has(value)}
								onChange={() => toggleOption(value)}
							/>
							{label}
						</label>
					))}
				</div>
			)}
		</div>
	);
}
