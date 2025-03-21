import clsx from "clsx";
import classes from "./Picture.module.css";

interface PictureProps {
  image: { src: string; alt: string };
  sources?: { media: string; srcSet: string }[];
  height?: string;
  className?: string;
}

export const Picture = ({ image, sources, height, className }: PictureProps) => {
  return (
    <picture>
      {sources?.map((source) => (
        <source key={source.media} media={source.media} srcSet={source.srcSet} />
      ))}
      <img
        src={image.src}
        alt={image.alt}
        className={clsx(classes.image, className)}
        height={height}
      />
    </picture>
  );
};
