import type { AnchorHTMLAttributes, FC, JSXElementConstructor, ReactNode } from "react";
import clsx from "clsx";
import classes from "./styles.module.css";
import { imageClass } from "../Image/index.tsx";

// `title` is both an anchor attribute and this card's heading, so the attribute is dropped: the
// card is handed its anchor attributes by whoever renders it — `<JLink asChild>` on the server, a
// plain `href` in a hydrated list — and neither can carry a heading through the same key.
interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
	title: ReactNode;
	image: JSXElementConstructor<{ className: string }>;
	description: ReactNode;
	footer: ReactNode;
}

export const ClickableCard: FC<Props> = ({
	title,
	image: Image,
	description,
	footer,
	className,
	...anchor
}) => (
	<a {...anchor} className={clsx(classes.card, className)}>
		<Image className={clsx(imageClass, classes.image)} />
		<h3>{title}</h3>
		<p>{description}</p>
		<strong>{footer}</strong>
	</a>
);
