import { notFound } from "next/navigation";

import { isTestRender } from "@/lib/env";

import { fixtures } from "./fixtures";

export function generateStaticParams() {
  return Object.keys(fixtures).map((fixture) => ({ fixture }));
}

export default async function FixturePage({ params }: PageProps<"/[lang]/qa/[fixture]">) {
  const { fixture } = await params;
  const render = fixtures[fixture];
  if (!isTestRender || !render) notFound();

  return <main id="content">{render()}</main>;
}
