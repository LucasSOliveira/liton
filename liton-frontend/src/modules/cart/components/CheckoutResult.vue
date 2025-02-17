<template>
  <div class="mt-20">
    <div class="flex flex-col items-center gap-4">
      <h2
        class="text-2xl font-bold text-center"
        :class="{
          'text-[var(--success)]': state.cartState.checkoutResult.success,
          'text-[var(--danger)]': !state.cartState.checkoutResult.success,
          'text-[var(--warning)]':
            state.newOrder.bookOrders.length === 0 &&
            !state.cartState.checkoutResult.finsihed,
        }"
      >
        {{ checkoutTitle }}
      </h2>
      <p class="text-center">
        {{ checkoutMessage }}
      </p>
      <button
        @click="goToHome"
        class="text-2xl py-6 mt-12 font-bold cursor-pointer"
      >
        {{ $t("cart.button.toHome") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Router from "@/router";
import { useCartStore } from "@/store/cart-store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { state } = useCartStore();

const checkoutTitle = computed(() => {
  const hasItems = state.newOrder.bookOrders.length > 0;

  if (hasItems || state.cartState.checkoutResult.finsihed) {
    return state.cartState.checkoutResult.success
      ? t("cart.checkout.success.title")
      : t("cart.checkout.error.title");
  }
  return t("cart.checkout.empty.title");
});

const checkoutMessage = computed(() => {
  const hasItems = state.newOrder.bookOrders.length > 0;

  if (hasItems || state.cartState.checkoutResult.finsihed) {
    return state.cartState.checkoutResult.success
      ? t("cart.checkout.success.message")
      : t("cart.checkout.error.message");
  }
  return t("cart.checkout.empty.message");
});
function goToHome() {
  Router.push({ name: "Books" });
}
</script>
