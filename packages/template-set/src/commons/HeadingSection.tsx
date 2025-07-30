import clsx from "clsx";
import { Row } from "~/commons/grid";
import classes from "./HeadingSection.module.css";

export const HeadingSection = ({ title, className }: { title: string; className?: string }) => {
	return (
		<Row component="header" className={clsx(classes.main, className)}>
			<h2 className={classes.title}>{title}</h2>
		</Row>
	);
};
