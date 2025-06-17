// @ts-check
import jahia from "@jahia/vite-plugin";
import { spawnSync } from "node:child_process";
import path from "node:path";
import sbom from "rollup-plugin-sbom";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    // alias: { $client: path.resolve("./src/client") },
    alias: { "~": path.resolve("./src") },
  },
  plugins: [
    sbom({ specVersion: "1.4" }),
    jahia({
      // This function is called every time a build succeeds in watch mode
      watchCallback() {
        spawnSync("yarn", ["watch:callback"], { stdio: "inherit" });
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
