import { useState, useEffect, useCallback } from "react";

type ParamValue = string | number | Array<string | number>;

/**
 * Handles building and updating a target URL's searchParams on the client.
 * Safe in SSR — no window access until hydration.
 */
export function useFormQuerySync(target: string | null) {
	const [url, setUrl] = useState<URL | null>(null);

	// Init on hydration
	useEffect(() => {
		if (!target || typeof window === "undefined") return;
		setUrl(new URL(target, window.location.origin));
	}, [target]);

	/**
	 * Sets one or more values for a given param.
	 * - If value is empty array or empty string → deletes the param
	 * - If array → appends multiple values (?key=a&key=b)
	 * - If scalar → sets single value
	 */
	const updateParam = useCallback((name: string, value: ParamValue) => {
		setUrl((current) => {
			if (!current) return current;

			const updated = new URL(current.toString());
			const params = updated.searchParams;

			// Always remove previous values
			params.delete(name);

			// Add new ones
			if (
				(Array.isArray(value) && value.length === 0) ||
				(typeof value === "string" && value === "")
			) {
				// Don't re-add if empty
				return updated;
			}

			if (Array.isArray(value)) {
				value.forEach((v) => {
					params.append(name, String(v));
				});
			} else {
				params.set(name, String(value));
			}

			return updated;
		});
	}, []);

	const getUrlString = useCallback(() => {
		return url?.toString() ?? "";
	}, [url]);

	return { updateParam, getUrlString };
}
