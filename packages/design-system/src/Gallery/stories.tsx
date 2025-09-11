import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gallery } from "./index.tsx";
import { type ImgHTMLAttributes, useState } from "react";

// Demo data with more images to showcase the gallery properly
const images: ImgHTMLAttributes<HTMLImageElement>[] = [
	{
		src: "https://placehold.co/800x600?text=Main+Image",
		alt: "Main placeholder image",
		srcSet:
			"https://placehold.co/400x300?text=Main+Image 400w, https://placehold.co/800x600?text=Main+Image 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Thumb+1",
		alt: "Thumbnail 1",
		srcSet:
			"https://placehold.co/400x300?text=Thumb+1 400w, https://placehold.co/800x600?text=Thumb+1 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Thumb+2",
		alt: "Thumbnail 2",
		srcSet:
			"https://placehold.co/400x300?text=Thumb+2 400w, https://placehold.co/800x600?text=Thumb+2 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Thumb+3",
		alt: "Thumbnail 3",
		srcSet:
			"https://placehold.co/400x300?text=Thumb+3 400w, https://placehold.co/800x600?text=Thumb+3 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Thumb+4",
		alt: "Thumbnail 4",
		srcSet:
			"https://placehold.co/400x300?text=Thumb+4 400w, https://placehold.co/800x600?text=Thumb+4 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Thumb+5",
		alt: "Thumbnail 5",
		srcSet:
			"https://placehold.co/400x300?text=Thumb+5 400w, https://placehold.co/800x600?text=Thumb+5 800w",
		width: 800,
		height: 600,
	},
];

const storybookStyles: React.CSSProperties = {
	padding: "20px",
	maxWidth: "1200px",
	margin: "0 auto",
};

/**
 * Wrapper component used only for Storybook.
 * It handles the Gallery props and provides a reset functionality.
 * This keeps Storybook `args` minimal, avoiding TS conflicts.
 */
function GalleryStory({
	title,
	images,
	delayMs = 200,
}: {
	title: string;
	images: ImgHTMLAttributes<HTMLImageElement>[];
	delayMs?: number;
}) {
	const [key, setKey] = useState(0);

	const handleReset = () => {
		setKey((prev) => prev + 1);
	};

	return (
		<div style={storybookStyles}>
			<div style={{ marginBottom: "20px", textAlign: "center" }}>
				<button
					onClick={handleReset}
					style={{
						padding: "10px 20px",
						backgroundColor: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						fontSize: "14px",
					}}
				>
					Reset Animation
				</button>
			</div>
			<Gallery key={key} title={title} images={images} delayMs={delayMs} />
		</div>
	);
}

const meta = {
	title: "Molecules/Gallery",
	component: GalleryStory,
	args: {
		title: "Sample Gallery",
		images: images,
		delayMs: 500,
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Gallery title displayed in the dialog",
		},
		delayMs: {
			control: { type: "number", min: 0, max: 2000, step: 100 },
			description: "Delay between each thumbnail animation (in milliseconds)",
		},
	},
	parameters: {
		layout: "centered",
		controls: { exclude: ["className"] },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GalleryStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithManyImages: Story = {
	args: {
		title: "Large Gallery",
		images: [
			...images,
			{
				src: "https://placehold.co/400x300?text=Extra+1",
				alt: "Extra image 1",
				width: 800,
				height: 600,
			},
			{
				src: "https://placehold.co/400x300?text=Extra+2",
				alt: "Extra image 2",
				width: 800,
				height: 600,
			},
			{
				src: "https://placehold.co/400x300?text=Extra+3",
				alt: "Extra image 3",
				width: 800,
				height: 600,
			},
		],
	},
};

export const FastAnimation: Story = {
	args: {
		title: "Fast Gallery",
		delayMs: 100,
	},
};
