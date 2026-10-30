import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { caseStudy } from "./content";
import { CaseStudy } from "./parts/CaseStudy";
import { DriveThruVisual } from "./parts/DriveThruVisual";

describe("DriveThruVisual", () => {
  it("is a single described image, not a list of prices", () => {
    render(<DriveThruVisual label="A drive-thru lane" />);
    const visual = screen.getByRole("img", { name: "A drive-thru lane" });
    expect(visual).toHaveTextContent("Order #1042");
    // role="img" makes its contents presentational for assistive technology.
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("keeps the depicted US prices in dollars", () => {
    render(<DriveThruVisual label="A drive-thru lane" />);
    expect(screen.getByRole("img")).toHaveTextContent("$18.65");
  });
});

describe("CaseStudy", () => {
  const copy = {
    featured: "Featured",
    meta: "USA · Full stack engineer via Pinely",
    title: "The POS and menu software behind drive-thrus across the US.",
    description: "Stream Signage powers digital menu boards.",
    metrics: {
      restaurants: "US restaurants live",
      apps: "Apps: POS + menu",
      integrations: "POS systems integrated",
    },
  };

  it("shows the impact as terms and values", () => {
    render(<CaseStudy copy={copy} newTabHint="opens in a new tab" />);
    expect(screen.getAllByRole("definition").map((d) => d.textContent)).toEqual(
      caseStudy.metrics.map((metric) => metric.value),
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(copy.title);
  });

  it("links to the product site safely in a new tab", () => {
    render(<CaseStudy copy={copy} newTabHint="opens in a new tab" />);
    const link = screen.getByRole("link", { name: /streamsignage\.com.*opens in a new tab/ });
    expect(link).toHaveAttribute("href", "https://streamsignage.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
