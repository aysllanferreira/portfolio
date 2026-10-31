import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

const { loadGoogleFont } = await import("./og-fonts");

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubFetch(css: string) {
  const font = new ArrayBuffer(8);
  const fetchMock = vi.fn((url: string) =>
    Promise.resolve(
      url.startsWith("https://fonts.googleapis.com") ? new Response(css) : new Response(font),
    ),
  );
  vi.stubGlobal("fetch", fetchMock);
  return { fetchMock, font };
}

describe("loadGoogleFont", () => {
  it("requests a subset of the family and downloads its TrueType file", async () => {
    const { fetchMock } = stubFetch(
      "@font-face { src: url(https://fonts.gstatic.com/geist.ttf) format('truetype'); }",
    );
    const font = await loadGoogleFont("Geist", { weight: 500, style: "normal", text: "Hi" });

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://fonts.googleapis.com/css2?family=Geist:wght@500&text=Hi",
    );
    expect(fetchMock.mock.calls[1]?.[0]).toBe("https://fonts.gstatic.com/geist.ttf");
    expect(font).toMatchObject({ name: "Geist", weight: 500, style: "normal" });
    expect(font.data.byteLength).toBe(8);
  });

  it("asks for the italic axis when the style is italic", async () => {
    const { fetchMock } = stubFetch(
      "src: url(https://fonts.gstatic.com/serif.otf) format('opentype');",
    );
    await loadGoogleFont("Instrument Serif", { weight: 400, style: "italic", text: "a" });
    expect(fetchMock.mock.calls[0]?.[0]).toContain("Instrument%20Serif:ital,wght@1,400");
  });

  it("fails loudly when Google serves no TrueType source", async () => {
    stubFetch("src: url(https://fonts.gstatic.com/geist.woff2) format('woff2');");
    await expect(
      loadGoogleFont("Geist", { weight: 500, style: "normal", text: "x" }),
    ).rejects.toThrow(/No TrueType source for Geist 500 normal/);
  });
});
