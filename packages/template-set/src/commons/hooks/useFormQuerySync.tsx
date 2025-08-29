import { useCallback, useEffect, useState } from "react";

/**
 * Handles building and updating a target URL's searchParams on the client.
 * Safe in SSR — no window access until hydration.
 */
export function useFormQuerySync(target: string | null) {
	const [url, setUrl] = useState<URL | null>(null);

	useEffect(() => {
		if (!target || typeof window === "undefined") return;
		setUrl(new URL(target, window.location.origin));
	}, [target]);

	const updateParam = useCallback((name: string, value: string) => {
		setUrl((current) => {
			if (!current) return current;
			const updated = new URL(current.toString()); // clone to avoid mutation
			if (value === "") {
				updated.searchParams.delete(name);
			} else {
				updated.searchParams.set(name, value);
			}
			return updated;
		});
	}, []);

	const getUrlString = useCallback(() => {
		return url?.toString() ?? "";
	}, [url]);

	return { updateParam, getUrlString };
}
