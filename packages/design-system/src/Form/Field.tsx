import type { FC, ReactNode } from "react";
import styles from "./Form.module.css";

interface FieldProps {
	label: string;
	icon?: ReactNode;
	children: ReactNode;
}

export const Field: FC<FieldProps> = ({ label, icon, children }) => (
	<label className={styles.field}>
		<span className={styles.label}>{label}</span>
		<div className={styles.controlWrapper}>
			{icon && <span className={styles.icon}>{icon}</span>}
			{children}
		</div>
	</label>
);
