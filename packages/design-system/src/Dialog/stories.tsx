import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./index.tsx";

const children = <p style={{ background: "#fff" }}>The dialog content</p>;
// More on writing stories: https://storybook.js.org/docs/writing-stories
const meta = {
	title: "Atoms/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	args: { title: "The title", children, isOpen: true, setIsOpen: () => {} },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
