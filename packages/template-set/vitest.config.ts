import path from "node:path";
import { defineConfig } from "vitest/config";

// Standalone test config: the build pipeline (vite.config.js) relies on the
// @jahia/vite-plugin whose JSX handling is not applied by vitest — tests that
// import .tsx sources need their own JSX transform. Keeping the config
// separate also drops the build-only plugins (sbom, jahia) from test runs.
export default defineConfig({
	resolve: {
		alias: { "~": path.resolve(import.meta.dirname, "./src") },
	},
	// The tsconfig sets jsx: "preserve" (the Jahia build owns the transform):
	// tell rolldown-vite's oxc transformer to compile JSX for test runs.
	oxc: { jsx: { runtime: "automatic" } },
});
