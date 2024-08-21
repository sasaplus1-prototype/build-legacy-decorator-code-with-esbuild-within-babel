import * as fs from "node:fs/promises";
import { defineConfig } from "vitest/config";
import { transform } from "@babel/core";
import react from "@vitejs/plugin-react";

const babelOptions = {
  presets: [],
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
};

const esbuildPlugin = {
  name: "babel",
  setup(build) {
    build.onLoad({ filter: /\.(?:[cm]?[jt]s|[jt]sx)$/ }, async (args) => {
      const source = await fs.readFile(args.path, "utf8");
      const result = transform(source, babelOptions);
      return { contents: result.code, loader: "jsx" };
    });
  },
};

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildPlugin],
    },
  },
  esbuild: {
    plugins: [esbuildPlugin],
  },
  plugins: [
    react({
      babel: {
        ...babelOptions,
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
  ],
});
