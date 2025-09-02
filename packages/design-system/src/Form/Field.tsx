import { type FC, type ReactNode, isValidElement, cloneElement } from "react";
import styles from "./Form.module.css";

interface FieldProps {
	label: string;
	icon?: ReactNode;
	children: ReactNode; // un seul enfant "contrôle"
}

export const Field: FC<FieldProps> = ({ label, icon, children }) => {
	const child = isValidElement(children)
		? cloneElement(children as any, {
				className: [
					(children as any).props?.className,
					styles.control, // 🔹 applique le skin commun
				]
					.filter(Boolean)
					.join(" "),
			})
		: children;

	return (
		<label className={styles.field}>
			<span className={styles.label}>{label}</span>
			<div className={`${styles.controlWrapper} ${icon ? styles.hasIcon : ""}`}>
				{icon && <span className={styles.icon}>{icon}</span>}
				{child}
			</div>
		</label>
	);
};
