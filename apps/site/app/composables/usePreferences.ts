import { useLocalStorage } from "@vueuse/core";
import { readonly } from "vue";

export const THEME_OPTIONS = ["light", "dark", "system"] as const;
export type ThemeOption = (typeof THEME_OPTIONS)[number];

export const VIEW_MODE_OPTIONS = ["grid", "list"] as const;
export type ViewModeOption = (typeof VIEW_MODE_OPTIONS)[number];

export const CURRENCY_OPTIONS = ["GBP", "AUD", "NZD"] as const;
export type CurrencyOption = (typeof CURRENCY_OPTIONS)[number];

export const REGION_OPTIONS = ["GB", "AU", "NZ"] as const;
export type RegionOption = (typeof REGION_OPTIONS)[number];

export interface PreferencesState {
  theme: ThemeOption;
  viewMode: ViewModeOption;
  region: RegionOption;
  currency: CurrencyOption;
}

export const usePreferences = () => {
  const state = useLocalStorage<PreferencesState>("preferences", {
    theme: "system",
    viewMode: "grid",
    region: "AU",
    currency: "AUD",
  });

  const setTheme = (theme: ThemeOption) => {
    state.value.theme = theme;
  };

  // Cycle through themes: light, dark, system
  const toggleTheme = () => {
    const currentIndex = THEME_OPTIONS.indexOf(state.value.theme);
    const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;

    setTheme(THEME_OPTIONS[nextIndex]!);
  };

  const setViewMode = (mode: ViewModeOption) => {
    state.value.viewMode = mode;
  };

  const toggleViewMode = () => {
    const currentIndex = VIEW_MODE_OPTIONS.indexOf(state.value.viewMode);
    const nextIndex = (currentIndex + 1) % VIEW_MODE_OPTIONS.length;

    setViewMode(VIEW_MODE_OPTIONS[nextIndex]!);
  };

  const setCurrency = (currency: CurrencyOption) => {
    state.value.currency = currency;
  };

  const toggleCurrency = () => {
    const currentIndex = CURRENCY_OPTIONS.indexOf(state.value.currency);
    const nextIndex = (currentIndex + 1) % CURRENCY_OPTIONS.length;

    setCurrency(CURRENCY_OPTIONS[nextIndex]!);
  };

  const setRegion = (region: RegionOption) => {
    state.value.region = region;
  };

  const toggleRegion = () => {
    const currentIndex = REGION_OPTIONS.indexOf(state.value.region);
    const nextIndex = (currentIndex + 1) % REGION_OPTIONS.length;

    setRegion(REGION_OPTIONS[nextIndex]!);
  };

  return {
    state: readonly(state),

    // Actions
    setTheme,
    toggleTheme,
    setViewMode,
    toggleViewMode,
    setCurrency,
    toggleCurrency,
    setRegion,
    toggleRegion,
  };
};

export const usePreferredCurrency = (price: number) => {
  const preferences = usePreferences();

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: preferences.state.value.currency,
  }).format(price);
};
