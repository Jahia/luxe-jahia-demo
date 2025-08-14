// Slideshow.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slideshow } from "./index.tsx";
import type { PictureProps } from "../index.ts";

// More on writing stories: https://storybook.js.org/docs/writing-stories

// Demo data
const data: PictureProps[] = [
	{
		image: { src: "https://picsum.photos/800/600?random=1", alt: "Sample image 1" },
		sources: [
			{ media: "(min-width: 800px)", srcSet: "https://picsum.photos/800/600?random=1" },
			{ media: "(min-width: 400px)", srcSet: "https://picsum.photos/400/300?random=1" },
		],
		height: "600px",
	},
	{
		image: { src: "https://picsum.photos/800/600?random=2", alt: "Sample image 2" },
		sources: [
			{ media: "(min-width: 800px)", srcSet: "https://picsum.photos/800/600?random=2" },
			{ media: "(min-width: 400px)", srcSet: "https://picsum.photos/400/300?random=2" },
		],
		height: "600px",
	},
	{
		image: { src: "https://picsum.photos/800/600?random=3", alt: "Sample image 3" },
		sources: [
			{ media: "(min-width: 800px)", srcSet: "https://picsum.photos/800/600?random=3" },
			{ media: "(min-width: 400px)", srcSet: "https://picsum.photos/400/300?random=3" },
		],
		height: "600px",
	},
];

const storybookStyles: React.CSSProperties = {
	backgroundColor: "#1b1a4e",
	padding: "20px",
	maxWidth: "800px",
	margin: "0 auto",
};

/**
 * Wrapper component used only for Storybook.
 * It owns the index state and forwards required props to Slideshow.
 * This keeps Storybook `args` minimal (only `data`), avoiding TS conflicts.
 */
function SlideshowStory({ data }: { data: PictureProps[] }) {
	// Local state so Prev/Next buttons can change the slide
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(0);

	return (
		<div style={storybookStyles}>
			<Slideshow
				data={data}
				selectedImageIndex={selectedImageIndex}
				setSelectedImageIndex={setSelectedImageIndex}
			/>
		</div>
	);
}

const meta = {
	title: "Atoms/Slideshow",
	component: SlideshowStory, // <-- Use the wrapper as the story component
	args: {
		// Only pass `data` through Storybook controls/args
		data,
	},
	parameters: {
		// Optional: hide internal state props from controls if they appear
		controls: { exclude: ["selectedImageIndex", "setSelectedImageIndex"] },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SlideshowStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story renders the wrapper with args.
 * No type errors because `args` matches the wrapper's props shape.
 */
export const Default: Story = {};
