import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { pt } from "@/i18n/dictionaries/pt";
import { formatMonthRange } from "@/lib/format";

import {
  designedNow,
  roles,
  roleSlugs,
  testimonial,
  type RoleFacts,
  type RoleSlug,
} from "./content";
import { BeyondTheJob } from "./parts/BeyondTheJob";
import { RoleList } from "./parts/RoleList";
import { Timeline } from "./parts/Timeline";
import { createAxis } from "./timeline";

const copy = pt.experience;
const periods = Object.fromEntries(
  roleSlugs.map((slug) => {
    const role: RoleFacts = roles[slug];
    return [slug, formatMonthRange(role.start, role.end, "pt", copy.present)];
  }),
) as Record<RoleSlug, string>;
const axis = createAxis(
  roleSlugs.map((slug) => roles[slug].start),
  designedNow,
);

describe("Timeline", () => {
  it("hides the drawing and reads every role out from a list", () => {
    const { container } = render(<Timeline axis={axis} copy={copy} periods={periods} />);
    expect(container.querySelector("[aria-hidden] [style]")).toBeInTheDocument();
    const list = screen.getByRole("list", { name: copy.timeline.listLabel });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(roleSlugs.length);
    expect(items[0]).toHaveTextContent(
      "Engenheiro de Software Sênior na Pinely International, Tempo integral: ago 2024 — Atual",
    );
  });

  it("marks only the ongoing role with the pulse at now", () => {
    const { container } = render(<Timeline axis={axis} copy={copy} periods={periods} />);
    expect(container.querySelectorAll(".rounded-full.bg-accent")).toHaveLength(1);
  });
});

describe("RoleList", () => {
  it("lists roles newest first with Portuguese month names", () => {
    render(<RoleList copy={copy} periods={periods} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(roleSlugs.length);
    expect(screen.getByText("set 2025 — jun 2026")).toBeInTheDocument();
    expect(screen.getByText("ago 2024 — Atual")).toBeInTheDocument();
    expect(screen.getAllByText("Tempo integral · Remoto")).toHaveLength(2);
  });
});

describe("BeyondTheJob", () => {
  it("quotes the recommendation in its original English, with a citation", () => {
    render(<BeyondTheJob copy={copy} />);
    const figure = screen.getByRole("figure");
    const quote = figure.querySelector("blockquote");
    expect(quote).toHaveAttribute("lang", "en");
    expect(quote).toHaveTextContent(testimonial.quote);
    expect(within(figure).getByText(testimonial.name).tagName).toBe("CITE");
  });

  it("lists the teaching and community facts under their own heading", () => {
    render(<BeyondTheJob copy={copy} />);
    const section = screen.getByRole("region", { name: copy.teaching.title });
    expect(within(section).getAllByRole("listitem")).toHaveLength(5);
    expect(within(section).getByText("3.000+").className).toContain("text-accent");
  });
});
