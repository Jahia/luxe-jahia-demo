import clsx from "clsx";

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
    <header
      className={clsx(
        "lux-contentHeader",
        "container",
        "d-flex",
        "flex-column",
        "flex-lg-row",
        "mb-0",
        "pb-0",
        className,
      )}
    >
      <img
        className="lux-contentHeader_image"
        src={image.src}
        alt={image.alt}
        width="500"
        height="500"
      />
      <div className="d-flex flex-column flex-fill gap-5">
        <h1 className="lux-contentHeader_title display-2 d-flex align-items-center mb-0 ms-5">
          {title}
        </h1>
        {description && (
          <article className="lux-contentHeader_description bg-secondary">
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
