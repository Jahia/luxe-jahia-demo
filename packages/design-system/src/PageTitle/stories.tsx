import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageTitle } from "./index.tsx";
import { Section } from "../Grid";

const meta = {
	title: "Molecules/PageTitle",
	component: PageTitle,
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
		title: "Page Title",
		description: undefined,
		className: undefined,
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Main title displayed as h1",
		},
		description: {
			control: { type: "text" },
			description: "Optional description displayed as paragraph",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
	},
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
	args: {
		title: "Welcome to Our Platform",
		description:
			"Discover all the features and tools available to help you succeed with your projects.",
	},
};

export const LongContent: Story = {
	args: {
		title: "Complete User Guide and Documentation Portal",
		description:
			"This comprehensive resource center provides detailed information, tutorials, and best practices to help you make the most of our platform's advanced features and capabilities.",
	},
};
