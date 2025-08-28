import { type FC, type FormHTMLAttributes } from "react";
import styles from "./Form.module.css";

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => (
	<form className={styles.form} {...props}>
		{children}
	</form>
);
