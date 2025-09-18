import clsx from "clsx";
import classes from "./styles.module.css";
import { Image } from "../Image";
import type { ImgHTMLAttributes } from "react";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const ContentHeader = ({
	title,
	description,
	image,
	className,
}: {
	title: string;
	description?: string;
	image: ImgHTMLAttributes<HTMLImageElement>;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			<Image className={clsx(classes.image, image.className)} {...image} />
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
