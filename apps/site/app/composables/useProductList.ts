export function useProductList() {
  const products = useFetch("/api/products");
  return { products };
}
