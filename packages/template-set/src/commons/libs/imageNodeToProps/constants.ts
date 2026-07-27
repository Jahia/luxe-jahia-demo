/**
 * Default candidate widths (CSS px) for responsive image generation,
 * derived from the Material UI breakpoints:
 * 600 (sm), 900 (md), 1200 (lg), 1536 (xl).
 *
 * Candidates are clamped to the intrinsic width when it is known. The intrinsic
 * width may also be added as an extra candidate when it is close to the
 * largest requested width (see `imageNodeToImgProps`), avoiding huge master
 * assets while keeping a sensible top-end candidate for high-density screens.
 */
export const DEFAULT_WIDTHS: number[] = [600, 900, 1200, 1536];
