import { describe, expect, it } from "vitest";

import { breakAfterSlashes } from "./typography";

describe("breakAfterSlashes", () => {
  it("adds a break opportunity after slashes between words", () => {
    expect(breakAfterSlashes("500 ERP/TMS/WMS connectors")).toBe(
      "500 ERP/\u200BTMS/\u200BWMS connectors",
    );
  });

  it("leaves other slashes alone", () => {
    expect(breakAfterSlashes("a / b and https://x")).toBe("a / b and https://x");
  });
});
