import { t } from "i18next";

const cache: Map<string, { lat: number; lng: number; expiry: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // Cache entries expire after 5 minutes

// Utility function to get coordinates from an address using Nominatim API
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
	const now = Date.now();

	// Check if the address is in the cache and still valid
	if (cache.has(address)) {
		const cachedEntry = cache.get(address);
		if (cachedEntry && cachedEntry.expiry > now) {
			return { lat: cachedEntry.lat, lng: cachedEntry.lng };
		} else {
			cache.delete(address); // Remove expired entry
		}
	}

	// Make the API call if not cached
	const response = await fetch(
		`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`,
	);
	const data = await response.json();
	if (data && data.length > 0) {
		const result = {
			lat: parseFloat(data[0].lat),
			lng: parseFloat(data[0].lon),
		};

		// Store the result in the cache with an expiry time
		cache.set(address, { ...result, expiry: now + CACHE_TTL });

		return result;
	}
	throw new Error(t("maps.error.addressNotFound"));
};
