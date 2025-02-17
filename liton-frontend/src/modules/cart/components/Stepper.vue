<template>
  <Stepper class="flex" v-model="state.cartState.currentStep">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      :step="item.step"
    >
      <div class="mt-2 flex flex-col gap-4 items-center">
        <StepperIndicator>
          <component :is="item.icon" class="w-4 h-4" />
        </StepperIndicator>
        <div class="flex flex-col justify-center items-center text-center">
          <StepperTitle>
            {{ item.title }}
          </StepperTitle>
          <StepperDescription>
            {{ item.description }}
          </StepperDescription>
        </div>
      </div>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="w-full h-px"
      />
    </StepperItem>
  </Stepper>
</template>

<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { Check, CreditCard } from "lucide-vue-next";
import { useCartStore } from "@/store/cart-store";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { state } = useCartStore();
const { t } = useI18n();

const steps = computed(() => [
  {
    step: 1,
    title: t("cart.steps.payment.title"),
    description: t("cart.steps.payment.description"),
    icon: CreditCard,
  },
  {
    step: 2,
    title: t("cart.steps.checkout.title"),
    description: t("cart.steps.checkout.description"),
    icon: Check,
  },
]);
</script>