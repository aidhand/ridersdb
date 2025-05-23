import { os } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import {
  createBrand,
  deleteBrand,
  getBrand,
  listBrands,
  updateBrand,
} from "~~/server/utils/brands";
import {
  createCollection,
  deleteCollection,
  getCollection,
  listCollections,
  updateCollection,
} from "~~/server/utils/collections";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "~~/server/utils/products";

const ping = os.handler(async () => "ping");
const pong = os.handler(async () => "pong");

export const router = {
  ping,
  pong,
  nested: { ping, pong },

  // Products
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

  // Brands
  listBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,

  // Collections
  listCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};

const handler = new RPCHandler(router);

export default defineEventHandler(async (event) => {
  const { matched } = await handler.handle(event.node.req, event.node.res, {
    prefix: "/api/rpc",
    context: {}, // Provide initial context if needed
  });

  if (matched) {
    return;
  }

  setResponseStatus(event, 404, "Not Found");
  return "Not found";
});
