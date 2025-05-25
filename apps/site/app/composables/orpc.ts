import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { router } from "~~/server/api/rpc";

// Use environment variable for RPC URL
const rpcUrl = process.env.RPC_URL || `http://localhost:3000/api/rpc`;
const link = new RPCLink({ url: rpcUrl });
const client: RouterClient<typeof router> = createORPCClient(link);

export function useOrpc() {
  return client;
}
