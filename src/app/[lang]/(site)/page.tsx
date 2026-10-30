import { About } from "@/features/about/About";
import { Contact } from "@/features/contact/Contact";
import { Experience } from "@/features/experience/Experience";
import { Hero } from "@/features/hero/Hero";
import { Projects } from "@/features/projects/Projects";
import { SelectedWork } from "@/features/selected-work/SelectedWork";
import { Stack } from "@/features/stack/Stack";
import { getLocale } from "@/i18n/get-dictionary";

export default async function HomePage() {
  // Rejects unsupported locales (e.g. /fr) with the localized 404.
  await getLocale();

  return (
    <>
      <Hero />
      <SelectedWork />
      <Projects />
      <Experience />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
