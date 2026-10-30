import { describe, expect, it } from "vitest";

import { fingerprint } from "./fingerprint";

const bytes = (text: string) => new TextEncoder().encode(text);

describe("fingerprint", () => {
  it("is stable for identical input and options", () => {
    expect(fingerprint(bytes("logo"), { color: "#fff" })).toBe(
      fingerprint(bytes("logo"), { color: "#fff" }),
    );
    expect(fingerprint(bytes("logo"))).toMatch(/^[0-9a-f]{8}$/);
  });

  it("changes when the content or the processing options change", () => {
    const base = fingerprint(bytes("logo"), { color: "#fff" });
    expect(fingerprint(bytes("logo!"), { color: "#fff" })).not.toBe(base);
    expect(fingerprint(bytes("logo"), { color: "#000" })).not.toBe(base);
  });
});
