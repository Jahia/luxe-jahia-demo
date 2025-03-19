import clsx from "clsx";
import classes from "./ContentHeader.module.css";
/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const ContentHeader = ({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
  className?: string;
}) => {
  return (
    <header className={clsx(classes.main, className)}>
      <img className={classes.image} src={image.src} alt={image.alt} width="500" height="500" />
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>
        {description && (
          <article className={classes.description}>
            {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
            <unwanteddiv
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </article>
        )}
      </div>
    </header>
  );
};
