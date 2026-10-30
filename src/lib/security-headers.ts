interface Header {
  key: string;
  value: string;
}

interface SecurityHeaderOptions {
  assetsOrigin: string;
  /** Development needs `unsafe-eval` for React Fast Refresh. */
  isDevelopment: boolean;
  /** Anything but the production site is kept out of search indexes. */
  indexable: boolean;
}

/**
 * Content Security Policy for a statically rendered site: scripts only from the site
 * origin, images and media only from the asset CDN, no plugins, and no framing.
 *
 * `'unsafe-inline'` scripts are required because Next.js streams the RSC payload in
 * inline scripts; nonces would force dynamic rendering and hashes are unknown when
 * headers are configured. The site has no user input and no third-party scripts.
 */
export function contentSecurityPolicy({
  assetsOrigin,
  isDevelopment,
}: SecurityHeaderOptions): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(isDevelopment ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", assetsOrigin],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isDevelopment ? ["ws:"] : [])],
    "media-src": [assetsOrigin],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  return Object.entries(directives)
    .map(([directive, sources]) => [directive, ...sources].join(" "))
    .join("; ");
}

export function securityHeaders(options: SecurityHeaderOptions): Header[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(options) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    },
    ...(options.indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
  ];
}
