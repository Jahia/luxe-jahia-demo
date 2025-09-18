import React, { useEffect, useState } from "react";
import { geocodeAddress } from "./geocodeAddress.ts";
import "leaflet/dist/leaflet.css";
import classes from "./styles.module.css";

export type AddressItem = {
	id: string;
	label: string; // For popup (e.g. agency name or address)
	address: string;
};

export type Pin = {
	lat: number;
	lng: number;
	label: string;
};

export type LeafletMapProps = {
	pins: Pin[];
	className?: string; // Optional className for custom styling
};

type Coordinates = {
	lat: number;
	lng: number;
	label: string; // To display in popup
};

type MapWithPinProps = {
	addresses: AddressItem[];
	loadingText?: string;
	errorMessages?: {
		mapLoading?: string; // Template avec {{error}}
		addressNotFound?: string;
		addressGeo?: string;
	};
};

const MapWithPin: React.FC<MapWithPinProps> = ({
	addresses,
	loadingText = "Loading map...",
	errorMessages = {},
}) => {
	// State for coordinates (latitude and longitude)
	const [coords, setCoords] = useState<Coordinates[]>([]);
	const [LeafletMapClient, setLeafletMapClient] = useState<React.ComponentType<LeafletMapProps>>();
	// State for error message
	const [error, setError] = useState<string>();

	useEffect(() => {
		// Import dynamically ONLY on client
		import("./LeafletMap.tsx")
			.then((mod) => setLeafletMapClient(() => mod.default))
			.catch((e) => {
				console.error(e);
				setError(
					errorMessages.mapLoading?.replace("{{error}}", e.message) ||
						`Error loading map: ${e.message}`,
				);
			});
	}, [errorMessages]);

	// This code is not scalable and is provided as an example only.
	// The recommended approach would be to implement a Drools rule or use a "SelectorType" in Jahia
	// to calculate and persist the latitude and longitude directly in the content,
	// instead of computing it on the fly in the frontend.
	useEffect(() => {
		// Geocode all addresses, and store the found coordinates with their labels
		Promise.all(
			addresses.map(async (item) => {
				try {
					const { lat, lng } = await geocodeAddress(item.address);
					return { lat, lng, label: item.label };
				} catch {
					return null;
				}
			}),
		)
			.then((results) => {
				const filtered = results.filter((item): item is Coordinates => !!item);
				setCoords(filtered);
				if (filtered.length < addresses.length) {
					setError(errorMessages.addressNotFound || "Some addresses could not be found");
				}
			})
			.catch(() => setError(errorMessages.addressGeo || "Error during geocoding"));
	}, [addresses]);

	if (!LeafletMapClient) return <div>{loadingText}</div>;
	return (
		<div className={classes.mapWrapper}>
			<LeafletMapClient pins={coords} className={classes.mapContainer} />
			{error && <div className={classes.errorOverlay}>{error}</div>}
		</div>
	);
};

export default MapWithPin;
