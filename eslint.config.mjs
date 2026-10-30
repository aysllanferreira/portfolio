import { existsSync, readdirSync } from "node:fs";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

/**
 * Each folder in src/features owns one page section. A feature may use shared code
 * (components, content, i18n, lib) but never another feature, so sections stay
 * independently changeable.
 */
const featuresDir = new URL("./src/features", import.meta.url);
const features = existsSync(featuresDir)
  ? readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

const featureBoundaries = features.map((feature) => ({
  files: [`src/features/${feature}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [
              "@/features/*",
              "@/features/*/**",
              `!@/features/${feature}`,
              `!@/features/${feature}/**`,
            ],
            message:
              "Features must not import other features. Move shared code to components/ or lib/.",
          },
        ],
      },
    ],
  },
}));

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx,mts}"],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
    },
  },
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-default-export": "off",
    },
  },
  {
    // User-facing copy lives in the i18n dictionaries, never inline in markup.
    files: ["src/components/**/*.tsx", "src/features/**/*.tsx", "src/app/**/*.tsx"],
    ignores: ["**/*.test.tsx"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        {
          noStrings: false,
          allowedStrings: [
            "·",
            "—",
            "–",
            "→",
            "/",
            "×",
            "+",
            ",",
            ".",
            ":",
            "(",
            ")",
            "|",
            "•",
            "✦",
          ],
          ignoreProps: true,
        },
      ],
    },
  },
  ...featureBoundaries,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".lighthouseci/**",
    ".fidelity/**",
    "next-env.d.ts",
    "src/content/assets.generated.ts",
  ]),
]);

export default eslintConfig;
