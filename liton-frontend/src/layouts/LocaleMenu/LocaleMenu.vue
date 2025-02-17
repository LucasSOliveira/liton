<template>
  <Popover id="locale-popover" v-model:open="popoverOpen">
    <PopoverTrigger>
      <div class="shadow-md rounded-full p-2 flex items-center cursor-pointer">
        <i class="material-symbols-outlined size-6">translate</i>
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-38">
      <ul>
        <li
          v-for="locale in state.availableLocales"
          :key="locale.value"
          :value="locale.value"
        >
          <button
            class="flex gap-2 items-center"
            @click="changeLocale(locale.value as any)"
          >
            
            <i
              v-if="state.currentLocale === locale.value"
              class="material-symbols-outlined size-4"
            >check</i>
            <div v-else class="size-4"></div>
            {{ locale.label }}
          </button>
        </li>
      </ul>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useLocaleStore } from "@/store/locale-store";

const { state, setLocale } = useLocaleStore();
const currentLocale = ref<"pt-BR" | "en" | "es">("pt-BR");

function changeLocale(value: "pt-BR" | "en" | "es") {
  currentLocale.value = value;
  setLocale(currentLocale.value);
  popoverOpen.value = false;
}

const popoverOpen = ref(false);
</script>

<style scoped></style>