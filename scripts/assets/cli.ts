import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

import { CloudFrontClient } from "@aws-sdk/client-cloudfront";
import { S3Client } from "@aws-sdk/client-s3";

import { catalog } from "./catalog";
import { CloudFrontInvalidator } from "./invalidate";
import { renderManifest } from "./manifest";
import { runSync } from "./pipeline";
import { S3Store } from "./s3-store";

/*
 * npm run assets:sync [-- --dry-run] [-- --only "logos/*"]
 *
 * Optimizes every catalog entry, uploads new objects to the asset bucket, invalidates
 * changed documents on CloudFront and regenerates src/content/assets.generated.ts.
 * Uses the local AWS profile; the site build itself never needs AWS credentials.
 */

const MANIFEST_PATH = resolve("src/content/assets.generated.ts");

try {
  process.loadEnvFile(".env.local");
} catch {
  // Variables may come from the shell instead.
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: { "dry-run": { type: "boolean", default: false }, only: { type: "string" } },
  });

  const sourceDir = required("ASSETS_SOURCE_DIR");
  const dryRun = values["dry-run"];
  const only = values.only ? globToPredicate(values.only) : undefined;

  const s3 = dryRun ? undefined : new S3Client({ region: required("AWS_REGION") });
  const cloudFront = dryRun ? undefined : new CloudFrontClient({ region: "us-east-1" });

  const report = await runSync({
    catalog,
    readSource: async (path) => {
      try {
        return new Uint8Array(await readFile(resolve(sourceDir, path)));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
        throw error;
      }
    },
    ...(s3 ? { store: new S3Store(s3, required("AWS_S3_BUCKET")) } : {}),
    ...(cloudFront
      ? { invalidator: new CloudFrontInvalidator(cloudFront, required("AWS_CLOUDFRONT_ID")) }
      : {}),
    ...(only ? { only } : {}),
  });

  if (dryRun) {
    console.log(
      `Dry run: ${report.manifest.size} catalog entries, ${report.planned.length} objects.`,
    );
    for (const object of report.planned) console.log(`  would upload  ${object.objectKey}`);
  } else {
    await writeFile(MANIFEST_PATH, renderManifest(report.manifest));
    console.table({
      uploaded: report.uploaded.length,
      skipped: report.skipped.length,
      failed: report.failed.length,
      invalidated: report.invalidated.length,
    });
    for (const failure of report.failed)
      console.error(`  FAILED ${failure.objectKey}: ${failure.error}`);
    console.log(`Manifest written to ${MANIFEST_PATH}`);
  }

  if (report.missing.length > 0) {
    console.warn(`Optional sources not found (skipped): ${report.missing.join(", ")}`);
  }
  if (report.failed.length > 0) process.exitCode = 1;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set (see .env.example)`);
  return value;
}

function globToPredicate(glob: string): (key: string) => boolean {
  const pattern = new RegExp(
    `^${glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replaceAll("*", ".*")}$`,
  );
  return (key) => pattern.test(key);
}
