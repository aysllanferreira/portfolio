import { render, screen, within } from "@testing-library/react";
import { FileDown, Mail } from "lucide-react";
import { describe, expect, it } from "vitest";

import { AfMark } from "@/components/brand/AfMark";
import { TechLogo } from "@/components/brand/TechLogo";
import { assetManifest } from "@/content/assets.generated";
import { techBrandColors } from "@/content/tech-logos";

import { Button } from "./Button";
import { CoreTile } from "./CoreTile";
import { Eyebrow } from "./Eyebrow";
import { Flag } from "./Flag";
import { LinkRow } from "./LinkRow";
import { OutlineWord } from "./OutlineWord";
import { ProjectCard } from "./ProjectCard";
import { RoleRow } from "./RoleRow";
import { SpotlightCard } from "./SpotlightCard";
import { Stat } from "./Stat";
import { Status } from "./Status";
import { Tag } from "./Tag";
import { TechChip } from "./TechChip";

describe("Button", () => {
  it("renders a native button without href", () => {
    render(<Button variant="icon" aria-label="Open menu" />);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("type", "button");
  });

  it("renders in-page and route targets as links", () => {
    render(<Button href="#contact">Schedule an interview</Button>);
    expect(screen.getByRole("link", { name: /Schedule an interview/ })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("opens external links in a new tab and announces it", () => {
    render(
      <Button
        variant="secondary"
        icon={FileDown}
        href="https://cdn.aysllan.com/docs/a.pdf"
        external={{ hint: "downloads a PDF" }}
      >
        Download résumé
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Download résumé (downloads a PDF)" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides decorative icons from assistive technology", () => {
    const { container } = render(<Button href="#x">Go</Button>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("small primitives", () => {
  it("Eyebrow draws a decorative rule before its label", () => {
    const { container } = render(<Eyebrow>01 — Selected work</Eyebrow>);
    expect(screen.getByText("01 — Selected work")).toBeInTheDocument();
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
  });

  it("Tag supports the accent tone", () => {
    render(<Tag tone="accent">HIPAA</Tag>);
    expect(screen.getByText("HIPAA").className).toContain("text-accent");
  });

  it("Flag is decorative unless given a label", () => {
    const { rerender } = render(<Flag country="br" />);
    expect(screen.getByRole("presentation")).toHaveAttribute("alt", "");
    rerender(<Flag country="br" label="Brazil" />);
    expect(screen.getByRole("img", { name: "Brazil" })).toBeInTheDocument();
  });

  it("Status hides its dot and keeps the label", () => {
    render(<Status>Open to new roles</Status>);
    expect(screen.getByText("Open to new roles")).toBeVisible();
  });

  it("Stat renders a term and its value for a description list", () => {
    render(
      <dl>
        <Stat value="30+" label="Products shipped" />
      </dl>,
    );
    expect(screen.getByRole("term")).toHaveTextContent("Products shipped");
    expect(screen.getByRole("definition")).toHaveTextContent("30+");
  });

  it("OutlineWord draws its word as generated content, never as text", () => {
    const { container } = render(<OutlineWord>Shipped</OutlineWord>);
    const word = container.firstElementChild;
    expect(word).toHaveAttribute("aria-hidden", "true");
    expect(word).toHaveAttribute("data-word", "Shipped");
    expect(word).toHaveTextContent("");
  });

  it("AfMark can be named or decorative", () => {
    render(<AfMark height={20} label="Aysllan Ferreira" tone="soft" />);
    expect(screen.getByRole("img", { name: "Aysllan Ferreira" }).getAttribute("src")).toContain(
      "af-mark-soft",
    );
  });
});

describe("technology logos", () => {
  it("has a CDN asset for every design logo", () => {
    for (const name of Object.keys(techBrandColors)) {
      expect(Object.keys(assetManifest)).toContain(`logos/${name}`);
    }
  });

  it("renders logos as decorative images", () => {
    const { container } = render(<TechLogo name="react" size={15} />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("TechChip shows its name with an optional logo", () => {
    const { container, rerender } = render(<TechChip name="React" logo="react" tone="accent" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();
    rerender(<TechChip name="Zod" />);
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });
});

describe("LinkRow", () => {
  it("is one link named by its label and value", () => {
    render(
      <LinkRow
        icon={Mail}
        label="Email"
        value="a@b.com"
        href="mailto:a@b.com"
        hint="opens your mail app"
      />,
    );
    expect(
      screen.getByRole("link", { name: /Email.*a@b\.com.*opens your mail app/ }),
    ).toHaveAttribute("href", "mailto:a@b.com");
  });
});

const card = {
  name: "Orchard Mental Health",
  domain: "orchardmentalhealth.com",
  href: "https://orchardmentalhealth.com",
  country: "us",
  market: "USA · Healthcare",
  product: "A mental health practice.",
  roleLabel: "My role",
  role: "Built all of it.",
  tags: [{ label: "AWS" }, { label: "HIPAA", tone: "accent" }],
  newTabHint: "opens in a new tab",
} as const;

describe("project cards", () => {
  it("ProjectCard has exactly one link, named after the project", () => {
    render(<ProjectCard {...card} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Orchard Mental Health (opens in a new tab)");
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(2);
  });

  it("SpotlightCard frames its screenshot as designed", () => {
    render(
      <SpotlightCard
        {...card}
        badge="Deterministic AI"
        screenshot="screenshots/privacy-lock"
        screenshotAlt="Privacy Lock dashboard"
        screenshotSizes="528px"
        screenshotFrame={{ zoom: 1.5, x: 0, y: 0.45 }}
      />,
    );
    const screenshot = screen.getByRole("img", { name: "Privacy Lock dashboard" });
    expect(screenshot.style.width).toBe("150%");
    expect(screenshot.style.transform).toBe("translate(0%, -45%)");
    expect(screen.getByText("Deterministic AI")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});

describe("CoreTile", () => {
  it("tints itself with the technology's brand color", () => {
    render(
      <ul>
        <CoreTile number="02" category="Runtime" name="Node.js" logo="nodedotjs" />
      </ul>,
    );
    const tile = screen.getByRole("listitem");
    expect(tile.style.getPropertyValue("--brand")).toBe(techBrandColors.nodedotjs);
    expect(tile).toHaveTextContent("Node.js");
  });
});

describe("RoleRow", () => {
  const role = {
    period: "Sep 2025 — Present",
    country: "br",
    company: "Vituax",
    engagement: "Contract · Remote",
    role: "Product Owner",
    summary: "Took a platform from idea to a paid MVP.",
    highlights: ["Launched VPS hosting", "Gave cloud talks"],
    numbers: [{ value: "100+", label: "Active VPS instances" }],
  } as const;

  it("shows a live dot only for the current role", () => {
    const { container, rerender } = render(<RoleRow {...role} current />);
    expect(container.querySelector(".bg-accent.rounded-full")).toBeInTheDocument();
    rerender(<RoleRow {...role} current={false} />);
    expect(container.querySelector(".bg-accent.rounded-full")).not.toBeInTheDocument();
  });

  it("lists highlights and numbers semantically", () => {
    render(<RoleRow {...role} current={false} />);
    expect(screen.getByRole("heading", { level: 3, name: "Product Owner" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("definition")).toHaveTextContent("100+");
  });
});
