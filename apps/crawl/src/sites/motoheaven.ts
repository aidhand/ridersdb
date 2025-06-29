import { PuppeteerCrawler } from "crawlee";
import type { CheerioRoot } from "crawlee";
import {
  logProductData,
  normalizeUrlForPagination,
  removeAllUrlParams,
} from "../utils";

import type { ProductData } from "../types/product-data";

/**
 * Extracts product data from the product page
 */
function extractProductData($: CheerioRoot, url: string): ProductData {
  const title = $("h1.product__title").text().trim();

  // Extract brand information
  const brandElement = $("div.product__vendor").first();
  const brandName = brandElement.find("a").first().text().trim();
  const brandUrl = brandElement.find("a").attr("href");

  // Extract SKU
  const skuElement = $("div.product__sku").first();
  const sku = skuElement.text().replace("SKU: ", "").trim();

  // Extract pricing information
  const priceElement = $("div.product__price").first();
  const priceRrp = priceElement.find("s[data-compare-price]").text().trim();
  const priceCurrent = priceElement.find("span[data-price]").text().trim();

  return {
    title,
    url,
    sku,
    brand: {
      name: brandName || "Unknown",
      url: brandUrl ? `https://motoheaven.com.au${brandUrl}` : undefined,
    },
    price: {
      current: priceCurrent,
      rrp: priceRrp || undefined,
    },
  };
}

export const motoHeavenCrawler = new PuppeteerCrawler({
  launchContext: {
    launchOptions: {
      // Set to false to see the browser, true for headless mode
      headless: true,
    },
  },
  async requestHandler(args) {
    const { request, log, parseWithCheerio, enqueueLinks, page } = args;
    // log.info(`Processing: ${request.url}`);

    const $ = await parseWithCheerio();

    await enqueueLinks({
      selector: "li[data-submenu-parent]>a[data-parent]",
      globs: ["https://motoheaven.com.au/pages/*"],
      label: "category",
    });

    await enqueueLinks({
      globs: ["https://motoheaven.com.au/collections/*"],
      label: "collection",
      transformRequestFunction: (request) => {
        request.url = removeAllUrlParams(request.url);
        return request;
      },
    });

    if (request.label === "collection") {
      await enqueueLinks({
        selector: "a[href*='?page=']",
        globs: ["https://motoheaven.com.au/collections/*"],
        forefront: true,
        label: "collection",
        transformRequestFunction: (request) => {
          request.url = normalizeUrlForPagination(request.url);
          return request;
        },
      });

      await enqueueLinks({
        selector: "a[href*='/products/']",
        forefront: true,
        label: "product",
        transformRequestFunction: (request) => {
          request.url = removeAllUrlParams(request.url);
          return request;
        },
      });
    }

    if (request.label === "product") {
      await page.waitForNetworkIdle();
      try {
        const productData = extractProductData($, request.url);
        logProductData(productData, log); // Save scraped data to database using the crawl data service
        try {
          // TODO: Implement crawl data service
          console.log("Product data scraped:", productData);
          /*
          const result = await crawlDataService.processScrapedProduct({
            ...productData,
            retailer: {
              name: "MotoHeaven",
              domain: "motoheaven.com.au",
              url: "https://motoheaven.com.au",
            },
            scrapedAt: new Date(),
            source: "motoheaven-crawler-v1",
          });

          if (result.success) {
            log.info(
              `✅ Successfully saved product: ${productData.title} (ID: ${result.listingId})`
            );
            if (result.metrics) {
              log.info(
                `   Processing time: ${result.metrics.processingTimeMs}ms, Quality score: ${result.metrics.dataQualityScore}`
              );
            }
          } else {
            log.warning(`⚠️  Saved with errors: ${productData.title}`);
            if (result.errors) {
              result.errors.forEach((error: any) => {
                log.warning(`   ${error.code}: ${error.message}`);
              });
            }
          }
          */
        } catch (dbError) {
          log.error(`❌ Database error for ${productData.title}: ${dbError}`);
        }
      } catch (error) {
        log.error(
          `Failed to extract product data from ${request.url}: ${error}`
        );
      }
    }
  },

  // Limit number of pages to crawl (optional)
  maxRequestsPerMinute: 20, // Limit requests per minute
});
