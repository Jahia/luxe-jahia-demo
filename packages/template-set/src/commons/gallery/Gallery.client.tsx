import React, { useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./Gallery.client.module.css";
import { Picture, Dialog, Slideshow, type PictureProps } from "design-system";

import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";
import { useProgressiveVisibleList } from "~/commons/hooks/useProgressiveVisibleList.client";

interface GalleryProps {
	title: string;
	images: PictureProps[];
	className?: string;
}

const visibilityDelayMs = 100;

const GalleryClient = ({ title, images, className }: GalleryProps) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	if (Array.isArray(images) === false || images.length === 0) {
		return null;
	}
	const mainImage = images[0];
	const isMdAndUp = useMediaQuery("(min-width: 768px)");
	const isXlAndUp = useMediaQuery("(min-width: 1200px)");

	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1;
	const maxThumbnails = thumbnailsCount + 1;

	const thumbKeys = images.slice(1, maxThumbnails).map((d) => d.src);
	const hasMore = images.length > maxThumbnails;
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
				src={mainImage.src}
				alt={mainImage.alt}
				sources={mainImage.sources}
				width={mainImage.width}
				height={mainImage.height}
				className={clsx(classes.picture, className)}
				onClick={() => openDialog(0)}
			/>
			{images.length > 1 && (
				<ul className={classes.thumbnails}>
					{images.slice(1, maxThumbnails).map(({ src, alt }, index) => {
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
					{hydrated && images.length > maxThumbnails && (
						<li
							className={clsx(classes.more, { [classes.visible]: visibleThumbs.includes("_more") })}
							onClick={() => openDialog(maxThumbnails)}
						>
							<span>+{images.length - maxThumbnails}</span>
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
					images={images}
					selectedImageIndex={selectedImageIndex}
					setSelectedImageIndex={setSelectedImageIndex}
				/>
			</Dialog>
		</div>
	);
};

export default GalleryClient;
