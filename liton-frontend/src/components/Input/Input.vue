<template>
  <div v-if="type === 'text'" :class="className" class="relative items-center">
    <Label :for="id">{{ label }}</Label>
    <Input
      :id="id"
      :mask="mask"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      v-model="internalValue"
      @focus="handleFocus"
      @blur="handleBlur"
      class="pl-10 w-full outline-none placeholder:text-foreground"
    />
    <span
      v-if="icon"
      class="absolute flex items-center justify-center px-2 h-6 bottom-[8px]"
    >
      <span @click="clickIcon" class="material-symbols-outlined h-6 w-6">{{
        icon
      }}</span>
    </span>
    <span
      v-if="showError"
      class="absolute text-[var(--error)] text-xs mt-1 bottom-[-18px]"
      >{{ error }}</span
    >
  </div>
  <div
    v-else-if="type === 'password'"
    :class="className"
    class="relative items-center"
  >
    <Label :for="id">{{ label }}</Label>
    <Input
      :id="id"
      :mask="mask"
      :type="passwordType"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      v-model="internalValue"
      @focus="handleFocus"
      @blur="handleBlur"
      class="pl-10 w-full outline-none placeholder:text-foreground"
    />
    <span
      class="absolute flex items-center justify-center px-2 h-6 bottom-[8px] cursor-pointer"
    >
      <span class="material-symbols-outlined h-6 w-6">{{ passwordIcon }}</span>
    </span>
    <span
      @click="handlerPasswordFieldType"
      class="absolute flex items-center justify-center px-2 h-6 bottom-[8px] right-[8px] cursor-pointer"
    >
      <span class="material-symbols-outlined h-6 w-6">{{
        passwordShowIcon
      }}</span>
    </span>
    <span
      v-if="showError"
      class="absolute text-[var(--error)] text-xs mt-1 bottom-[-18px]"
      >{{ error }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inputProps = defineProps<{
  id: string;
  type?: "text" | "password";
  class?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  icon?: string;
  modelValue?: string;
  mask?: string | Array<string | RegExp>;
  error?: string;
}>();


const touched = ref(false);

const handleFocus = () => {
  touched.value = false;
};

const handleBlur = () => {
  touched.value = true;
};
const showPassword = ref(false);

const id = computed(() => {
  return inputProps.id;
});

const type = computed(() => {
  return inputProps.type || "text";
});
const className = computed(() => {
  return inputProps.class;
});

const mask = computed(() => {
  return inputProps.mask;
});
const showError = computed(() => {
  return touched.value && inputProps.error;
});

const passwordType = computed(() => {
  return showPassword.value ? "text" : "password";
});
const passwordIcon = computed(() => {
  return showPassword.value ? "password_2" : "password";
});
const passwordShowIcon = computed(() => {
  return showPassword.value ? "visibility" : "visibility_off";
});

const handlerPasswordFieldType = () => {
  showPassword.value = !showPassword.value;
};

const emit = defineEmits(["update:modelValue", "clickIcon"]);
const internalValue = computed({
  get: () => inputProps.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function clickIcon() {
  emit("clickIcon");
}
</script>

<style scoped></style>
