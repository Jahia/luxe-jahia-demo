// import React, { useEffect, useState } from "react";
// import clsx from "clsx";
// import classes from "./Gallery.client.module.css";
// import { Dialog, Image, Slideshow, ProgressiveList } from "design-system";
// import progressiveListClasses from "design-system/ProgressiveList/styles.module.css";
// import { useMediaQuery } from "~/commons/hooks/useMediaQuery.client";
//
// interface GalleryProps {
// 	title: string;
// 	images: React.ImgHTMLAttributes<HTMLImageElement>[];
// 	className?: string;
// }
//
// const visibilityDelayMs = 300;
//
// const GalleryClient = ({ title, images, className }: GalleryProps) => {
// 	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [hydrated, setHydrated] = useState(false);
//
// 	useEffect(() => {
// 		setHydrated(true);
// 	}, []);
//
// 	if (Array.isArray(images) === false || images.length === 0) {
// 		return null;
// 	}
//
// 	const mainImage = { ...images[0], sizes: "(max-width: 1320px) 100vw, 1320px" };
//
// 	const isMdAndUp = useMediaQuery("(min-width: 768px)");
// 	const isXlAndUp = useMediaQuery("(min-width: 1200px)");
//
// 	const thumbnailsCount = isXlAndUp ? 4 : isMdAndUp ? 2 : 1;
// 	const maxThumbnails = thumbnailsCount + 1;
//
// 	const thumbnailItems = images.slice(1, maxThumbnails);
// 	const hasMore = images.length > maxThumbnails;
//
// 	const openDialog = (index: number) => {
// 		setSelectedImageIndex(index);
// 		setIsOpen(true);
// 	};
//
// 	const closeDialog = (value: boolean) => {
// 		if (!value) {
// 			setSelectedImageIndex(null);
// 			setIsOpen(false);
// 		}
// 	};
//
// 	return (
// 		<div className={clsx(classes.main, className)}>
// 			<Image
// 				data-part="mainImage"
// 				onClick={() => openDialog(0)}
// 				className={classes.image}
// 				{...mainImage}
// 			/>
// 			{images.length > 1 && (
// 				<ul className={classes.thumbnails}>
// 					<ProgressiveList
// 						items={thumbnailItems}
// 						itemKey="src"
// 						delayMs={visibilityDelayMs}
// 						animationType="fadeIn"
// 						className={classes.item}
// 					>
// 						{({ src, ...rest }, index, key, style, className) => (
// 							<li
// 								key={key}
// 								className={className}
// 								style={style}
// 								onClick={() => openDialog(index + 1)}
// 							>
// 								<Image
// 									data-part="thumbImage"
// 									className={classes.thumbImage}
// 									src={src}
// 									sizes="320px"
// 									{...rest}
// 								/>
// 							</li>
// 						)}
// 					</ProgressiveList>
// 					{hydrated && hasMore && (
// 						<li
// 							className={clsx(
// 								classes.more,
// 								progressiveListClasses.item,
// 								progressiveListClasses.fadeIn,
// 							)}
// 							style={{
// 								animationDelay: `${thumbnailItems.length * visibilityDelayMs}ms`,
// 								animationFillMode: "both",
// 							}}
// 							onClick={() => openDialog(maxThumbnails)}
// 						>
// 							<span>+{images.length - maxThumbnails}</span>
// 						</li>
// 					)}
// 				</ul>
// 			)}
//
// 			<Dialog title={title} className={classes.dialog} isOpen={isOpen} setIsOpen={closeDialog}>
// 				<Slideshow
// 					images={images}
// 					selectedImageIndex={selectedImageIndex}
// 					setSelectedImageIndex={setSelectedImageIndex}
// 				/>
// 			</Dialog>
// 		</div>
// 	);
// };
//
// export default GalleryClient;
