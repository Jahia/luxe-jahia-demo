import type { JCRNodeWrapper } from "org.jahia.services.content";

// Common pieces
type SrcCommon = { media: string; node?: JCRNodeWrapper };
type WithSources<T extends object> = { sources?: Array<T> };

/** Base width is defined → sources can set width, but not height */
type IC_Width = {
	baseWidth: number;
	baseHeight?: undefined;
} & WithSources<SrcCommon & { width: number; height?: never }>;

/** Base height is defined → sources can set height, but not width */
type IC_Height = {
	baseWidth?: undefined;
	baseHeight: number;
} & WithSources<SrcCommon & { height: number; width?: never }>;

/** Both base width & height are defined → sources can set both */
type IC_Both = {
	baseWidth: number;
	baseHeight: number;
} & WithSources<SrcCommon & { width: number; height: number }>;

/** Neither base width nor height → sources can't set either */
type IC_None = {
	baseWidth?: undefined;
	baseHeight?: undefined;
} & WithSources<SrcCommon>;

export type ImageConfig = IC_Width | IC_Height | IC_Both | IC_None;

export type ImageProps = {
	src: string;
	alt: string;
	srcSet?: string;
	sizes?: string;
	sources?: Array<{ media: string; srcSet: string }>;
	width?: number;
	height?: number;
};
