export type Pin = {
	lat: number;
	lng: number;
	label: string;
};

export type LeafletMapClientProps = {
	pins: Pin[];
	className?: string; // Optional className for custom styling
};

export type AddressItem = {
	id: string;
	label: string; // For popup (e.g. agency name or address)
	address: string;
};
