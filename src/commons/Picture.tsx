import type { PictureProps } from "~/commons/types";

export const Picture = ({ image, sources, height, className, onClick }: PictureProps) => {
	return (
		<picture onClick={onClick} className={className}>
			{sources?.map((source) => (
				<source key={source.media} media={source.media} srcSet={source.srcSet} />
			))}
			<img src={image.src} alt={image.alt} height={height} />
		</picture>
	);
};
