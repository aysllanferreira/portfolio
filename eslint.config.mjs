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
      // Props removed by destructuring before spreading the rest are intentionally unused.
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
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
    // Test fixtures reproduce design instances verbatim, including their sample text.
    ignores: ["**/*.test.tsx", "src/app/[[]lang[]]/(qa)/**"],
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
  {
    // Asymmetric matchers (expect.any, expect.stringMatching) are typed `any`, and
    // asserting on mocked methods reads them unbound; both are idiomatic in tests.
    files: ["**/*.test.{ts,tsx}", "tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
  {
    // Browser tests take `test` from the shared fixture, which replays CDN assets from
    // a local cache instead of downloading them on every page load.
    files: ["tests/e2e/**/*.ts", "tests/fidelity/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@playwright/test",
              importNames: ["test"],
              message: "Import test from tests/support/playwright so CDN assets are cached.",
            },
          ],
        },
      ],
    },
  },
  {
    // Generated social images are rendered to PNG by next/og, where <img> is the only
    // way to place a picture; next/image does not apply.
    files: ["src/app/**/opengraph-image.tsx", "src/app/**/twitter-image.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([
    ".next/**",
    ".lighthouseci/**",
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
