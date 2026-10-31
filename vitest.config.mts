import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const alias = { "@": fileURLToPath(new URL("./src", import.meta.url)) };

export default defineConfig({
  test: {
    restoreMocks: true,
    projects: [
      {
        // Pure logic and tooling: runs in Node, where sharp, crypto and fs behave natively.
        resolve: { alias },
        test: {
          name: "node",
          environment: "node",
          include: [
            "src/**/*.test.ts",
            "scripts/**/*.test.ts",
            "tests/unit/**/*.test.ts",
            "tests/fidelity/**/*.test.ts",
          ],
          setupFiles: ["./tests/setup/env.setup.ts"],
        },
      },
      {
        // React components render in a DOM.
        plugins: [react()],
        resolve: { alias },
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["src/**/*.test.tsx", "tests/unit/**/*.test.tsx"],
          setupFiles: ["./tests/setup/env.setup.ts", "./tests/setup/dom.setup.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/i18n/**", "scripts/**"],
      exclude: [
        "**/*.test.*",
        "scripts/**/cli.ts",
        "scripts/check-no-assets.ts",
        "scripts/check-js-budget.ts",
      ],
      thresholds: { lines: 90 },
    },
  },
});
