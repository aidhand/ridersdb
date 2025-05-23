import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { router } from "~~/server/api/rpc";

// TODO: move router definition to a shared location
// TODO: implement pinia colada with orpc
// TODO: implement openapi version for public api
export function useOrpc() {
  const link = new RPCLink({
    url: `http://localhost:3000/api/rpc`,
  });

  const client: RouterClient<typeof router> = createORPCClient(link);

  return client;
}
