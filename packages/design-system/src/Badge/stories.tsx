import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./index.tsx";

// More on writing stories: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "Atoms/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { children: "Happy Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
