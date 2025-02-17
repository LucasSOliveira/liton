<template>
  <Button
    :id="id"
    class="cursor-pointer"
    :disabled="loading || disabled"
    :variant="variant"
    :type="type"
  >
    <span v-if="loading" class="material-symbols-outlined animate-spin"
      >progress_activity</span
    >
    <slot v-else />
  </Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { defineProps } from "vue";

defineProps<{
  id: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "outline" | "secondary" | "default" | "destructive" | "ghost" | "link" | undefined;
}>();

</script>

<style scoped></style>
