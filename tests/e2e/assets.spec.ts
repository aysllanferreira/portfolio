import { expect, test } from "@playwright/test";

test("/favicon.ico permanently redirects to the CDN favicon", async ({ request }) => {
  const response = await request.get("/favicon.ico", { maxRedirects: 0 });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toMatch(
    /^https:\/\/cdn\.aysllan\.com\/icons\/favicon\.[0-9a-f]{8}\.32\.png$/,
  );
});
