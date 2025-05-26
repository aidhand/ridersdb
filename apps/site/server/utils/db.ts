import { useDrizzle } from "@repo/db";

const { databaseUrl } = useRuntimeConfig();
export const db = useDrizzle(databaseUrl);
