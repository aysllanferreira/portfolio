import { fontVariables } from "@/styles/fonts";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Aysllan Ferreira",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
