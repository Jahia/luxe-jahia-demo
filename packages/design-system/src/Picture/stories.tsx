// Picture.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Picture, type PictureProps } from "./index.tsx";

// More on writing stories: https://storybook.js.org/docs/writing-stories

// Demo data
const args: PictureProps = {
	image: { src: "https://picsum.photos/800/600?random=1", alt: "Sample image 1" },
	sources: [
		{ media: "(min-width: 800px)", srcSet: "https://picsum.photos/800/600?random=1" },
		{ media: "(min-width: 400px)", srcSet: "https://picsum.photos/400/300?random=1" },
	],
	height: "600px",
};

const storybookStyles: React.CSSProperties = {
	padding: "20px",
	maxWidth: "800px",
	margin: "0 auto",
};

const meta = {
	title: "Atoms/Picture",
	component: Picture,
	tags: ["autodocs"],
	args, // Pass the demo data as default args
} satisfies Meta<typeof Picture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		return (
			<div style={storybookStyles}>
				<Picture {...args} />
			</div>
		);
	},
};
