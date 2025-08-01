import type { Meta, StoryObj } from "@storybook/react-vite";
import { HighlightNumber } from "./index.tsx";

// More on writing stories: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "Atoms/HighlightNumber",
	component: HighlightNumber,
	tags: ["autodocs"],
	args: { big: "42", small: "Countries" },
} satisfies Meta<typeof HighlightNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
