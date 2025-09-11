import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelectTags, type Option } from "./index.tsx";
import { useState } from "react";

// Demo data
const options: Option[] = [
	{ value: "react", label: "React" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "javascript", label: "JavaScript" },
	{ value: "css", label: "CSS" },
	{ value: "html", label: "HTML" },
	{ value: "nodejs", label: "Node.js" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
];

const moreOptions: Option[] = [
	...options,
	{ value: "angular", label: "Angular" },
	{ value: "vue", label: "Vue.js" },
	{ value: "svelte", label: "Svelte" },
	{ value: "nextjs", label: "Next.js" },
	{ value: "express", label: "Express" },
	{ value: "mongodb", label: "MongoDB" },
	{ value: "postgresql", label: "PostgreSQL" },
];

/**
 * Wrapper component used only for Storybook.
 * It handles the state and provides interaction feedback.
 * This keeps Storybook `args` minimal, avoiding TS conflicts.
 */
function MultiSelectTagsStory({
	options,
	placeholder,
	initialSelected = [],
}: {
	options: Option[];
	placeholder?: string;
	initialSelected?: (string | number)[];
}) {
	const [selected, setSelected] = useState<(string | number)[]>(initialSelected);
	const [key, setKey] = useState(0);

	const handleChange = (values: (string | number)[]) => {
		setSelected(values);
	};

	const handleReset = () => {
		setSelected([]);
		setKey((prev) => prev + 1); // Force re-render of MultiSelectTags
	};

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "500px 350px",
				gap: "40px",
				padding: "20px",
				maxWidth: "1000px",
				margin: "0 auto",
				alignItems: "start",
			}}
		>
			{/* Left column - MultiSelect component */}
			<div style={{ width: "100%" }}>
				<div style={{ marginBottom: "20px", textAlign: "center" }}>
					<button
						onClick={handleReset}
						style={{
							padding: "10px 20px",
							backgroundColor: "#dc3545",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
							fontSize: "14px",
							marginRight: "10px",
						}}
					>
						Reset Selection
					</button>
					<span style={{ fontSize: "14px", color: "#666" }}>
						Selected: {selected.length} item{selected.length !== 1 ? "s" : ""}
					</span>
				</div>

				<MultiSelectTags
					key={key}
					name="technologies"
					options={options}
					initialSelected={selected}
					onChange={handleChange}
					placeholder={placeholder}
				/>
			</div>

			{/* Right column - Selected values display (fixed width) */}
			<div
				style={{
					width: "350px",
					minHeight: "400px",
					maxHeight: "600px",
					padding: "20px",
					backgroundColor: "#f8f9fa",
					borderRadius: "8px",
					border: "1px solid #e9ecef",
					overflow: "auto",
				}}
			>
				<h4 style={{ margin: "0 0 15px 0", fontSize: "16px", fontWeight: "600" }}>
					Selected values:
				</h4>
				{selected.length === 0 ? (
					<p style={{ margin: "0", color: "#666", fontStyle: "italic", fontSize: "14px" }}>
						No items selected
					</p>
				) : (
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						{selected.map((val) => {
							const option = options.find((o) => o.value === val);
							return (
								<div
									key={val}
									style={{
										padding: "8px 12px",
										backgroundColor: "#007bff",
										color: "white",
										borderRadius: "4px",
										fontSize: "14px",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<span>{option?.label}</span>
									<span style={{ fontSize: "12px", opacity: 0.8 }}>({val})</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

const meta = {
	title: "Form/MultiSelectTags",
	component: MultiSelectTagsStory,
	args: {
		options: options,
		placeholder: "Select…",
		initialSelected: [],
	},
	argTypes: {
		placeholder: {
			control: { type: "text" },
			description: "Placeholder text when no items are selected",
		},
		initialSelected: {
			control: { type: "object" },
			description: "Initially selected values",
		},
	},
	parameters: {
		layout: "centered",
		controls: { exclude: ["name", "onChange", "className", "icon"] },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof MultiSelectTagsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreselected: Story = {
	args: {
		initialSelected: ["react", "typescript"],
	},
};

export const ManyOptions: Story = {
	args: {
		options: moreOptions,
		placeholder: "Choose technologies…",
	},
};

export const CustomPlaceholder: Story = {
	args: {
		placeholder: "Select your skills…",
	},
};
