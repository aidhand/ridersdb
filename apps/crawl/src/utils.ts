import type { ProductData } from "./types/product-data";

// TODO: Create a utilities package and move some of these functions there

/**
 * URL utility functions for web crawling
 */

/**
 * Removes all query parameters from a URL
 * @param url - The URL string to clean
 * @returns The URL without query parameters
 */
export function removeAllUrlParams(url: string): string {
  const urlObj = new URL(url);
  urlObj.search = "";
  return urlObj.toString();
}

/**
 * Removes all query parameters except the specified ones to keep
 * @param url - The URL string to clean
 * @param paramsToKeep - Array of parameter names to preserve
 * @returns The URL with only the specified parameters
 */
export function removeUrlParamsExcept(
  url: string,
  paramsToKeep: string[]
): string {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams();

  // Keep only the specified parameters
  paramsToKeep.forEach((param) => {
    const value = urlObj.searchParams.get(param);
    if (value !== null) {
      searchParams.set(param, value);
    }
  });

  urlObj.search = searchParams.toString();
  return urlObj.toString();
}

/**
 * Removes specific query parameters from a URL
 * @param url - The URL string to clean
 * @param paramsToRemove - Array of parameter names to remove
 * @returns The URL without the specified parameters
 */
export function removeSpecificUrlParams(
  url: string,
  paramsToRemove: string[]
): string {
  const urlObj = new URL(url);

  paramsToRemove.forEach((param) => {
    urlObj.searchParams.delete(param);
  });

  return urlObj.toString();
}

/**
 * Normalizes a URL by removing all parameters except page parameter (if it exists)
 * This is commonly used for pagination handling in web crawling
 * @param url - The URL string to normalize
 * @returns The normalized URL with only page parameter preserved
 */
export function normalizeUrlForPagination(url: string): string {
  return removeUrlParamsExcept(url, ["page"]);
}

/**
 * Logs product data in a structured format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logProductData(data: ProductData, log: any) {
  log.info(`Product: ${data.title}`);
  log.info(` URL: ${data.url}`);
  log.info(` SKU: ${data.sku}`);
  log.info(` Brand: ${data.brand.name} (${data.brand.url})`);
  log.info(` Price: ${data.price.current} (was ${data.price.rrp})`);
}
