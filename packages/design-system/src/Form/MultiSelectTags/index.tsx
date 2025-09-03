import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Option = { value: string | number; label: string };

type Props = {
	name: string;
	options: Option[];
	initialSelected?: (string | number)[];
	onChange?: (values: (string | number)[]) => void;
	className?: string;
	placeholder?: string;
};

export function MultiSelectTags({
	name,
	options,
	initialSelected = [],
	onChange,
	className,
	placeholder = "Sélectionner…",
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
		<div
			className={clsx(styles.container, className)}
			ref={wrapperRef}
			// onClick={(e) => {
			// 	e.stopPropagation();
			// 	e.preventDefault();
			// }}
		>
			<ul
				className={styles.tags}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					setIsOpen((prev) => !prev);
				}}
			>
				{selected.length === 0 ? (
					<li className={styles.placeholder}>{placeholder}</li>
				) : (
					selected.map((val) => {
						const opt = options.find((o) => o.value === val);
						if (!opt) return null;

						return (
							<li
								key={val}
								className={styles.tag}
								tabIndex={0}
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();
									removeTag(val);
								}}
								aria-label={`Retirer ${opt.label}`}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										removeTag(val);
									}
								}}
							>
								{opt.label}
								{/* No nested button: just a span with onClick */}
								<span role="button" className={styles.removeBtn}>
									×
								</span>
								<input type="hidden" name={name} value={val} />
							</li>
						);
					})
				)}
			</ul>
			<span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>

			{/* Toggle Dropdown */}
			{/*<button*/}
			{/*	type="button"*/}
			{/*	className={styles.dropdownToggle}*/}
			{/*	onClick={(e) => {*/}
			{/*		e.stopPropagation();*/}
			{/*		e.preventDefault();*/}
			{/*		setIsOpen((prev) => !prev);*/}
			{/*	}}*/}
			{/*	aria-haspopup="listbox"*/}
			{/*	aria-expanded={isOpen}*/}
			{/*>*/}
			{/*	▾*/}
			{/*</button>*/}

			{isOpen && (
				<div className={styles.dropdown} role="listbox" aria-multiselectable="true">
					{options.map(({ value, label }) => (
						<label key={value} className={styles.option}>
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
