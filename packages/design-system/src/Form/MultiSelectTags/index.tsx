import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

export type Option = {
	value: string | number;
	label: string;
};

type Props = {
	name: string;
	options: Option[];
	initialSelected?: (string | number)[];
	onChange?: (values: (string | number)[]) => void;
};

export function MultiSelectTags({ name, options, initialSelected = [], onChange }: Props) {
	const [selected, setSelected] = useState<(string | number)[]>(initialSelected);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	const handleClickOutside = (e: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.container} ref={dropdownRef}>
			<div className={styles.tags} onClick={() => setIsOpen((prev) => !prev)}>
				{selected.map((val) => {
					const opt = options.find((o) => o.value === val);
					if (!opt) return null;
					return (
						<span key={val} className={styles.tag}>
							{opt.label}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeTag(val);
								}}
								className={styles.removeBtn}
							>
								×
							</button>
							<input type="hidden" name={name} value={val} />
						</span>
					);
				})}
				<span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>
			</div>

			{isOpen && (
				<div className={styles.dropdown}>
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
