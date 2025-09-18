import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "./index.tsx";

const meta = {
	title: "Layout/Section",
	component: Section,
	parameters: {
		layout: "fullscreen",
		docs: {
			story: {
				inline: true,
			},
		},
	},
	tags: ["autodocs"],
	args: {
		children: "Section content goes here",
		component: "section",
		className: undefined,
		cssStyle: undefined,
	},
	argTypes: {
		component: {
			control: { type: "select" },
			options: ["section", "div", "main", "article", "aside"],
			description: "HTML element type to render",
		},
		cssStyle: {
			control: { type: "text" },
			description: "Inline CSS styles",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
		children: {
			control: { type: "text" },
			description: "Content inside the section",
		},
	},
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Section
			{...args}
			style={{ backgroundColor: "#f5f5f5", padding: "1rem", border: "1px dashed #ccc" }}
		/>
	),
};
