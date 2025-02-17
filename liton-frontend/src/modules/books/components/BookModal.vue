<template>
  <Dialog :open="state.openBookModal" @update:open="closeBookModal">
    <div class="px-2">
      <DialogContent class="max-w-[320px] md:max-w-[700px] p-4">
        <DialogTitle></DialogTitle>
        <div class="p-1 flex gap-4 w-full justify-center items-center">
          <div class="relative h-full md:w-[55%] hidden md:inline-block">
            <div
              v-if="computedLoadedImages"
              class="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md animate-pulse"
            ></div>
            <img
              :src="state.bookOrder.product?.coverUrl || BookEmpty"
              :alt="state.bookOrder.product?.title || 'Book'"
              @load="handleImageLoad()"
              class="w-full h-full object-contain rounded-md p-1 hidden md:inline-block"
              :class="{ hidden: computedLoadedImages }"
            />
          </div>
          <div
            class="p-1 md:w-[45%] flex flex-col justify-between gap-1 h-full"
          >
            <div>
              <h2 class="text-lg">{{ state.bookOrder.product?.title }}</h2>
              <span class="text-sm">{{
                truncateNames(state.bookOrder.product?.author)
              }}</span>
            </div>
            <RangeCalendar
              v-model="state.period as DateRange"
              @update:modelValue="setPeriod"
              :minValue="minDate"
              class="rounded-md border"
            />
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm">{{ t("books.period") }}:</span
                  ><span class="text-lg">{{ state.bookOrder.period }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">{{ t("books.valuePerDay") }}:</span
                  ><span class="text-lg">{{
                    formatCurrency(state.bookOrder.unitValue)
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">{{ t("books.price") }}:</span
                  ><span class="text-lg">{{
                    formatCurrency(state.bookOrder.rentalValue)
                  }}</span>
                </div>
              </div>
              <Button
                class="btn btn-primary w-full"
                :disabled="!periodIsValid"
                @click="addToCart()"
              >
                {{ t("books.addToCart") }}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import BookEmpty from "@/assets/images/book-empty.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { useBooks } from "@/modules/books/store/books-composable";
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { formatCurrency, truncateNames } from "@/utils";
import { useCartStore } from "@/store/cart-store";
import type { DateRange } from "radix-vue";

const { t } = useI18n();
const cartStore = useCartStore();
const { state, setBookOrderData, setPeriod } = useBooks();
const loadedImages = reactive<Record<string, boolean>>({});
const minDate = today(getLocalTimeZone());

const computedLoadedImages = computed(
  () => state.bookOrder.product && !loadedImages[state.bookOrder.product.id]
);

const periodIsValid = computed(() => {
  return (
    state.period?.start && state.period?.end && state.bookOrder.rentalValue
  );
});

function closeBookModal(value: boolean) {
  setBookOrderData(null);
  state.openBookModal = value;
}

function handleImageLoad() {
  if (!state.bookOrder.product?.id) return;

  loadedImages[state.bookOrder.product.id] = true;
}

function addToCart() {
  const bookOrder = { ...state.bookOrder };

  cartStore.addBookOrders(bookOrder);
  closeBookModal(false);
}
</script>
