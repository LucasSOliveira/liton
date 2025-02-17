<template>
  <Header />
  <main class="flex w-full h-full">
    <section
      class="flex flex-col w-full justify-center h-full mx-auto px-2 max-w-[600px]"
    >
      <div>
        <Logo class="h-18 mt-8 md:h-50" @click="goToHome" />
        <div
          v-if="state.newOrder.bookOrders.length > 0 || state.cartState.checkoutResult.finsihed"
          class="flex justify-center items-center w-full"
        >
          <Stepper />
        </div>
        <CheckoutResult v-if="resultStatus" class="mt-20" />
        <PaymentForm v-else />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Stepper from "@/modules/cart/components/Stepper.vue";
import PaymentForm from "@/modules/cart/components/PaymentForm.vue";
import CheckoutResult from "@/modules/cart/components/CheckoutResult.vue";
import Logo from "@/layouts/Logo";
import Router from "@/router";
import { onMounted, onBeforeMount, computed } from "vue";
import { useCartStore } from "@/store/cart-store";
import Header from "@/layouts/Header/Header.vue";

const { state, clearCheckoutResult } = useCartStore();

const resultStatus = computed(
  () =>
    state.cartState.checkoutResult.finsihed ||
    state.newOrder.bookOrders.length === 0
);

onMounted(() => {
  state.cartState.showButton = false;
  state.cartState.showAside = false;
});
onBeforeMount(() => {
  clearCheckoutResult();
});
function goToHome() {
  Router.push({ name: "Books" });
}
</script>

<style scoped></style>
