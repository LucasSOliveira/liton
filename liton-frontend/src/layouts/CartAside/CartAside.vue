<template>
  <Sheet :open="state.cartState.showAside" @update:open="updateSheet">
    <SheetContent
      class="flex flex-col px-3 pt-[50px] w-full sm:min-w-[500px] md:min-w-[600px] justify-between"
    >
      <section class="flex flex-col w-ful border-b border-gray-300 pb-4">
        <h1 class="text-xl font-bold mb-6">{{ t("cartAside.title") }}</h1>
        <div class="flex gap-3 mb-4 w-full border-b border-gray-300 pb-4">
          <span> {{ t("cartAside.quantity") }}:</span>
          <span class="font-bold">{{ state.newOrder.bookOrders.length }}</span>
        </div>
        <div class="max-h-[420px] md:max-h-[640px] overflow-y-auto custom-scrollbar">
          <OrderItems />
        </div>
      </section>
      <section class="flex flex-col gap-10">
        <div class="flex justify-between">
          <span>{{ t("cartAside.total") }}:</span>
          <span class="text-xl font-bold">
            {{ formatCurrency(state.newOrder.totalValue)}}
          </span>
        </div>
        <Button
          class="w-full cursor-pointer"
          :disabled="state.newOrder.bookOrders.length === 0"
          @click="checkout"
        >
          {{ t("cartAside.checkout") }}
        </Button>
      </section>
    </SheetContent>
  </Sheet>
</template>
<script setup lang="ts">
import Router from "@/router";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useI18n } from "vue-i18n";
import { useCartStore } from "@/store/cart-store";
import OrderItems from "@/layouts/OrderItems";
import { formatCurrency } from "@/utils";
import { Button } from "@/components/ui/button";

const { state } = useCartStore();
const { t } = useI18n();

function checkout() {
  state.cartState.showAside = !state.cartState.showAside;
  Router.push({ name: 'Cart' });
}

function updateSheet(isOpen: boolean) {
  state.cartState.showAside = isOpen;
}
</script>
