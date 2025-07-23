import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Set default marker icon paths
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

type Pin = {
	lat: number;
	lng: number;
	label: string;
};

type LeafletMapClientProps = {
	pins: Pin[];
};

const LeafletMapClient: React.FC<LeafletMapClientProps> = ({ pins }) => {
	// If at least one pin, use the first as map center
	const center: [number, number] = pins.length > 0 ? [pins[0].lat, pins[0].lng] : [48.8566, 2.3522]; // Paris fallback

	return (
		<MapContainer
			center={center}
			zoom={12}
			scrollWheelZoom={false}
			style={{ height: "400px", width: "100%" }}
		>
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

export default LeafletMapClient;
