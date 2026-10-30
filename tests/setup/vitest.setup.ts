import "@testing-library/jest-dom/vitest";

// Public values the app reads at module load; tests never touch real deployments.
process.env.NEXT_PUBLIC_SITE_URL ??= "https://aysllan.com";
process.env.NEXT_PUBLIC_ASSETS_URL ??= "https://cdn.aysllan.com";
