import clsx from "clsx";
import classes from "./styles.module.css";
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
	 * The header image. The header owns its layout class and its loading
	 * priority — a content header is above the fold by definition, so its image
	 * is the LCP candidate — and passes both to the slot.
	 */
	image: JSXElementConstructor<{ className: string; priority: boolean }>;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			<Image className={classes.image} priority />
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
