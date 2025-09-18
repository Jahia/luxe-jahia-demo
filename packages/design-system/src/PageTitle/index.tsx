import clsx from "clsx";
import { Row } from "../Grid";
import classes from "./styles.module.css";

export const PageTitle = ({
	title,
	description,
	className,
}: {
	title: string;
	description?: string;
	className?: string;
}) => {
	return (
		<Row component="hgroup" className={clsx(classes.main, className)}>
			<h1 className={classes.title}>{title}</h1>
			{description && <p>{description}</p>}
		</Row>
	);
};
