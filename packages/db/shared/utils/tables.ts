// Import all schema components for the combined schema object
import {
  userListProductsJunction,
  userListRelations,
  userLists,
  userNotificationRelations,
  userNotifications,
  userPreferenceRelations,
  userPreferences,
  userRelations,
  users,
  userSessionRelations,
  userSessions,
  userWatcherRelations,
  userWatchers,
} from "../../schema/users";

import { brandRelations, brands } from "../../schema/brands";

import {
  certificationRelations,
  certifications,
} from "../../schema/certifications";

import {
  productCategories,
  productCategoryRelations,
  productCertificationsJunction,
  productRelations,
  productRetailersJunction,
  products,
  productTagRelations,
  productTags,
  productTagsJunction,
  productVariantRelations,
  productVariants,
} from "../../schema/products";

import { languageEnum, regionEnum, themeEnum } from "../../schema/enums";

import { retailerRelations, retailers } from "../../schema/retailers";

import {
  productMetrics,
  productMetricsRelations,
  retailerMetrics,
  retailerMetricsRelations,
  variantMetrics,
  variantMetricsRelations,
} from "../../schema/metrics";

// Re-export all schema components
export * from "../../schema/brands";
export * from "../../schema/certifications";
export * from "../../schema/enums";
export * from "../../schema/metrics";
export * from "../../schema/products";
export * from "../../schema/retailers";
export * from "../../schema/users";

// Combined schema object for ORM usage
export const schema = {
  // Enums
  themeEnum,
  languageEnum,
  regionEnum,
  // Tables
  users,
  userSessions,
  userPreferences,
  userWatchers,
  userNotifications,
  userLists,
  userListProductsJunction,
  brands,
  productCategories,
  productTags,
  productVariants,
  certifications,
  retailers,
  products,
  productTagsJunction,
  productRetailersJunction,
  productCertificationsJunction,
  productMetrics,
  variantMetrics,
  retailerMetrics,
  // Relations
  userRelations,
  userSessionRelations,
  userPreferenceRelations,
  userWatcherRelations,
  userNotificationRelations,
  userListRelations,
  brandRelations,
  productCategoryRelations,
  productTagRelations,
  productVariantRelations,
  certificationRelations,
  retailerRelations,
  productRelations,
  productMetricsRelations,
  variantMetricsRelations,
  retailerMetricsRelations,
};
