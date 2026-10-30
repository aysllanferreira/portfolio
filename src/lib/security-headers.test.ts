import { describe, expect, it } from "vitest";

import { contentSecurityPolicy, securityHeaders } from "./security-headers";

const production = {
  assetsOrigin: "https://cdn.aysllan.com",
  isDevelopment: false,
  indexable: true,
};

describe("contentSecurityPolicy", () => {
  it("only allows images from the site and the asset CDN, and forbids framing", () => {
    const csp = contentSecurityPolicy(production);
    expect(csp).toContain("img-src 'self' data: https://cdn.aysllan.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
  });

  it("allows eval and websockets only in development", () => {
    const csp = contentSecurityPolicy({ ...production, isDevelopment: true });
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("connect-src 'self' ws:");
  });
});

describe("securityHeaders", () => {
  const keys = (indexable: boolean) =>
    securityHeaders({ ...production, indexable }).map((header) => header.key);

  it("sends the hardening headers", () => {
    expect(keys(true)).toEqual(
      expect.arrayContaining([
        "Content-Security-Policy",
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy",
      ]),
    );
  });

  it("adds noindex only when the site must not be indexed", () => {
    expect(keys(true)).not.toContain("X-Robots-Tag");
    expect(keys(false)).toContain("X-Robots-Tag");
  });
});
