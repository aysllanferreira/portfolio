import { describe, expect, it } from "vitest";

import { parseEnv } from "./env-schema";

const valid = {
  NEXT_PUBLIC_SITE_URL: "https://aysllan.com/",
  NEXT_PUBLIC_ASSETS_URL: "https://cdn.aysllan.com",
};

describe("parseEnv", () => {
  it("accepts valid values, strips trailing slashes and applies defaults", () => {
    expect(parseEnv(valid)).toEqual({
      NEXT_PUBLIC_SITE_URL: "https://aysllan.com",
      NEXT_PUBLIC_ASSETS_URL: "https://cdn.aysllan.com",
      NEXT_PUBLIC_SITE_ENV: "development",
      NEXT_PUBLIC_RENDER_MODE: "default",
    });
  });

  it("names a missing variable", () => {
    expect(() => parseEnv({ ...valid, NEXT_PUBLIC_ASSETS_URL: undefined })).toThrow(
      /NEXT_PUBLIC_ASSETS_URL/,
    );
  });

  it("rejects malformed urls and unknown environments", () => {
    expect(() => parseEnv({ ...valid, NEXT_PUBLIC_SITE_URL: "aysllan.com" })).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
    expect(() => parseEnv({ ...valid, NEXT_PUBLIC_SITE_ENV: "staging" })).toThrow(
      /NEXT_PUBLIC_SITE_ENV/,
    );
  });

  it("never allows the deterministic test render mode on the production site", () => {
    expect(() =>
      parseEnv({ ...valid, NEXT_PUBLIC_SITE_ENV: "production", NEXT_PUBLIC_RENDER_MODE: "test" }),
    ).toThrow(/RENDER_MODE/);
    expect(
      parseEnv({ ...valid, NEXT_PUBLIC_SITE_ENV: "preview", NEXT_PUBLIC_RENDER_MODE: "test" })
        .NEXT_PUBLIC_RENDER_MODE,
    ).toBe("test");
  });
});
