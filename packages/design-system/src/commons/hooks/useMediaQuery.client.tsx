import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false); // always false (SSR)

	useEffect(() => {
		if (typeof window === "undefined") return;

		const media = window.matchMedia(query);
		const listener = () => setMatches(media.matches);

		setMatches(media.matches);

		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, [query]);

	return matches;
};
