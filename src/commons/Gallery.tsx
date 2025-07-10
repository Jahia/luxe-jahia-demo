import clsx from "clsx";
import classes from "./Gallery.module.css";

interface ImageDataProps {
  src: string;
  alt: string;
}

interface GalleryProps {
  data: ImageDataProps[];
  className?: string;
}

export const Gallery = ({ data, className }: GalleryProps) => {
  if (Array.isArray(data) === false || data.length === 0) {
    return null;
  }

  return (
    <>
      <figure className={clsx(classes.galleryItemMain, classes.galleryThumbnail, className)}>
        <img src={data[0].src} alt={data[0].alt} />
      </figure>
      <ul className={classes.galleryItems}>
        {data.slice(1).map((image, index) => {
          if (index < 4) {
            return (
              <li key={image.src} className={classes.galleryItem}>
                <figure className={classes.galleryThumbnail}>
                  <img src={image.src} alt={image.alt} />
                </figure>
              </li>
            )
          } else {
            return null;
          }
        })}
        {data.length > 5 && (
          <li className={classes.galleryMore}>
            <span>+{data.length - 5}</span>
          </li>
        )}
      </ul>
    </>
  );
};

// TODO
// - Create Dialog component
// - Import Dialog

