import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { codeSample, heroStats } from "./content";
import { CodePanel } from "./parts/CodePanel";
import { HeroStats } from "./parts/HeroStats";

describe("CodePanel", () => {
  it("is one labelled figure with real, selectable code", () => {
    render(<CodePanel label="Code sample" />);
    const figure = screen.getByRole("figure", { name: "Code sample" });
    expect(figure.querySelector("code")).toHaveTextContent('name: "Aysllan Ferreira"');
    expect(figure.querySelector("code")).toHaveTextContent("await engineer.ship();");
  });

  it("hides line numbers and the caret from assistive technology", () => {
    render(<CodePanel label="Code sample" />);
    const hidden = screen.getByRole("figure").querySelectorAll("code [aria-hidden]");
    // One number per line plus the caret.
    expect(hidden).toHaveLength(codeSample.lines.length + 1);
  });

  it("shows the editor chrome from the design", () => {
    render(<CodePanel label="Code sample" />);
    for (const text of [
      "engineer.ts",
      "TypeScript",
      "main",
      "all checks passing",
      "Ln 11, Col 22",
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });
});

describe("HeroStats", () => {
  const labels = {
    years: "Years in production",
    products: "Products shipped",
    revenue: "Client revenue delivered",
    countries: "Countries served",
  };

  it("lists every headline number as a term and value", () => {
    render(<HeroStats labels={labels} scrollHint="Scroll to explore" />);
    expect(screen.getAllByRole("term").map((term) => term.textContent)).toEqual(
      Object.values(labels),
    );
    expect(screen.getAllByRole("definition").map((value) => value.textContent)).toEqual(
      heroStats.map((stat) => stat.value),
    );
  });

  it("links the scroll hint to the selected work", () => {
    render(<HeroStats labels={labels} scrollHint="Scroll to explore" />);
    expect(screen.getByRole("link", { name: "Scroll to explore" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(within(screen.getByRole("link")).queryByRole("img")).toBeNull();
  });
});
