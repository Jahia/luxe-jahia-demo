import classes from "./styles.module.css";
import clsx from "clsx";
import { Image } from "../Image";
import type { ImgHTMLAttributes } from "react";

interface SlideshowProps {
	images: ImgHTMLAttributes<HTMLImageElement>[];
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

	// Responsive slot hint: ≤576px → 90vw, otherwise 80vw
	// (keep in sync with grid breakpoints; effective with width-based srcset)
	const selectedImage = { ...images[selectedImageIndex], sizes: "(max-width: 576px) 90vw, 80vw" };

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
			<div className={classes.containerImage}>
				<button
					type="button"
					className={clsx(classes.button, classes.buttonNav)}
					onClick={() => navigateTo("prev")}
					aria-label="Previous image"
					disabled={selectedImageIndex === 0}
				>
					‹
				</button>

				<Image className={classes.image} {...selectedImage} />

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
