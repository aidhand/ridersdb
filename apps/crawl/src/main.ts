import { motoHeavenCrawler } from "./sites/motoheaven";

// Start the crawl
await motoHeavenCrawler.run([
  "https://motoheaven.com.au/collections/motorcycle-road-jackets",
]);
