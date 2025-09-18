import type { Meta, StoryObj } from "@storybook/react-vite";
import { Row } from "./index.tsx";
import { Section } from "../Section/index.tsx";
import { WithMultipleColumns } from "../Col/stories.tsx";

const meta = {
	title: "Layout/Row",
	component: Row,
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
		children: "Row content goes here",
		component: "div",
		className: undefined,
	},
	argTypes: {
		component: {
			control: { type: "select" },
			options: ["div", "section", "article", "aside"],
			description: "HTML element type to render",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
		children: {
			control: { type: "text" },
			description: "Content inside the row",
		},
	},
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Section style={{ backgroundColor: "#f5f5f5", padding: "1rem", border: "1px dashed #ccc" }}>
			<Row
				{...args}
				style={{ backgroundColor: "#e0e0e0", padding: "0.5rem", border: "1px dashed #999" }}
			/>
		</Section>
	),
};

export const WithMultipleRows: Story = {
	render: () => (
		<Section style={{ backgroundColor: "#f5f5f5", padding: "1rem", border: "1px dashed #ccc" }}>
			<Row
				style={{
					backgroundColor: "#e0e0e0",
					padding: "0.5rem",
					margin: "0.5rem 0",
					border: "1px dashed #999",
				}}
			>
				First row content
			</Row>
			<Row
				style={{
					backgroundColor: "#e0e0e0",
					padding: "0.5rem",
					margin: "0.5rem 0",
					border: "1px dashed #999",
				}}
			>
				Second row content
			</Row>
			<Row
				style={{
					backgroundColor: "#e0e0e0",
					padding: "0.5rem",
					margin: "0.5rem 0",
					border: "1px dashed #999",
				}}
			>
				Third row content
			</Row>
		</Section>
	),
};
