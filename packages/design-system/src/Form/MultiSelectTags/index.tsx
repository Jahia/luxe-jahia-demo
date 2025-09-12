import { useState, useRef, useEffect, type ReactNode } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";

export type Option = { value: string | number; label: string };

type Props = {
	name: string;
	options: Option[];
	initialSelected?: (string | number)[];
	onChange?: (values: (string | number)[]) => void;
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
	const [selected, setSelected] = useState<(string | number)[]>(initialSelected);
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const toggleOption = (value: string | number) => {
		setSelected((prev) => {
			const exists = prev.includes(value);
			const updated = exists ? prev.filter((v) => v !== value) : [...prev, value];
			onChange?.(updated);
			return updated;
		});
	};

	const removeTag = (value: string | number) => {
		setSelected((prev) => {
			const updated = prev.filter((v) => v !== value);
			onChange?.(updated);
			return updated;
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
				{selected.length === 0 ? (
					<li className={classes.placeholder}>{placeholder}</li>
				) : (
					selected.map((val) => {
						const opt = options.find((o) => o.value === val);
						if (!opt) return null;

						return (
							<li
								key={val}
								className={classes.tag}
								tabIndex={0}
								onClick={(e) => {
									e.stopPropagation();
									removeTag(val);
								}}
								aria-label={`Retirer ${opt.label}`}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.stopPropagation();
										removeTag(val);
									}
								}}
							>
								{opt.label}
								<span role="button" className={classes.removeBtn}>
									×
								</span>
								<input type="hidden" name={name} value={val} />
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
								checked={selected.includes(value)}
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
