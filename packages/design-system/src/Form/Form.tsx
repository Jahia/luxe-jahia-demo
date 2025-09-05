import { type FC, type FormHTMLAttributes } from "react";
import styles from "./Form.module.css";
import clsx from "clsx";

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
	children,
	className,
	...props
}) => (
	<form className={clsx(styles.form, className)} {...props}>
		{children}
	</form>
);
