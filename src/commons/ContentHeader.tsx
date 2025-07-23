import clsx from "clsx";
import classes from "./ContentHeader.module.css";
import type { ImageDataProps } from "~/commons/types";
/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const ContentHeader = ({
	title,
	description,
	image,
	className,
}: {
	title: string;
	description?: string;
	image: ImageDataProps;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			<img className={classes.image} src={image.src} alt={image.alt} width="500" height="500" />
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
