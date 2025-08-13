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
	height?: string;
}

export const Picture = ({ src, alt, sources, height, ...props }: PictureProps) => {
	return (
		<picture {...props}>
			{sources?.map((source) => (
				<source key={source.media} media={source.media} srcSet={source.srcSet} />
			))}
			<img src={src} alt={alt} height={height} style={{ width: "100%" }} />
		</picture>
	);
};
