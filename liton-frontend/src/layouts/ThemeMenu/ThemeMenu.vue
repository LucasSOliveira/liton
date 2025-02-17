<template>
  <div @click="setTheme" class="p-2 flex justify-center items-center rounded-full shadow-md cursor-pointer">
    <i class="material-symbols-outlined size-6">{{ icon }}</i>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore } from "@/store/theme-store";

const themeStore = useThemeStore();
const theme = ref(themeStore.state.theme as "dark" | "light");
const isDark = computed(() => theme.value === "dark");
const icon = computed(() => (isDark.value ? "light_mode" : "dark_mode"));

const setTheme = () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  const appHasDarkTheme = app?.classList.contains("dark");

  if (appHasDarkTheme) {
    app?.classList.remove("dark");
    theme.value = "light";
  } else {
    app?.classList.add("dark");
    theme.value = "dark";
  }
  themeStore.setTheme(theme.value);
};
</script>
