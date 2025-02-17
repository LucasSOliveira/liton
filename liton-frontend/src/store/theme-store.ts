import { defineStore } from "pinia";
import { reactive } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const state = reactive({
    theme: "light",
    availableThemes: ["light", "dark"],
  });
  const setTheme = (theme: "light" | "dark") => {
    state.theme = theme;
  };
  const inicializeTheme = () => {
    const app = document.querySelector<HTMLDivElement>("#app");

    if (state.theme === "dark") {
      app?.classList.add("dark");
    } else {
      app?.classList.add("dark");
    }
  };

  return {
    state,
    setTheme,
    inicializeTheme,
  };
});
