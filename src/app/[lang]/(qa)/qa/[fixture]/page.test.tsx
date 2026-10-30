import { afterEach, describe, expect, it, vi } from "vitest";

const renderFixture = async (fixture: string) => {
  const { default: FixturePage } = await import("./page");
  return FixturePage({
    params: Promise.resolve({ lang: "en", fixture }),
  } as PageProps<"/[lang]/qa/[fixture]">);
};

describe("QA fixture page", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("@/lib/env");
  });

  it("is a 404 outside test render mode", async () => {
    vi.doMock("@/lib/env", async (actual) => ({
      ...(await actual<object>()),
      isTestRender: false,
    }));
    await expect(renderFixture("shader-hero")).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);
  });

  it("is a 404 for unknown fixtures", async () => {
    vi.doMock("@/lib/env", async (actual) => ({ ...(await actual<object>()), isTestRender: true }));
    await expect(renderFixture("nope")).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);
  });

  it("renders known fixtures in test render mode", async () => {
    vi.doMock("@/lib/env", async (actual) => ({ ...(await actual<object>()), isTestRender: true }));
    await expect(renderFixture("shader-hero")).resolves.toBeTruthy();
  });
});
