import clsx from "clsx";

const defaultWidth = 458;

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  layout?: "imgCentered" | "imgLeft" | "imgRight" | "imgFull";
  className?: string;
}

const CSSfigcaption = {
  imgFull: ["text-center"],
  imgLeft: ["flex-fill", "align-self-center", "ms-5"],
  imgRight: ["flex-fill", "align-self-center", "text-end", "me-5"],
  imgCentered: [],
};

export const Figure = ({ src, alt, layout = "imgCentered", caption, className }: FigureProps) => {
  if (!src) {
    return null;
  }

  return (
    <figure
      className={clsx(
        {
          "d-flex": layout === "imgLeft" || layout === "imgRight" || layout === "imgCentered",
        },
        "lux-figure",
        "mb-3",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={layout === "imgFull" ? "100%" : `${defaultWidth}px`}
        className={clsx("lux-image", {
          "lux-image_full": layout === "imgFull",
        })}
      />
      {caption && <figcaption className={clsx(CSSfigcaption[layout])}>{caption}</figcaption>}
    </figure>
  );
};
