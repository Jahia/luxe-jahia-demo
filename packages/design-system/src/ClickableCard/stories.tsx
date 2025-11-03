import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FC } from "react";
import { ClickableCard } from "./index.tsx";

const SampleImage: FC<{ className: string }> = ({ className }) => (
	<img
		src="https://placehold.co/600x400?text=Sample+Image"
		alt="Sample placeholder image"
		className={className}
	/>
);

const meta = {
	title: "Molecules/ClickableCard",
	component: ClickableCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		href: "#",
		title: "Card Title",
		image: SampleImage,
		description: "This is a description of the card. It can be a short text.",
		footer: "Read more",
	},
} satisfies Meta<typeof ClickableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
