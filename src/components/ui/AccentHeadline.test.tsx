import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AccentHeadline } from "./AccentHeadline";

describe("AccentHeadline", () => {
  it("styles only the accent word, wherever it sits", () => {
    const cases = [
      { before: "", accent: "Hola,", after: " soy Aysllan." },
      { before: "I build software\n", accent: "people", after: " pay for." },
      { before: "Let's build something\nthat ", accent: "lasts.", after: "" },
    ];

    for (const text of cases) {
      const { unmount } = render(<AccentHeadline text={text} as="h1" />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.querySelector("em")).toHaveTextContent(text.accent);
      expect(heading.textContent).toBe(
        `${text.before}${text.accent}${text.after}`.replaceAll("\n", ""),
      );
      unmount();
    }
  });

  it("turns translator line breaks into <br> elements", () => {
    render(
      <AccentHeadline
        text={{ before: "Products shipped,\nfrom first call to ", accent: "prod.", after: "" }}
      />,
    );
    expect(screen.getByRole("heading", { level: 2 }).querySelectorAll("br")).toHaveLength(1);
  });
});
