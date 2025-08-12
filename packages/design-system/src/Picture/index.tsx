import React from "react";

export interface ImageDataProps {
	src: string;
	alt: string;
}

type PictureSource = {
	media: string;
	srcSet: string;
};

export interface PictureProps extends React.ComponentPropsWithoutRef<"picture"> {
	image: ImageDataProps;
	sources?: PictureSource[];
	height?: string;
}

export const Picture = ({ image, sources, height, ...props }: PictureProps) => {
	return (
		<picture {...props}>
			{sources?.map((source) => (
				<source key={source.media} media={source.media} srcSet={source.srcSet} />
			))}
			<img src={image.src} alt={image.alt} height={height} style={{ width: "100%" }} />
		</picture>
	);
};
