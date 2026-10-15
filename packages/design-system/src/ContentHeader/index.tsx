import clsx from "clsx";
import classes from "./styles.module.css";
import { imageClass } from "../Image/index.tsx";
import type { JSXElementConstructor } from "react";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const ContentHeader = ({
	title,
	description,
	image: Image,
	className,
}: {
	title: string;
	description?: string;
	/**
	 * The header image. The header owns its layout class and its loading priority — a content
	 * header is above the fold by definition, so its image is the LCP candidate — and passes both
	 * to the slot. `preload` is named after the platform prop the slot forwards it to.
	 */
	image: JSXElementConstructor<{ className: string; preload: boolean }>;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			<Image className={clsx(imageClass, classes.image)} preload />
			<div className={classes.content}>
				<h1 className={classes.title}>{title}</h1>
				{description && (
					<article
						className={classes.description}
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					/>
				)}
			</div>
		</header>
	);
};
