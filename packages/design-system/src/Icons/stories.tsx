import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "./index.ts";

// Extract icon components from the exports
const iconComponents = Object.entries(Icons).filter(([name]) => name.endsWith("Icon"));

const storybookStyles: React.CSSProperties = {
	padding: "20px",
	maxWidth: "1200px",
	margin: "0 auto",
};

/**
 * Wrapper component to display all icons in a grid
 */
function IconsShowcase() {
	return (
		<div style={storybookStyles}>
			<h2 style={{ marginBottom: "30px", textAlign: "center" }}>Available Icons</h2>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: "20px",
					marginBottom: "40px",
				}}
			>
				{iconComponents.map(([name, IconComponent]) => (
					<div
						key={name}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: "20px",
							border: "1px solid #e9ecef",
							borderRadius: "8px",
							backgroundColor: "#f8f9fa",
							textAlign: "center",
						}}
					>
						<div style={{ marginBottom: "15px" }}>
							<IconComponent />
						</div>
						<span style={{ fontSize: "14px", fontWeight: "500" }}>{name}</span>
					</div>
				))}
			</div>

			{/* Size variations */}
			<h3 style={{ marginBottom: "20px" }}>Size Examples (CheckIcon)</h3>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "30px",
					justifyContent: "center",
					padding: "20px",
					backgroundColor: "#f8f9fa",
					borderRadius: "8px",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<Icons.CheckIcon style={{ width: "16px", height: "16px" }} />
					<div style={{ fontSize: "12px", marginTop: "5px" }}>16px</div>
				</div>
				<div style={{ textAlign: "center" }}>
					<Icons.CheckIcon style={{ width: "24px", height: "24px" }} />
					<div style={{ fontSize: "12px", marginTop: "5px" }}>24px</div>
				</div>
				<div style={{ textAlign: "center" }}>
					<Icons.CheckIcon style={{ width: "32px", height: "32px" }} />
					<div style={{ fontSize: "12px", marginTop: "5px" }}>32px</div>
				</div>
				<div style={{ textAlign: "center" }}>
					<Icons.CheckIcon style={{ width: "48px", height: "48px" }} />
					<div style={{ fontSize: "12px", marginTop: "5px" }}>48px</div>
				</div>
			</div>
		</div>
	);
}

const meta = {
	title: "Foundation/Icons",
	component: IconsShowcase,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"All available icons in the design system. Icons are SVG components that can be styled with CSS.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof IconsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};

// Individual icon stories for specific documentation
export const CheckIcon: Story = {
	render: () => (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Icons.CheckIcon style={{ width: "32px", height: "32px" }} />
		</div>
	),
};

export const MapPinIcon: Story = {
	render: () => (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Icons.MapPinIcon style={{ width: "32px", height: "32px" }} />
		</div>
	),
};

export const RoomIcon: Story = {
	render: () => (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Icons.RoomIcon style={{ width: "32px", height: "32px" }} />
		</div>
	),
};

export const HomeIcon: Story = {
	render: () => (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<Icons.HomeIcon style={{ width: "32px", height: "32px" }} />
		</div>
	),
};
