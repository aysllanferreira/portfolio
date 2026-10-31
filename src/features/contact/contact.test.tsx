import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { site } from "@/content/site";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { pt } from "@/i18n/dictionaries/pt";
import { documentUrl } from "@/lib/assets";

import { ContactPitch } from "./parts/ContactPitch";
import { LinksPanel } from "./parts/LinksPanel";
import { Wordmark } from "./parts/Wordmark";

describe("ContactPitch", () => {
  it("offers LinkedIn in a new tab and the résumé in the page's language", () => {
    render(
      <ContactPitch copy={es.contact} a11y={es.a11y} resumeHref={documentUrl("resume", "es")} />,
    );
    const linkedin = screen.getByRole("link", { name: /Escríbeme en LinkedIn/ });
    expect(linkedin).toHaveAttribute("href", site.linkedin.url);
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Descargar currículum/ })).toHaveAttribute(
      "href",
      documentUrl("resume", "es"),
    );
  });

  it("states the practical facts as terms and values", () => {
    render(<ContactPitch copy={en.contact} a11y={en.a11y} resumeHref="#" />);
    expect(screen.getAllByRole("term").map((term) => term.textContent)).toEqual([
      "Local time",
      "Languages",
      "Works",
    ]);
    expect(screen.getAllByRole("definition")[0]).toHaveTextContent(
      `São Paulo · ${site.location.utcOffset}`,
    );
  });
});

describe("LinksPanel", () => {
  it.each(["en", "pt", "es"] as const)(
    "links every channel, with the %s cover letter",
    (locale) => {
      const dictionary = { en, pt, es }[locale];
      render(
        <LinksPanel
          copy={dictionary.contact.links}
          a11y={dictionary.a11y}
          coverLetterHref={documentUrl("cover-letter", locale)}
        />,
      );
      const nav = screen.getByRole("navigation", { name: dictionary.contact.links.label });
      const hrefs = within(nav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"));
      expect(hrefs).toEqual([
        `mailto:${site.email}`,
        site.linkedin.url,
        site.github.url,
        documentUrl("cover-letter", locale),
      ]);
    },
  );

  it("announces where each link goes", () => {
    render(<LinksPanel copy={en.contact.links} a11y={en.a11y} coverLetterHref="#" />);
    expect(screen.getByRole("link", { name: /Email.*opens your email app/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub.*opens in a new tab/ })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getByRole("link", { name: /Cover letter.*downloads a PDF/ })).toBeInTheDocument();
  });
});

describe("Wordmark", () => {
  it("is decoration only", () => {
    const { container } = render(<Wordmark name={site.name} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
