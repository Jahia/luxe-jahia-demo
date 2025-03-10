import { defineConfig } from "vite";
import jahia from "@jahia/vite-plugin";
import path from "node:path";
import { spawnSync } from "node:child_process";

export default defineConfig({
  resolve: {
    // alias: { $client: path.resolve("./src/client") },
    alias: { "~": path.resolve("./src") },
  },
  plugins: [
    jahia({
      client: {
        input: {
          dir: "src/client",
          glob: "**/*.tsx",
        },
      },
      server: {
        input: "./src/server/**/*.{jsx,tsx}",
      },
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
