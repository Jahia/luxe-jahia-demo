import type { Meta, StoryObj } from "@storybook/react-vite";
import { Figure } from "./index.tsx";

const children = (
	<img
		src="https://placehold.co/400x300?text=Image+1"
		alt="Placeholder image 1"
		srcSet="https://placehold.co/400x300?text=Image+1 400w, https://placehold.co/800x600?text=Image+1 800w"
		sizes="(max-width: 800px) 100vw, 800px"
		width="800"
		height="600"
	/>
);

// More on writing stories: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "Atoms/Figure",
	component: Figure,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { children, layout: "imgCentered", caption: "Caption image 1" },
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
