import React, { type ReactNode } from "react";

export type CommonsProps = {
	className?: string;
	children: ReactNode;
};

export interface ImageDataProps {
	src: string;
	alt: string;
}

type PictureSource = {
	media: string;
	srcSet: string;
};

export interface PictureProps
	extends Omit<React.ComponentPropsWithoutRef<"picture">, "className" | "onClick"> {
	image: ImageDataProps;
	sources?: PictureSource[];
	height?: string;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLPictureElement>;
}
