import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeadingSection } from "./index.tsx";
import { Section } from "../Grid";

const meta = {
	title: "Atoms/HeadingSection",
	component: HeadingSection,
	parameters: {
		layout: "fullscreen",
		docs: {
			story: {
				inline: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<Section>
				<Story />
			</Section>
		),
	],
	tags: ["autodocs"],
	args: {
		title: "Section Title",
		className: undefined,
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Title displayed in the heading section",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
	},
} satisfies Meta<typeof HeadingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
	args: {
		title:
			"This is a very long section title that might wrap to multiple lines depending on the screen size",
	},
};
