import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";

import { AboutText } from "./parts/AboutText";
import { PortraitCard } from "./parts/PortraitCard";

describe("AboutText", () => {
  it("greets with the section heading and tells the story in order", () => {
    render(<AboutText copy={en.about} titleId="about-title" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Hi, I'm Aysllan.");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "about-title");
    const values = within(screen.getByRole("list", { name: "What I value" })).getAllByRole(
      "listitem",
    );
    expect(values.map((value) => value.textContent)).toEqual(
      en.about.values.map(
        (value, index) => `${String(index + 1).padStart(2, "0")}${value.title}${value.description}`,
      ),
    );
    expect(screen.getByText(en.about.motto)).toBeInTheDocument();
  });

  it("is fully translated", () => {
    render(<AboutText copy={pt.about} titleId="about-title" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Oi, eu sou o Aysllan.");
    expect(screen.getByRole("list", { name: "O que eu valorizo" })).toBeInTheDocument();
  });
});

describe("PortraitCard", () => {
  it("describes the photo and names him in the caption; decoration stays hidden", () => {
    const { container } = render(
      <PortraitCard
        name="Aysllan Ferreira"
        roleLine={en.about.roleLine}
        availability={en.nav.availability}
        portraitAlt={en.about.portraitAlt}
      />,
    );
    const figure = screen.getByRole("figure");
    expect(within(figure).getByRole("img", { name: en.about.portraitAlt })).toBeInTheDocument();
    expect(figure.querySelector("figcaption")).toHaveTextContent("Aysllan Ferreira");
    expect(within(figure).getByText("Open to new roles")).toBeInTheDocument();
    expect(within(figure).getByText("São Paulo")).toBeInTheDocument();
    // The monogram and grid sit in one hidden layer.
    expect(container.querySelector('[aria-hidden="true"] img[alt=""]')).toBeInTheDocument();
  });
});
