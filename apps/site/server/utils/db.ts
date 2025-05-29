import { useNeon } from "@repo/db";

const { databaseUrl } = useRuntimeConfig();
export const db = useNeon(databaseUrl);
