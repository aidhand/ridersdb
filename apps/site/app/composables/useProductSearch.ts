export const useProductSearch = () => {
  return useState<string>("productSearch", () => "");
};
