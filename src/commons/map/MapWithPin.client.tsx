import React, { useEffect, useState } from "react";
import { geocodeAddress } from "~/commons/map/geocodeAddress";
import "leaflet/dist/leaflet.css";
import classes from "~/commons/map/MapWithPin.client.module.css";
import type { AddressItem, LeafletMapClientProps } from "~/commons/map/types";
import clsx from "clsx";
import { t } from "i18next";

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
	// State for error message
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Import dynamically ONLY on client
		import("~/commons/map/LeafletMap.client")
			.then((mod) => setLeafletMapClient(() => mod.default))
			.catch((e) => {
				console.error(e);
				setError(t("maps.error.mapLoading", { error: e.message }));
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
				} catch (_e) {
					return null;
				}
			}),
		)
			.then((results) => {
				const filtered = results.filter((item): item is Coordinates => !!item);
				setCoords(filtered);
				if (filtered.length < addresses.length) {
					setError(t("maps.error.addressNotFound"));
				}
			})
			.catch(() => setError(t("maps.error.addressGeo")));
	}, [addresses]);

	if (!LeafletMapClient) return <div>{t("maps.loading.map")}</div>;
	return (
		<div className={clsx(classes.mapWrapper, className)}>
			<LeafletMapClient pins={coords} className={clsx(classes.mapContainer, className)} />
			{error && <div className={classes.errorOverlay}>{error}</div>}
		</div>
	);
};

export default MapWithPinClient;
