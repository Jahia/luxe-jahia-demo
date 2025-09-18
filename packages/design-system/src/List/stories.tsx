import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./index.tsx";
import type { ListRowProps } from "./index.tsx";

// Demo data
const sampleRows: ListRowProps[] = [
	{ title: "Name", value: "John Doe" },
	{ title: "Email", value: "john.doe@example.com" },
	{ title: "Phone", value: "+1 (555) 123-4567" },
	{ title: "Status", value: "<strong>Active</strong>" },
	{ title: "Location", value: "New York, NY" },
];

const htmlRows: ListRowProps[] = [
	{ title: "Description", value: "<em>Software Engineer</em> with 5+ years of experience" },
	{ title: "Skills", value: "<ul><li>React</li><li>TypeScript</li><li>Node.js</li></ul>" },
	{
		title: "Website",
		value: '<a href="https://example.com" target="_blank">https://example.com</a>',
	},
	{
		title: "Bio",
		value:
			"Passionate developer who loves <strong>clean code</strong> and <em>modern technologies</em>.",
	},
];

const jsxRows: ListRowProps[] = [
	{ title: "Status", value: <span style={{ color: "green", fontWeight: "bold" }}>✓ Active</span> },
	{
		title: "Score",
		value: (
			<div style={{ display: "flex", alignItems: "center" }}>
				⭐⭐⭐⭐⭐ <span style={{ marginLeft: "8px" }}>5/5</span>
			</div>
		),
	},
	{
		title: "Progress",
		value: (
			<progress value={75} max={100} style={{ width: "100px" }}>
				75%
			</progress>
		),
	},
	{
		title: "Badge",
		value: (
			<span
				style={{
					backgroundColor: "#007bff",
					color: "white",
					padding: "4px 8px",
					borderRadius: "4px",
					fontSize: "12px",
				}}
			>
				PREMIUM
			</span>
		),
	},
];

const meta = {
	title: "Atoms/List", // ← Changement ici
	component: List,
	parameters: {
		layout: "centered",
		docs: {
			story: {
				inline: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: "80vw" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
	args: {
		rows: sampleRows,
		className: undefined,
	},
	argTypes: {
		rows: {
			control: { type: "object" },
			description: "Array of row objects with title and value properties",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
	},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHtmlContent: Story = {
	args: {
		rows: htmlRows,
	},
};

export const WithJsxElements: Story = {
	args: {
		rows: jsxRows,
	},
};

export const MixedContent: Story = {
	args: {
		rows: [
			{ title: "Name", value: "Jane Smith" },
			{ title: "Role", value: "<strong>Senior Developer</strong>" },
			{ title: "Status", value: <span style={{ color: "green" }}>✓ Online</span> },
			{ title: "Experience", value: "8 years in <em>web development</em>" },
			{ title: "Rating", value: <div>⭐⭐⭐⭐⭐</div> },
		],
	},
};

export const EmptyList: Story = {
	args: {
		rows: [],
	},
};

export const SingleItem: Story = {
	args: {
		rows: [{ title: "Message", value: "Hello World!" }],
	},
};

export const LongContent: Story = {
	args: {
		rows: [
			{
				title: "Description",
				value:
					"This is a very long description that demonstrates how the list component handles longer content. It should wrap properly and maintain good readability across different screen sizes.",
			},
			{
				title: "Technical Details",
				value:
					"<p>Built with <strong>React</strong> and <em>TypeScript</em>.</p><p>Features include:</p><ul><li>HTML content support</li><li>JSX element rendering</li><li>Responsive design</li></ul>",
			},
		],
	},
};
