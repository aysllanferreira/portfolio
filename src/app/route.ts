import { negotiateLocale } from "@/i18n/negotiation";

import type { NextRequest } from "next/server";

/**
 * `/` has no page of its own: it sends each visitor to their preferred language.
 * The redirect is temporary and never cached, since it depends on the request,
 * and `Vary` keeps any shared cache from serving one visitor's choice to another.
 */
export function GET(request: NextRequest): Response {
  const locale = negotiateLocale(request.headers.get("accept-language"));

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${locale}`,
      "Cache-Control": "private, no-store",
      Vary: "Accept-Language",
    },
  });
}
