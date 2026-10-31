import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";

import { coreTech, layers } from "./content";
import { CoreTiles } from "./parts/CoreTiles";
import { Layers } from "./parts/Layers";
import { PracticesTicker } from "./parts/PracticesTicker";

describe("CoreTiles", () => {
  it("numbers the core technologies and features one of them", () => {
    render(<CoreTiles copy={en.stack} />);
    const tiles = within(screen.getByRole("list", { name: "Core technologies" })).getAllByRole(
      "listitem",
    );
    expect(tiles).toHaveLength(coreTech.length);
    expect(tiles[0]).toHaveTextContent("01");
    expect(tiles[0]).toHaveTextContent("TypeScript");
    expect(tiles.filter((tile) => tile.className.includes("ring-[#a493ff99]"))).toHaveLength(1);
  });
});

describe("Layers", () => {
  it("gives every layer a heading with its tools and projects as labeled lists", () => {
    render(<Layers copy={en.stack} />);
    const list = screen.getByRole("list", { name: "The stack by layer" });
    const items = within(list)
      .getAllByRole("listitem")
      .filter((item) => item.querySelector("h3"));
    expect(items).toHaveLength(layers.length);
    const [first] = items;
    if (!first) throw new Error("no layers rendered");
    expect(within(first).getByRole("heading", { level: 3 })).toHaveTextContent("L1Interface");
    expect(within(first).getByRole("list", { name: "Tools" })).toHaveTextContent("React");
    expect(within(first).getByRole("list", { name: "Shipped in" })).toHaveTextContent("Centrum-AI");
  });

  it("translates the generic tools and notes, never the product names", () => {
    render(<Layers copy={es.stack} />);
    expect(screen.getByText("Agentes de IA")).toBeInTheDocument();
    expect(screen.getByText("Usado en la mayoría de los proyectos")).toBeInTheDocument();
    expect(screen.getByText("LangChain")).toBeInTheDocument();
  });

  it("keeps the decorative line breaks out of the tool lists", () => {
    render(<Layers copy={en.stack} />);
    const breaks = document.querySelectorAll('li[aria-hidden="true"].basis-full');
    expect(breaks.length).toBe(layers.filter((layer) => layer.toolRows.length > 1).length);
  });
});

describe("PracticesTicker", () => {
  it("reads each practice once; the looping copy is hidden", () => {
    render(<PracticesTicker label="Practices" practices={en.stack.practices} />);
    const region = screen.getByRole("region", { name: "Practices" });
    expect(within(region).getAllByRole("listitem")).toHaveLength(en.stack.practices.length);
    expect(region.querySelectorAll('ul[aria-hidden="true"] li')).toHaveLength(
      en.stack.practices.length,
    );
  });
});
