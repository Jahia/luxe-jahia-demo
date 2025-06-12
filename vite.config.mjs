import jahia from "@jahia/vite-plugin";
import { spawnSync } from "node:child_process";
import path from "node:path";
import sbom from "rollup-plugin-sbom";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    // alias: { $client: path.resolve("./src/client") },
    alias: { "~": path.resolve("./src") },
  },
  plugins: [
    sbom({ specVersion: "1.4" }),
    jahia({
      client: {
        input: {
          dir: "./src/",
          glob: "**/*.client.{jsx,tsx}",
        },
        output: "./dist/",
      },
      server: {
        input: "./src/**/*.server.{jsx,tsx}",
        output: {
          dir: "./dist/server/",
          fileName: "index", // Will produce index.js and style.css (because of a bug)
        },
      },
      // This function is called every time a build succeeds in watch mode
      watchCallback() {
        spawnSync("yarn", ["watch:callback"], { stdio: "inherit" });
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./javascript/apps/*", // source file or folder
          dest: "./javascript/apps", // destination inside dist, '' means root of dist
        },
      ],
    }),
  ],
  build: {
    sourcemap: true,
  },
});
