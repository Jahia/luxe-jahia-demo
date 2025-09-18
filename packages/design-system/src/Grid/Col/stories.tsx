import type { Meta, StoryObj } from "@storybook/react-vite";
import { Col } from "./index.tsx";
import { Section } from "../Section/index.tsx";
import { Row } from "../Row/index.tsx";

const meta = {
	title: "Layout/Col",
	component: Col,
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
		children: "Column content goes here",
		className: undefined,
	},
	argTypes: {
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
		children: {
			control: { type: "text" },
			description: "Content inside the column",
		},
	},
} satisfies Meta<typeof Col>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Section style={{ backgroundColor: "#f5f5f5", padding: "1rem", border: "1px dashed #ccc" }}>
			<Row style={{ backgroundColor: "#e0e0e0", padding: "0.5rem", border: "1px dashed #999" }}>
				<Col
					{...args}
					style={{ backgroundColor: "#d0d0d0", padding: "0.5rem", border: "1px dashed #666" }}
				/>
			</Row>
		</Section>
	),
};

export const WithMultipleColumns: Story = {
	render: () => (
		<Section style={{ backgroundColor: "#f5f5f5", padding: "1rem", border: "1px dashed #ccc" }}>
			<Row style={{ backgroundColor: "#e0e0e0", padding: "0.5rem", border: "1px dashed #999" }}>
				<Col
					style={{
						backgroundColor: "#d0d0d0",
						padding: "0.5rem",
						margin: "0.25rem",
						border: "1px dashed #666",
					}}
				>
					First column
				</Col>
				<Col
					style={{
						backgroundColor: "#d0d0d0",
						padding: "0.5rem",
						margin: "0.25rem",
						border: "1px dashed #666",
					}}
				>
					Second column
				</Col>
				<Col
					style={{
						backgroundColor: "#d0d0d0",
						padding: "0.5rem",
						margin: "0.25rem",
						border: "1px dashed #666",
					}}
				>
					Third column
				</Col>
			</Row>
		</Section>
	),
};
