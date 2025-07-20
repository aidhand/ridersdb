export interface ProductData {
  title: string;
  url: string;
  sku?: string;
  brand: {
    name: string;
    url?: string;
  };
  price: {
    current: string;
    rrp?: string;
  };
}
