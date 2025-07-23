import React, { useEffect, useState } from "react";
import { geocodeAddress } from "~/commons/map/geocodeAddress";
import "leaflet/dist/leaflet.css";
import classes from "~/commons/map/MapWithPin.client.module.css";
import type { LeafletMapClientProps } from "~/commons/map/LeafletMap.client";
import clsx from "clsx";

// const LeafletMapClient = React.lazy(() => import("~/commons/map/LeafletMap.client"));
export type AddressItem = {
	id: string;
	label: string; // For popup (e.g. agency name or address)
	address: string;
};

type Coordinates = {
	lat: number;
	lng: number;
	label: string; // To display in popup
};

type MapWithPinClientProps = {
	addresses: AddressItem[];
	className?: string; // Optional className for custom styling
};

const MapWithPinClient: React.FC<MapWithPinClientProps> = ({ addresses, className }) => {
	// State for coordinates (latitude and longitude)
	const [coords, setCoords] = useState<Coordinates[]>([]);
	const [LeafletMapClient, setLeafletMapClient] =
		useState<React.ComponentType<LeafletMapClientProps> | null>(null);

	// State to check if we are on client-side (for SSR compatibility)
	// const [isClient, setIsClient] = useState(false);
	// State for error message
	const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	// Ensure map is only rendered on client side
	// 	setIsClient(true);
	// }, []);

	useEffect(() => {
		// Import dynamically ONLY on client
		import("~/commons/map/LeafletMap.client")
			.then((mod) => setLeafletMapClient(() => mod.default))
			.catch((e) => {
				console.error(e);
				setError("Erreur lors du chargement de la carte.");
			});
	}, []);

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
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (e) {
					return null;
				}
			}),
		)
			.then((results) => {
				const filtered = results.filter((item): item is Coordinates => !!item);
				setCoords(filtered);
				if (filtered.length < addresses.length) {
					setError("Certaines adresses n'ont pas pu être localisées.");
				}
			})
			.catch(() => setError("Erreur lors du géocodage."));
	}, [addresses]);

	// if (!isClient) return <div>Chargement…</div>; // Do not render on server
	if (!LeafletMapClient) return <div>Chargement de la carte…</div>;
	return (
		<div className={clsx(classes.mapWrapper, className)}>
			<LeafletMapClient pins={coords} className={clsx(classes.mapContainer, className)} />
			{error && <div className={classes.errorOverlay}>{error}</div>}
		</div>
	);
};

export default MapWithPinClient;
