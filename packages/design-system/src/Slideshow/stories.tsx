// Slideshow.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ImgHTMLAttributes } from "react";
import { Slideshow } from "./index.tsx";

// More on writing stories: https://storybook.js.org/docs/writing-stories

// Demo data
const images: ImgHTMLAttributes<HTMLImageElement>[] = [
	{
		src: "https://placehold.co/400x300?text=Image+1",
		alt: "Placeholder image 1",
		srcSet:
			"https://placehold.co/400x300?text=Image+1 400w, https://placehold.co/800x600?text=Image+1 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Image+2",
		alt: "Placeholder image 2",
		srcSet:
			"https://placehold.co/400x300?text=Image+2 400w, https://placehold.co/800x600?text=Image+2 800w",
		width: 800,
		height: 600,
	},
	{
		src: "https://placehold.co/400x300?text=Image+3",
		alt: "Placeholder image 3",
		srcSet:
			"https://placehold.co/400x300?text=Image+3 400w, https://placehold.co/800x600?text=Image+3 800w",
		width: 800,
		height: 600,
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
 * This keeps Storybook `args` minimal (only `images`), avoiding TS conflicts.
 */
function SlideshowStory({ images }: { images: ImgHTMLAttributes<HTMLImageElement>[] }) {
	// Local state so Prev/Next buttons can change the slide
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(0);

	return (
		<div style={storybookStyles}>
			<Slideshow
				images={images}
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
		// Only pass `images` through Storybook controls/args
		images,
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
