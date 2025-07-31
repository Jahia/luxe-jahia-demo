import type { Preview } from "@storybook/react-vite";

// Import the design system global styles
import "design-system";

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
} satisfies Preview;
