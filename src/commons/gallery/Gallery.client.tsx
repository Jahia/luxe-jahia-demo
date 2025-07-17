import React, { useState } from "react";
import clsx from "clsx";
import classes from "./Gallery.client.module.css";
import { DialogClient } from "~/commons/Dialog.client";
import { Slideshow } from "~/commons/gallery/Slideshow.client";
import type { PictureProps } from "~/commons/types";
import { Picture } from "~/commons/Picture";
import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";

interface GalleryProps {
	data: PictureProps[];
	className?: string;
}

const GalleryClient = ({ data, className }: GalleryProps) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	if (Array.isArray(data) === false || data.length === 0) {
		return null;
	}

	const isMdAndUp = useMediaQuery("(min-width: 768px)");
	const isXlAndUp = useMediaQuery("(min-width: 1200px)");

	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1; // 4 vignettes en sm+, 2 vignettes sinon
	const maxThumbnails = thumbnailsCount + 1; // 1re image déjà affichée, +N ensuite

	const openDialog = (index: number) => {
		setSelectedImageIndex(index);
		setIsOpen(true);
	};

	const closeDialog = () => {
		setSelectedImageIndex(null);
		setIsOpen(false);
	};

	return (
		<>
			<Picture
				image={data[0].image}
				sources={data[0].sources}
				height={data[0].height}
				className={clsx(classes.picture, className)}
				onClick={() => openDialog(0)}
			/>
			{data.length > 1 && (
				<ul className={classes.thumbnails}>
					{data.slice(1, maxThumbnails).map(({ image }, index) => {
						const actualIndex = index + 1; // Fix index offset
						if (index < 4) {
							return (
								<li
									key={image.src}
									className={classes.item}
									onClick={() => openDialog(actualIndex)}
								>
									<img src={image.src} alt={image.alt} />
								</li>
							);
						} else {
							return null;
						}
					})}
					{data.length > maxThumbnails && (
						<li className={classes.more} onClick={() => openDialog(maxThumbnails)}>
							<span>+{data.length - maxThumbnails}</span>
						</li>
					)}
				</ul>
			)}

			<DialogClient
				className={clsx(classes.dialog, className)}
				isOpen={isOpen}
				onClose={closeDialog}
			>
				<Slideshow
					data={data}
					selectedImageIndex={selectedImageIndex}
					setSelectedImageIndex={setSelectedImageIndex}
					onClose={closeDialog}
				/>
			</DialogClient>
		</>
	);
};

export default GalleryClient;

// import React, { useState, useEffect } from "react";
// import clsx from "clsx";
// import classes from "./Gallery.client.module.css";
// import { DialogClient } from "~/commons/Dialog.client";
// import { Slideshow } from "~/commons/gallery/Slideshow.client";
// import type { PictureProps } from "~/commons/types";
// import { Picture } from "~/commons/Picture";
// import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";
//
// interface GalleryProps {
// 	data: PictureProps[];
// 	className?: string;
// }
//
// interface AnimatedThumb {
// 	src: string;
// 	leaving?: boolean;
// }
//
// const GalleryClient = ({ data, className }: GalleryProps) => {
// 	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
// 	const [isOpen, setIsOpen] = useState(false);
//
// 	const isMdAndUp = useMediaQuery("(min-width: 768px)");
// 	const isXlAndUp = useMediaQuery("(min-width: 1200px)");
//
// 	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1;
// 	const maxThumbnails = thumbnailsCount + 1;
//
// 	// --- Gestion animée des thumbnails ---
// 	// On garde la liste à afficher, même si data change (pour pouvoir animer la sortie)
// 	const [animatedThumbs, setAnimatedThumbs] = useState<AnimatedThumb[]>([]);
//
// 	// Synchronise à l'entrée, puis détecte les suppressions pour animer la sortie
// 	useEffect(() => {
// 		const visibleImages = data.slice(1, maxThumbnails).map((d) => ({ src: d.image.src }));
// 		// Ajout des nouveaux (sans animation)
// 		setAnimatedThumbs((prev) => {
// 			// Marque ceux qui doivent partir
// 			const next = prev
// 				.filter((t) => visibleImages.find((v) => v.src === t.src)) // garde ceux qui restent
// 				.concat(
// 					visibleImages
// 						.filter((v) => !prev.find((t) => t.src === v.src))
// 						.map((v) => ({ src: v.src })),
// 				);
// 			// Marque en leaving ceux qui doivent partir
// 			prev.forEach((t) => {
// 				if (!visibleImages.find((v) => v.src === t.src)) {
// 					const idx = next.findIndex((x) => x.src === t.src);
// 					if (idx > -1) next[idx] = { ...next[idx], leaving: true };
// 				}
// 			});
// 			return next;
// 		});
// 	}, [data, maxThumbnails]);
//
// 	// Supprime du DOM les thumbs marqués 'leaving' après anim
// 	const handleAnimationEnd = (src: string) => {
// 		setAnimatedThumbs((prev) => prev.filter((t) => !(t.src === src && t.leaving)));
// 	};
//
// 	// ---
//
// 	if (!Array.isArray(data) || data.length === 0) return null;
//
// 	const openDialog = (index: number) => {
// 		setSelectedImageIndex(index);
// 		setIsOpen(true);
// 	};
//
// 	const closeDialog = () => {
// 		setSelectedImageIndex(null);
// 		setIsOpen(false);
// 	};
//
// 	return (
// 		<>
// 			<Picture
// 				image={data[0].image}
// 				sources={data[0].sources}
// 				height={data[0].height}
// 				className={clsx(classes.picture, className)}
// 				onClick={() => openDialog(0)}
// 			/>
// 			{data.length > 1 && (
// 				<ul className={classes.thumbnails}>
// 					{animatedThumbs.map((t, idx) => {
// 						const imageData =
// 							data.slice(1, maxThumbnails).find((d) => d.image.src === t.src) ||
// 							data.slice(1).find((d) => d.image.src === t.src); // pour l'animation leave
// 						if (!imageData) return null;
// 						const actualIndex = data.findIndex((d) => d.image.src === t.src);
//
// 						return (
// 							<li
// 								key={t.src}
// 								className={clsx(classes.item, t.leaving && classes.itemLeaving)}
// 								onClick={() => openDialog(actualIndex)}
// 								onAnimationEnd={() => t.leaving && handleAnimationEnd(t.src)}
// 							>
// 								<img src={imageData.image.src} alt={imageData.image.alt} />
// 							</li>
// 						);
// 					})}
// 					{data.length > maxThumbnails && (
// 						<li className={classes.more} onClick={() => openDialog(maxThumbnails)}>
// 							<span>+{data.length - maxThumbnails}</span>
// 						</li>
// 					)}
// 				</ul>
// 			)}
//
// 			<DialogClient
// 				className={clsx(classes.dialog, className)}
// 				isOpen={isOpen}
// 				onClose={closeDialog}
// 			>
// 				<Slideshow
// 					data={data}
// 					selectedImageIndex={selectedImageIndex}
// 					setSelectedImageIndex={setSelectedImageIndex}
// 					onClose={closeDialog}
// 				/>
// 			</DialogClient>
// 		</>
// 	);
// };
//
// export default GalleryClient;
