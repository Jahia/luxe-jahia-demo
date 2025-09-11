import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressiveList } from "./index.tsx";
import { type ImgHTMLAttributes, useState } from "react";

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
	padding: "20px",
	maxWidth: "800px",
	margin: "0 auto",
};

/**
 * Wrapper component used only for Storybook.
 * It wraps ProgressiveList in a ul element and handles the rendering logic.
 * This keeps Storybook `args` minimal, avoiding TS conflicts with generics.
 */
function ProgressiveListStory({
	items,
	delayMs = 200,
	animationType = "fadeInUp",
}: {
	items: ImgHTMLAttributes<HTMLImageElement>[];
	delayMs?: number;
	animationType?: "fadeIn" | "fadeInUp";
}) {
	const [key, setKey] = useState(0);

	const handleReplay = () => {
		setKey((prev) => prev + 1);
	};

	return (
		<div style={storybookStyles}>
			<div style={{ marginBottom: "20px", textAlign: "center" }}>
				<button
					onClick={handleReplay}
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
					Replay
				</button>
			</div>
			<ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "10px" }}>
				<ProgressiveList
					key={key}
					items={items}
					itemKey="src"
					delayMs={delayMs}
					animationType={animationType}
				>
					{(item, index, key, style, className) => (
						<li key={key} style={style} className={className}>
							<img {...item} style={{ maxWidth: "200px", height: "auto" }} />
						</li>
					)}
				</ProgressiveList>
			</ul>
		</div>
	);
}

const meta = {
	title: "Atoms/ProgressiveList",
	component: ProgressiveListStory,
	args: {
		items: images,
		delayMs: 1000,
		animationType: "fadeInUp",
	},
	argTypes: {
		animationType: {
			control: { type: "select" },
			options: ["fadeIn", "fadeInUp"],
			description: "Animation type for the progressive reveal",
		},
		delayMs: {
			control: { type: "number", min: 0, max: 2000, step: 100 },
			description: "Delay between each item animation (in milliseconds)",
		},
	},
	parameters: {
		layout: "centered",
		controls: { exclude: ["children", "itemKey", "className"] },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ProgressiveListStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
