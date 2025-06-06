import clsx from "clsx";
import classes from "./Figure.module.css";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  layout?: "imgCentered" | "imgLeft" | "imgRight" | "imgFull";
  className?: string;
}

export const Figure = ({ src, alt, layout = "imgCentered", caption, className }: FigureProps) => {
  if (!src) {
    return null;
  }

  return (
    <figure className={clsx(classes.figure, classes[layout], className)}>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
