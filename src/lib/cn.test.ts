import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", false, undefined, "b", { c: true, d: false })).toBe("a b c");
  });

  it("lets the last conflicting utility win", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("knows the design-token type scale and colors apart", () => {
    expect(cn("text-body", "text-h3")).toBe("text-h3");
    expect(cn("text-h3 text-text-muted", "text-text-primary")).toBe("text-h3 text-text-primary");
    expect(cn("bg-surface", "bg-glass")).toBe("bg-glass");
    expect(cn("rounded-sm", "rounded-pill")).toBe("rounded-pill");
  });

  it("dedupes fluid utilities per property", () => {
    expect(cn("fluid-text-44 tablet:fluid-text-72", "fluid-text-40")).toBe(
      "tablet:fluid-text-72 fluid-text-40",
    );
    expect(cn("fluid-pt-72 fluid-pb-48", "fluid-py-96")).toBe("fluid-py-96");
  });

  it("lets fluid and fixed sizes replace each other", () => {
    expect(cn("h-[220px]", "fluid-h-200 tablet:fluid-h-220")).toBe(
      "fluid-h-200 tablet:fluid-h-220",
    );
    expect(cn("fluid-w-400", "w-full")).toBe("w-full");
    expect(cn("text-[16px]", "fluid-text-34")).toBe("fluid-text-34");
  });
});
