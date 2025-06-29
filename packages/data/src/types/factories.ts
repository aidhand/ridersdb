import type * as schema from "~/schema";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";

export type DatabaseInstance =
  | NeonDatabase<typeof schema>
  | NeonHttpDatabase<typeof schema>
  | Parameters<Parameters<NeonDatabase<typeof schema>["transaction"]>[0]>[0]
  | Parameters<
      Parameters<NeonHttpDatabase<typeof schema>["transaction"]>[0]
    >[0];
