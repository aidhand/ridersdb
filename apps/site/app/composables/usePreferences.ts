import { useLocalStorage } from "@vueuse/core";
import { readonly } from "vue";

export interface PreferencesState {
  view: "grid" | "list";
  currency: string;
  region: string;
}

export const usePreferences = () => {
  const state = useLocalStorage<PreferencesState>("preferences", {
    view: "grid",
    currency: "USD",
    region: "US",
  });

  const setViewMode = (mode: "list" | "grid") => {
    state.value.view = mode;
  };

  const setCurrency = (currency: string) => {
    state.value.currency = currency;
  };

  const setRegion = (region: string) => {
    state.value.region = region;
  };

  return {
    state: readonly(state),
    setViewMode,
    setCurrency,
    setRegion,
  };
};
