import { describe, expect, it } from "vitest";
import {
  normalizeUrlForPagination,
  removeAllUrlParams,
  removeSpecificUrlParams,
  removeUrlParamsExcept,
} from "../src/utils.js";

describe("URL Utils", () => {
  const testUrl = "https://example.com/path?param1=value1&param2=value2&page=3";

  describe("removeAllUrlParams", () => {
    it("should remove all query parameters from URL", () => {
      const result = removeAllUrlParams(testUrl);
      expect(result).toBe("https://example.com/path");
    });

    it("should handle URLs without parameters", () => {
      const urlWithoutParams = "https://example.com/path";
      const result = removeAllUrlParams(urlWithoutParams);
      expect(result).toBe("https://example.com/path");
    });
  });

  describe("removeUrlParamsExcept", () => {
    it("should keep only specified parameters", () => {
      const result = removeUrlParamsExcept(testUrl, ["page"]);
      expect(result).toBe("https://example.com/path?page=3");
    });

    it("should handle multiple parameters to keep", () => {
      const result = removeUrlParamsExcept(testUrl, ["param1", "page"]);
      expect(result).toBe("https://example.com/path?param1=value1&page=3");
    });

    it("should return URL without parameters if none to keep exist", () => {
      const result = removeUrlParamsExcept(testUrl, ["nonexistent"]);
      expect(result).toBe("https://example.com/path");
    });
  });

  describe("removeSpecificUrlParams", () => {
    it("should remove only specified parameters", () => {
      const result = removeSpecificUrlParams(testUrl, ["param1"]);
      expect(result).toBe("https://example.com/path?param2=value2&page=3");
    });

    it("should handle multiple parameters to remove", () => {
      const result = removeSpecificUrlParams(testUrl, ["param1", "param2"]);
      expect(result).toBe("https://example.com/path?page=3");
    });

    it("should handle removing non-existent parameters", () => {
      const result = removeSpecificUrlParams(testUrl, ["nonexistent"]);
      expect(result).toBe(testUrl);
    });
  });

  describe("normalizeUrlForPagination", () => {
    it("should keep only page parameter", () => {
      const result = normalizeUrlForPagination(testUrl);
      expect(result).toBe("https://example.com/path?page=3");
    });

    it("should handle URLs without page parameter", () => {
      const urlWithoutPage =
        "https://example.com/path?param1=value1&param2=value2";
      const result = normalizeUrlForPagination(urlWithoutPage);
      expect(result).toBe("https://example.com/path");
    });
  });
});
