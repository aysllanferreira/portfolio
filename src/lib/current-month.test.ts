import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

const { currentMonth } = await import("./current-month");

afterEach(() => {
  vi.useRealTimers();
});

describe("currentMonth", () => {
  it("returns the current UTC month, zero-padded", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-03-15T12:00:00Z"));
    await expect(currentMonth()).resolves.toBe("2027-03");
  });

  it("follows UTC across the new year", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-31T23:30:00Z"));
    await expect(currentMonth()).resolves.toBe("2026-12");
  });
});
