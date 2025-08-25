/**
 * Shared default candidate widths (CSS px) for responsive image generation.
 *
 * Exact values (ascending): [600, 900, 1200, 1536, Infinity]
 *
 * Usage
 * - imageNodeToImgProps:
 *   - If `config.widths` is omitted, these become the `w` candidates.
 *   - If `config.baseWidth` is omitted, `DEFAULT_WIDTHS[0]` is used as the base width.
 *
 * Breakpoint rationale (Material UI defaults)
 * - 600  (sm) → narrow phone/column
 * - 900  (md) → large phone / small tablet
 * - 1200 (lg) → tablet / laptop content column
 * - 1536 (xl) → wide desktop column / HiDPI
 * - Infinity  → sentinel for “use intrinsic/original width” when known
 *
 * Notes
 * - All values are **CSS pixels** (not device pixels).
 * - Candidates are clamped to the intrinsic width when available.
 * - Keep the list in ascending order and place `Infinity` last.
 * - No URL with `w=Infinity` is emitted; if the intrinsic width is unknown, the entry is ignored.
 */
export const DEFAULT_WIDTHS: number[] = [600, 900, 1200, 1536, Infinity];
