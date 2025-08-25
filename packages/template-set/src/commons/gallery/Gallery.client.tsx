import React, { useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./Gallery.client.module.css";
import { Dialog, Image, Slideshow } from "design-system";

import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";
import { useProgressiveVisibleList } from "~/commons/hooks/useProgressiveVisibleList.client";

interface GalleryProps {
	title: string;
	images: React.ImgHTMLAttributes<HTMLImageElement>[];
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

	// Responsive slot hint: ≤1320px → 100vw, otherwise ≈1320px
	// (keep in sync with grid breakpoints; effective with width-based srcset)
	const mainImage = { ...images[0], sizes: "(max-width: 1320px) 100vw, 1320px" };

	const isMdAndUp = useMediaQuery("(min-width: 768px)");
	const isXlAndUp = useMediaQuery("(min-width: 1200px)");

	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1;
	const maxThumbnails = thumbnailsCount + 1;

	const thumbKeys = images
		.slice(1, maxThumbnails)
		.map((d) => d.src)
		.filter((s) => typeof s === "string");
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
			<Image
				data-part="mainImage"
				onClick={() => openDialog(0)}
				className={classes.image}
				{...mainImage}
			/>
			{images.length > 1 && (
				<ul className={classes.thumbnails}>
					{images.slice(1, maxThumbnails).map(({ src, ...rest }, index) => {
						const actualIndex = index + 1; // Fix index offset
						if (index < 4) {
							return (
								<li
									key={src}
									className={clsx(
										classes.item,
										src && visibleThumbs.includes(src) && classes.visible,
									)}
									onClick={() => openDialog(actualIndex)}
								>
									<Image
										data-part="thumbImage"
										className={classes.thumbImage}
										src={src}
										sizes="320px"
										{...rest}
									/>
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

			<Dialog title={title} className={classes.dialog} isOpen={isOpen} setIsOpen={closeDialog}>
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
