/**
 * Default candidate widths (CSS px) for responsive image generation,
 * derived from the Material UI breakpoints:
 * 600 (sm), 900 (md), 1200 (lg), 1536 (xl).
 *
 * Candidates are clamped to the intrinsic width when it is known, and the
 * intrinsic width itself is always added as an extra candidate (see
 * `imageNodeToImgProps`), so images never upscale and the original size
 * remains available to high-density screens.
 */
export const DEFAULT_WIDTHS: number[] = [600, 900, 1200, 1536];
