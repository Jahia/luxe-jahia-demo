import React, { useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./Gallery.client.module.css";
import { Picture, Dialog, Slideshow, type PictureProps } from "design-system";

import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";
import { useProgressiveVisibleList } from "~/commons/hooks/useProgressiveVisibleList.client";

interface GalleryProps {
	title: string;
	data: PictureProps[];
	className?: string;
}

const visibilityDelayMs = 100;

const GalleryClient = ({ title, data, className }: GalleryProps) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	if (Array.isArray(data) === false || data.length === 0) {
		return null;
	}

	const isMdAndUp = useMediaQuery("(min-width: 768px)");
	const isXlAndUp = useMediaQuery("(min-width: 1200px)");

	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1;
	const maxThumbnails = thumbnailsCount + 1;

	const thumbKeys = data.slice(1, maxThumbnails).map((d) => d.src);
	const hasMore = data.length > maxThumbnails;
	const allKeys = hasMore ? [...thumbKeys, "_more"] : thumbKeys;

	const visibleThumbs = useProgressiveVisibleList(allKeys, visibilityDelayMs);

	const openDialog = (index: number) => {
		setSelectedImageIndex(index);
		setIsOpen(true);
	};

	const closeDialog = (value: boolean) => {
		if (!value) {
			setSelectedImageIndex(null);
			setIsOpen(false);
		}
	};

	return (
		<div className={clsx(classes.main, className)}>
			<Picture
				src={data[0].src}
				alt={data[0].alt}
				sources={data[0].sources}
				height={data[0].height}
				className={clsx(classes.picture, className)}
				onClick={() => openDialog(0)}
			/>
			{data.length > 1 && (
				<ul className={classes.thumbnails}>
					{data.slice(1, maxThumbnails).map(({ src, alt }, index) => {
						const actualIndex = index + 1; // Fix index offset
						if (index < 4) {
							return (
								<li
									key={src}
									className={clsx(classes.item, {
										[classes.visible]: visibleThumbs.includes(src),
									})}
									onClick={() => openDialog(actualIndex)}
								>
									<img src={src} alt={alt} />
								</li>
							);
						} else {
							return null;
						}
					})}
					{hydrated && data.length > maxThumbnails && (
						<li
							className={clsx(classes.more, { [classes.visible]: visibleThumbs.includes("_more") })}
							onClick={() => openDialog(maxThumbnails)}
						>
							<span>+{data.length - maxThumbnails}</span>
						</li>
					)}
				</ul>
			)}

			<Dialog
				title={title}
				className={clsx(classes.dialog, className)}
				isOpen={isOpen}
				setIsOpen={closeDialog}
			>
				<Slideshow
					data={data}
					selectedImageIndex={selectedImageIndex}
					setSelectedImageIndex={setSelectedImageIndex}
				/>
			</Dialog>
		</div>
	);
};

export default GalleryClient;
