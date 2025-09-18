import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentHeader } from "./index.tsx";

// Sample image using placehold.co
const sampleImage = {
	src: "https://placehold.co/500x500?text=Sample+Image",
	alt: "Sample placeholder image",
	width: 500,
	height: 500,
};

const meta = {
	title: "Molecules/ContentHeader",
	component: ContentHeader,
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
			<div style={{ width: "100vw", minHeight: "50vh" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
	args: {
		title: "Main Title",
		description: undefined,
		image: sampleImage,
		className: undefined,
	},
	argTypes: {
		title: {
			control: { type: "text" },
			description: "Main title displayed in the header",
		},
		description: {
			control: { type: "text" },
			description: "Optional description (supports HTML)",
		},
		image: {
			control: { type: "object" },
			description: "Image properties (src, alt, width, height, etc.)",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS class name",
		},
	},
} satisfies Meta<typeof ContentHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongContent: Story = {
	args: {
		title: "Complete beginner's guide",
		description: `
      <p>This detailed guide accompanies you in your first steps with our platform.
      You will find all the necessary information to <strong>optimize your experience</strong>.</p>

      <p>Main features:</p>
      <ul>
        <li><em>Intuitive</em> and modern interface</li>
        <li><strong>Advanced</strong> collaboration tools</li>
        <li><em>24/7</em> technical support</li>
        <li>Integrations with your existing tools</li>
      </ul>

      <p>Start now and discover why thousands of users trust us.</p>
    `,
		image: sampleImage,
	},
};
