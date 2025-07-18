import { useEffect, useRef, useState } from "react";

/**
 * Progressive visibility for a list of keys, revealed one after another with a delay.
 * @param keys Array of unique keys (e.g. image.src)
 * @param delayMs Base delay (ms) between each reveal
 * @returns Array of visible keys
 */
export const useProgressiveVisibleList = (keys: string[], delayMs = 300) => {
	const [visible, setVisible] = useState<string[]>([]);
	const timeoutsRef = useRef<number[]>([]);

	useEffect(() => {
		// Clear all pending timeouts at the beginning of the effect
		timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		timeoutsRef.current = [];

		keys.forEach((key, i) => {
			if (!visible.includes(key)) {
				const timeoutId = window.setTimeout(
					() => {
						setVisible((prev) => [...prev, key]);
					},
					10 + i * delayMs,
				);
				timeoutsRef.current.push(timeoutId);
			}
		});

		// Remove keys that should not be displayed anymore
		// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
		setVisible((prev) => prev.filter((k) => keys.includes(k)));

		// Cleanup: clear all timeouts on effect cleanup
		return () => {
			timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
			timeoutsRef.current = [];
		};
	}, [keys.join("|")]); // join to avoid ref issues

	return visible;
};
