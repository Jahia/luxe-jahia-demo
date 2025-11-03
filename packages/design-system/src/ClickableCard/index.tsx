import type { FC, JSXElementConstructor, ReactNode } from "react";
import classes from "./styles.module.css";

interface Props {
	href: string;
	title: ReactNode;
	image: JSXElementConstructor<{ className: string }>;
	description: ReactNode;
	footer: ReactNode;
}

export const ClickableCard: FC<Props> = ({ href, title, image: Image, description, footer }) => (
	<a href={href} className={classes.card}>
		<Image className={classes.image} />
		<h4>{title}</h4>
		<p>{description}</p>
		<strong>{footer}</strong>
	</a>
);
