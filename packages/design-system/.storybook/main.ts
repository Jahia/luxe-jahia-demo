import type { StorybookConfig } from "@storybook/react-vite";

export default {
	stories: ["../src/**/stories.tsx"],
	addons: [],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
} satisfies StorybookConfig;
