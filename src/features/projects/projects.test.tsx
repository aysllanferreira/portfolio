import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/i18n/dictionaries/en";

import { countries, projects, spotlights } from "./content";
import { CountryList } from "./parts/CountryList";
import { ProjectGrid } from "./parts/ProjectGrid";
import { Spotlights } from "./parts/Spotlights";

const newTabHint = "opens in a new tab";

describe("CountryList", () => {
  it("names every country in the reader's language", () => {
    render(<CountryList note="Una selección." label="Proyectos por país" locale="es" />);
    const items = within(screen.getByRole("list", { name: "Proyectos por país" })).getAllByRole(
      "listitem",
    );
    expect(items).toHaveLength(countries.length);
    expect(items[0]).toHaveTextContent("Estados Unidos+30");
    expect(items.at(-1)).toHaveTextContent("Chequia01");
  });
});

describe("Spotlights", () => {
  it("links each spotlight once, safely, with a described screenshot", () => {
    render(<Spotlights copy={en.projects} newTabHint={newTabHint} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(Object.keys(spotlights).length);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("img", { name: /Centrum-AI home page/ })).toBeInTheDocument();
    expect(screen.getAllByText("Deterministic AI")).toHaveLength(1);
  });
});

describe("ProjectGrid", () => {
  it("renders every project, linking only the public ones", () => {
    render(<ProjectGrid copy={en.projects} newTabHint={newTabHint} />);
    expect(screen.getByRole("list", { name: "More projects" })).toBeInTheDocument();
    const all = Object.values(projects);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(all.length);
    expect(screen.getAllByRole("link")).toHaveLength(all.filter((p) => "domain" in p).length);
    expect(screen.getAllByText("private product")).toHaveLength(2);
  });

  it("marks HIPAA as the accent tag", () => {
    render(<ProjectGrid copy={en.projects} newTabHint={newTabHint} />);
    expect(screen.getByText("HIPAA").className).toContain("text-accent");
  });
});
