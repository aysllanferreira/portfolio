import { describe, expect, it } from "vitest";

import { isSectionId, navSectionIds, sectionIds } from "./sections";

describe("sections", () => {
  it("only links known sections from the navbar", () => {
    for (const id of navSectionIds) expect(sectionIds).toContain(id);
  });

  it("recognises section ids", () => {
    expect(isSectionId("stack")).toBe(true);
    expect(isSectionId("pricing")).toBe(false);
  });
});
