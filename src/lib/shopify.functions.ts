import { createServerFn } from "@tanstack/react-start";
import { fetchProducts } from "./shopify";

export const getShopifyProducts = createServerFn({ method: "GET" }).handler(async () => {
  return fetchProducts(10);
});
