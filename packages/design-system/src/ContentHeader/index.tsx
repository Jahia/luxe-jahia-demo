import clsx from "clsx";
import classes from "./styles.module.css";
import { Image, type ImageProps } from "../Image";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const ContentHeader = ({
	title,
	description,
	image: { className: imageClassName, ...imageProps },
	className,
}: {
	title: string;
	description?: string;
	image: ImageProps;
	className?: string;
}) => {
	return (
		<header className={clsx(classes.main, className)}>
			{/* A content header is above the fold by definition: its image is the LCP candidate */}
			<Image className={clsx(classes.image, imageClassName)} priority {...imageProps} />
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
