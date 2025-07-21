// Utility function to get coordinates from an address using Nominatim API
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
	const response = await fetch(
		`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`,
	);
	const data = await response.json();
	if (data && data.length > 0) {
		return {
			lat: parseFloat(data[0].lat),
			lng: parseFloat(data[0].lon),
		};
	}
	throw new Error("Address not found");
};
