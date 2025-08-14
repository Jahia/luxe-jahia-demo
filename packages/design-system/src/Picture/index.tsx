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
	src: string;
	alt: string;
	sources?: PictureSource[];
	width?: number;
	height?: number;
}

export const Picture = ({ src, alt, sources, width, height, ...props }: PictureProps) => {
	return (
		<picture {...props}>
			{sources?.map((source) => (
				<source key={source.media} media={source.media} srcSet={source.srcSet} />
			))}
			<img src={src} alt={alt} width={width} height={height} />
		</picture>
	);
};
