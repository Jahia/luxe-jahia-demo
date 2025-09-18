import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { LeafletMapProps, Pin } from "./MapWithPin.client.tsx";

// Set default marker icon paths
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

// FitBounds helper component
const FitBounds: React.FC<{ pins: Pin[] }> = ({ pins }) => {
	const map = useMap();

	useEffect(() => {
		if (!pins.length) return;
		// Build bounds from all pins
		const bounds = L.latLngBounds(pins.map((pin) => [pin.lat, pin.lng] as [number, number]));
		// Fit the map view to these bounds with padding
		map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
	}, [pins, map]);

	return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ pins, className }) => {
	// If at least one pin, use the first as map center
	const center: [number, number] = pins.length > 0 ? [pins[0].lat, pins[0].lng] : [48.8566, 2.3522]; // Paris fallback

	return (
		<MapContainer center={center} zoom={12} scrollWheelZoom={true} className={className}>
			{/* Fit bounds to all pins */}
			<FitBounds pins={pins} />

			{/* Add OpenStreetMap tiles */}
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* Display one marker per pin */}
			{pins.map((pin) => (
				<Marker key={pin.label} position={[pin.lat, pin.lng]}>
					<Popup>{pin.label}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default LeafletMap;
