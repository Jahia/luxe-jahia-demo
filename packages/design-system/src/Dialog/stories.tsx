import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { Dialog } from "./index.tsx";

type DialogProps = Omit<ComponentProps<typeof Dialog>, "isOpen" | "setIsOpen">;

/**
 * Story-only wrapper that owns the open/close state and exposes
 * a centered trigger button to open the dialog from the story.
 */
function DialogStoryWrapper(
	props: DialogProps & {
		defaultOpen?: boolean;
		triggerLabel?: string;
	},
) {
	const { defaultOpen = false, triggerLabel = "Open dialog", ...rest } = props;
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div style={{ padding: 24 }}>
			{/* Center the button horizontally (and optionally vertically) */}
			<div
				style={{
					display: "flex",
					justifyContent: "center", // horizontal centering
					marginBottom: 16,
					// The next two lines used to vertical centering:
					alignItems: "center",
					minHeight: 160,
				}}
			>
				<button
					type="button"
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					onClick={() => setIsOpen(true)}
					style={{ padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}
				>
					{triggerLabel}
				</button>
			</div>

			{/* Keep Dialog mounted and controlled by this wrapper */}
			<Dialog {...rest} isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
}

const children = <p style={{ background: "#fff", margin: 0, padding: 16 }}>The dialog content</p>;

/**
 * Meta: keep `Dialog` as the component so Storybook infers its args.
 * Hide `isOpen`/`setIsOpen` controls because the wrapper manages them.
 */
const meta = {
	title: "Atoms/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	parameters: {
		controls: { exclude: ["isOpen", "setIsOpen"] },
	},
	argTypes: {
		isOpen: { table: { disable: true } },
		setIsOpen: { table: { disable: true } },
	},
	args: { title: "The title", children },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

/**
 * Interactive story: destructure and drop `isOpen` / `setIsOpen`
 * so they are not passed to the wrapper. Use `void` to satisfy ESLint.
 */
export const WithButton: Story = {
	args: {},
	render: (args) => <DialogStoryWrapper {...args} />,
};

/**
 * Variant that starts open (useful for snapshots/visual tests).
 */
export const OpenByDefault: Story = {
	args: { title: "The title (open by default)" },
	render: (args) => <DialogStoryWrapper {...args} defaultOpen />,
};
