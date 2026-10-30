import {
  CreateInvalidationCommand,
  waitUntilInvalidationCompleted,
  type CloudFrontClient,
} from "@aws-sdk/client-cloudfront";

export interface Invalidator {
  invalidate(objectKeys: readonly string[]): Promise<void>;
}

/**
 * Only stable-URL objects (documents) ever need invalidating; hashed objects get a
 * new URL instead. Paths are invalidated exactly, never with wildcards.
 */
export class CloudFrontInvalidator implements Invalidator {
  constructor(
    private readonly client: CloudFrontClient,
    private readonly distributionId: string,
  ) {}

  async invalidate(objectKeys: readonly string[]): Promise<void> {
    if (objectKeys.length === 0) return;

    const paths = [...new Set(objectKeys)].sort().map((key) => `/${key}`);
    const { Invalidation } = await this.client.send(
      new CreateInvalidationCommand({
        DistributionId: this.distributionId,
        InvalidationBatch: {
          CallerReference: `assets-sync-${Date.now().toString()}`,
          Paths: { Quantity: paths.length, Items: paths },
        },
      }),
    );

    if (!Invalidation?.Id) throw new Error("CloudFront did not return an invalidation id");
    await waitUntilInvalidationCompleted(
      { client: this.client, maxWaitTime: 600 },
      { DistributionId: this.distributionId, Id: Invalidation.Id },
    );
  }
}
