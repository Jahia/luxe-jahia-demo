import type { FC, JSXElementConstructor, ReactNode } from "react";
import clsx from "clsx";
import classes from "./styles.module.css";
import { imageClass } from "../Image/index.tsx";

interface Props {
	href: string;
	title: ReactNode;
	image: JSXElementConstructor<{ className: string }>;
	description: ReactNode;
	footer: ReactNode;
}

export const ClickableCard: FC<Props> = ({ href, title, image: Image, description, footer }) => (
	<a href={href} className={classes.card}>
		<Image className={clsx(imageClass, classes.image)} />
		<h3>{title}</h3>
		<p>{description}</p>
		<strong>{footer}</strong>
	</a>
);
