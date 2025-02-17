<template>
  <div class="relative cursor-pointer" @click="openCartAside">
    <div class="shadow-md rounded-full p-2 flex items-center">
      <span class="material-symbols-outlined size-6">shopping_cart</span>
    </div>
    <span
      v-if="cartCount > 0"
      class="absolute top-0 right-0 bg-[var(--error)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {{ cartCount }}
    </span>
    <CartAside />
  </div>
</template>

<script setup lang="ts">
import CartAside from "@/layouts/CartAside";
import { computed } from "vue";
import { useCartStore } from "@/store/cart-store";
const cartStore = useCartStore();

const cartCount = computed(() => cartStore.state.newOrder.bookOrders.length);

function openCartAside() {
  cartStore.state.cartState.showAside = true;
}
</script>

<style scoped></style>
