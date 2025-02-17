<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils/lib";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  id?: string;
  defaultValue?: string | number;
  modelValue?: string | number;
  mask?: string | Array<string | RegExp>;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
const mask = computed(() => {
  return props.mask;
});
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    v-mask="mask"
    :data-mask="cn(mask, props.mask)"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
