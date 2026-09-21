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
	 * The header image, rendered with the class and the loading attributes the header owns: a
	 * content header is above the fold, so its image is the LCP candidate.
	 */
	image: JSXElementConstructor<{ className: string; loading: "eager"; fetchPriority: "high" }>;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			<Image className={classes.image} loading="eager" fetchPriority="high" />
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
