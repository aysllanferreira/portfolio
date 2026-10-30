import { FileDown, Mail } from "lucide-react";

import { AfMark } from "@/components/brand/AfMark";
import { ShaderBackground } from "@/components/effects/ShaderBackground";
import { Button } from "@/components/ui/Button";
import { CoreTile } from "@/components/ui/CoreTile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Flag } from "@/components/ui/Flag";
import { LinkRow } from "@/components/ui/LinkRow";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RoleRow } from "@/components/ui/RoleRow";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stat } from "@/components/ui/Stat";
import { Status } from "@/components/ui/Status";
import { Tag } from "@/components/ui/Tag";
import { TechChip } from "@/components/ui/TechChip";
import { heroBackground } from "@/features/hero/background";
import { selectedWorkBackground } from "@/features/selected-work/background";

import type { ReactNode } from "react";

/**
 * Isolated renders for end-to-end and design-fidelity tests, keyed by URL slug
 * (`/<lang>/qa/<name>`). Component fixtures reproduce a design instance verbatim,
 * so `[data-testid="fixture"] > *` can be compared pixel by pixel with its export.
 */
const frame = (children: ReactNode, className = "") => (
  <div data-testid="fixture" className={`inline-flex p-0 ${className}`}>
    {children}
  </div>
);

export const fixtures: Record<string, () => ReactNode> = {
  "shader-hero": () => (
    <div className="relative isolate h-[900px] w-full" data-testid="fixture">
      <ShaderBackground config={heroBackground} />
    </div>
  ),
  "shader-stack": () => (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <section
          key={index}
          className="relative isolate h-[1200px]"
          data-testid={`section-${String(index)}`}
        >
          <ShaderBackground config={selectedWorkBackground} />
        </section>
      ))}
    </>
  ),
  effects: () =>
    frame(
      <div className="flex w-[640px] flex-col gap-6 p-10">
        <div className="glass rounded-lg p-6 text-text-primary">Glass panel</div>
        <div className="rounded-pill bg-accent px-6 py-3 text-on-accent glow-accent">
          Accent glow
        </div>
        <div className="hairline-top pt-6 text-text-muted">Hairline</div>
      </div>,
    ),
  "button-primary": () => frame(<Button href="#contact">Schedule an interview</Button>),
  "button-secondary": () =>
    frame(
      <Button variant="secondary" icon={FileDown} href="https://cdn.aysllan.com/docs/a.pdf">
        Download résumé
      </Button>,
    ),
  "button-light": () =>
    frame(
      <Button variant="light" href="#contact">
        Hire me
      </Button>,
    ),
  "button-icon": () => frame(<Button variant="icon" aria-label="Open link" />),
  eyebrow: () => frame(<Eyebrow>01 — Section</Eyebrow>),
  tag: () => frame(<Tag>Frontend</Tag>),
  "tag-accent": () => frame(<Tag tone="accent">HIPAA</Tag>),
  flag: () => frame(<Flag country="us" label="United States" />),
  status: () => frame(<Status>Open to new roles</Status>),
  stat: () =>
    frame(
      <dl>
        <Stat value="30+" label="Products shipped" />
      </dl>,
    ),
  "af-mark": () => frame(<AfMark height={181} label="Aysllan Ferreira" />),
  "tech-chip": () => frame(<TechChip name="React" logo="react" tone="accent" />),
  "outline-word": () =>
    frame(
      <div className="relative h-[390px] w-[1440px] overflow-hidden">
        <OutlineWord className="top-5 left-[520px] text-[300px]">Shipped</OutlineWord>
      </div>,
    ),
  "link-row": () =>
    frame(
      <div className="w-[520px]">
        <LinkRow
          icon={Mail}
          label="Email"
          value="aysllan.ferreiraks@gmail.com"
          href="mailto:aysllan.ferreiraks@gmail.com"
          className="border-t"
        />
      </div>,
    ),
  "project-card": () =>
    frame(
      <ProjectCard
        className="w-[420px]"
        name="Orchard Mental Health"
        domain="orchardmentalhealth.com"
        href="https://orchardmentalhealth.com"
        country="us"
        market="USA · Healthcare"
        product="A mental health practice with 60+ clinicians, telehealth and a patient portal across Maryland and DC."
        roleLabel="My role"
        role="Built all of it: appointment booking, the website and HIPAA-compliant AWS infrastructure."
        tags={[{ label: "End to end" }, { label: "AWS" }, { label: "HIPAA", tone: "accent" }]}
        newTabHint="opens in a new tab"
      />,
    ),
  "spotlight-card": () =>
    frame(
      <SpotlightCard
        className="w-[528px]"
        name="Privacy Lock"
        domain="myprivacylock.io"
        href="https://myprivacylock.io"
        country="us"
        market="USA · Fintech compliance"
        product="GDPR and CCPA privacy compliance and AI-powered data conversions for banks and fintechs."
        roleLabel="My role"
        role="Designed the AWS infrastructure for single-tenant and multi-tenant deployments."
        tags={[{ label: "AWS" }, { label: "Single-tenant" }, { label: "Multi-tenant" }]}
        screenshot="screenshots/privacy-lock"
        screenshotAlt="Privacy Lock dashboard"
        screenshotSizes="528px"
        screenshotFrame={{ zoom: 1.4286, x: 0, y: 3.686 / 8.191 }}
        newTabHint="opens in a new tab"
      />,
    ),
  "core-tile": () =>
    frame(
      <ul className="w-[205px]">
        <CoreTile number="02" category="Runtime" name="Node.js" logo="nodedotjs" />
      </ul>,
    ),
  "role-row": () =>
    frame(
      <div className="w-[1328px]">
        <RoleRow
          period="Sep 2025 — Jun 2026"
          current={false}
          country="br"
          company="Vituax"
          engagement="Contract · Remote"
          role="Product Owner"
          summary="Took a Brazilian cloud provider's platform from idea to a paid MVP."
          highlights={[
            "Launched VPS hosting with DDoS protection, S3-compatible storage and managed databases",
            "Wrote user stories and refined the backlog with engineering",
            "Gave cloud computing talks in Rio Grande do Sul",
          ]}
          numbers={[{ value: "100+", label: "Active VPS instances" }]}
        />
      </div>,
    ),
};
