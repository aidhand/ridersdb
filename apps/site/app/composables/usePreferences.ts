import { useLocalStorage } from "@vueuse/core";
import { readonly } from "vue";

export const usePreferences = () => {
  const localStorage = useLocalStorage("preferences", {
    view: "grid",
    currency: "USD",
    region: "US",
  });

  const state = useState("preferences", () => localStorage);

  //   watch(state, (newValue) => {
  //     // This will run whenever the state changes
  //     useLocalStorage("preferences", newValue);
  //   });

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
