<script lang="ts" setup>
import type { StepperDescriptionProps } from "radix-vue";
import { cn } from "@/utils/lib";
import { StepperDescription, useForwardProps } from "radix-vue";

import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  StepperDescriptionProps & { class?: HTMLAttributes["class"] }
>();
defineSlots<{
  default: any;
}>();
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperDescription
    v-slot="slotProps"
    v-bind="forwarded"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot v-bind="slotProps as any" />
  </StepperDescription>
</template>
