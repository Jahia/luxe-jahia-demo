import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slideshow } from "./index.tsx";
import type { PictureProps } from "../index.ts";

const data: PictureProps[] = [
	{
		image: {
			src: "https://picsum.photos/800/600",
			alt: "Sample image 1",
		},
		sources: [
			{
				media: "(min-width: 800px)",
				srcSet: "https://picsum.photos/800/600",
			},
			{
				media: "(min-width: 400px)",
				srcSet: "https://picsum.photos/400/300",
			},
		],
		height: "600px",
	},
	{
		image: {
			src: "https://picsum.photos/800/600",
			alt: "Sample image 2",
		},
	},
];
// More on writing stories: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "Atoms/Slideshow",
	component: Slideshow,
	tags: ["autodocs"],
	args: { data, selectedImageIndex: 0, setSelectedImageIndex: () => {} },
} satisfies Meta<typeof Slideshow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
