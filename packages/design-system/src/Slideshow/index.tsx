import React from "react";
import classes from "./styles.module.css";
import clsx from "clsx";
import { Picture, type PictureProps } from "../Picture";

interface SlideshowProps {
	images: PictureProps[];
	selectedImageIndex: number | null;
	setSelectedImageIndex: (index: number | null) => void;
}

export const Slideshow = ({
	images,
	selectedImageIndex,
	setSelectedImageIndex,
}: SlideshowProps) => {
	if (
		!images?.length ||
		selectedImageIndex === null ||
		selectedImageIndex < 0 ||
		selectedImageIndex >= images.length
	) {
		return null;
	}

	const selectedImage = images[selectedImageIndex];

	const navigateTo = (direction: "prev" | "next") => {
		if (selectedImageIndex === null) return;

		if (direction === "prev" && selectedImageIndex > 0) {
			setSelectedImageIndex(selectedImageIndex - 1);
		} else if (direction === "next" && selectedImageIndex < images.length - 1) {
			setSelectedImageIndex(selectedImageIndex + 1);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case "ArrowLeft":
				navigateTo("prev");
				break;
			case "ArrowRight":
				navigateTo("next");
				break;
		}
	};

	return (
		<div className={classes.container} onKeyDown={handleKeyDown}>
			<div className={classes.contentImage}>
				<button
					type="button"
					className={clsx(classes.button, classes.buttonNav)}
					onClick={() => navigateTo("prev")}
					aria-label="Previous image"
					disabled={selectedImageIndex === 0}
				>
					‹
				</button>

				<Picture
					src={selectedImage.src}
					alt={selectedImage.alt}
					sources={selectedImage.sources}
					width={selectedImage.width}
					height={selectedImage.height}
				/>

				<button
					type="button"
					className={clsx(classes.button, classes.buttonNav)}
					onClick={() => navigateTo("next")}
					aria-label="Next image"
					disabled={selectedImageIndex === images.length - 1}
				>
					›
				</button>
			</div>

			<div className={classes.info}>
				<span>
					{selectedImageIndex + 1} / {images.length}
				</span>
			</div>
		</div>
	);
};
