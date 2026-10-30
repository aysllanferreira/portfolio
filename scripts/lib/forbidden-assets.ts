/**
 * Binary and vector assets are served from the CDN, never from the repository.
 * Fonts are fetched and self-hosted by the build, so font files are banned too.
 */
export const forbiddenExtensions = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "avif",
  "gif",
  "svg",
  "ico",
  "pdf",
  "woff",
  "woff2",
  "ttf",
  "otf",
] as const;

const pattern = new RegExp(`\\.(${forbiddenExtensions.join("|")})$`, "i");

export function findForbiddenAssets(files: readonly string[]): string[] {
  return files.filter((file) => pattern.test(file));
}
