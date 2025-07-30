import type { PictureProps } from "~/commons/types";
import classes from "./Slideshow.client.module.css";
import clsx from "clsx";
import { Picture } from "~/commons/Picture";
import React from "react";

interface SlideshowProps {
	data: PictureProps[];
	selectedImageIndex: number | null;
	setSelectedImageIndex: (index: number | null) => void;
	onClose: () => void;
	className?: string;
}

export const Slideshow = ({
	data,
	selectedImageIndex,
	setSelectedImageIndex,
	onClose,
}: SlideshowProps) => {
	if (
		!data?.length ||
		selectedImageIndex === null ||
		selectedImageIndex < 0 ||
		selectedImageIndex >= data.length
	) {
		return null;
	}

	const navigateTo = (direction: "prev" | "next") => {
		if (selectedImageIndex === null) return;

		if (direction === "prev" && selectedImageIndex > 0) {
			setSelectedImageIndex(selectedImageIndex - 1);
		} else if (direction === "next" && selectedImageIndex < data.length - 1) {
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
		<div onKeyDown={handleKeyDown}>
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
					image={data[selectedImageIndex].image}
					sources={data[selectedImageIndex].sources}
					height={data[selectedImageIndex].height}
				/>
				{/*<img src={data[selectedImageIndex].src} alt={data[selectedImageIndex].alt} />*/}

				<button
					type="button"
					className={clsx(classes.button, classes.buttonNav)}
					onClick={() => navigateTo("next")}
					aria-label="Next image"
					disabled={selectedImageIndex === data.length - 1}
				>
					›
				</button>
			</div>

			<div className={classes.info}>
				<span>
					{selectedImageIndex + 1} / {data.length}
				</span>
				<p>{data[selectedImageIndex].image.alt}</p>
			</div>
		</div>
	);
};
