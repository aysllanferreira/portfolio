import { z } from "zod";

const absoluteUrl = z.url({ protocol: /^https?$/ }).transform((value) => value.replace(/\/+$/, ""));

const schema = z
  .object({
    NEXT_PUBLIC_SITE_URL: absoluteUrl,
    NEXT_PUBLIC_ASSETS_URL: absoluteUrl,
    NEXT_PUBLIC_SITE_ENV: z.enum(["production", "preview", "development"]).default("development"),
    NEXT_PUBLIC_RENDER_MODE: z.enum(["default", "test"]).default("default"),
  })
  .refine(
    (env) => !(env.NEXT_PUBLIC_RENDER_MODE === "test" && env.NEXT_PUBLIC_SITE_ENV === "production"),
    {
      message: "NEXT_PUBLIC_RENDER_MODE=test is not allowed when NEXT_PUBLIC_SITE_ENV=production",
      path: ["NEXT_PUBLIC_RENDER_MODE"],
    },
  );

export type Env = z.infer<typeof schema>;

export type EnvSource = Partial<Record<keyof z.input<typeof schema>, string | undefined>>;

/** Validates raw environment values and fails with a message naming every bad variable. */
export function parseEnv(source: EnvSource): Env {
  const result = schema.safeParse(source);
  if (result.success) return result.data;

  const problems = result.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${problems}\nSee .env.example.`);
}
