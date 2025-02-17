<template>
  <div class="flex flex-col gap-8">
    <div
      v-for="order in state.newOrder.bookOrders"
      :key="`order-${order.productId}`"
      class="order-aside flex gap-2 md:gap-4 pr-2"
    >
      <img
        :src="order.product.coverUrl || BookEmpty"
        :alt="order.product.title || 'Book'"
        class="h-[120px] w-[90px] sm:h-[150px] sm:w-[110px] object-contain rounded-md p-1"
      />
      <div class="flex flex-col gap-2 w-full">
        <h2 class="text-sm sm:text-lg font-bold">{{ order.product.title }}</h2>
        <div class="flex flex-col gap-1 w-full">
          <div class="flex justify-between items-center">
            <span class="text-xs sm:text-sm">{{ t("books.period") }}:</span
            ><span class="text-xs sm:text-sm font-bold">{{
              order.period
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs sm:text-sm">{{ t("books.valuePerDay") }}:</span
            ><span class="text-xs sm:text-sm font-bold">{{
              formatCurrency(order.product.rentalValue)
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs sm:text-sm">{{ t("books.price") }}:</span
            ><span class="text-xs sm:text-sm font-bold">{{
              formatCurrency(order.rentalValue)
            }}</span>
          </div>
          <div class="flex justify-end mt-2">
            <button @click="removeBookOrders(order.productId)"
                    class="flex items-center gap-1 w-fit h-10 cursor-pointer border-0 font-bold text-sm sm:text-md outline-none bg-transparent text-[var(--error)]">
              <i class="material-symbols-outlined mb-[2px] font-bold text-2xl">close</i>
              <span>{{ t("cartAside.remove") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.newOrder.bookOrders.length === 0" class="flex justify-center px-8">
      <h2 class="text-sm sm:text-xl">{{ t("cartAside.notFound") }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookEmpty from "@/assets/images/book-empty.jpg";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/utils";
import { useI18n } from "vue-i18n";

const { state, removeBookOrders } = useCartStore();
const { t } = useI18n();
</script>