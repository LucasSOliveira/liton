<template>
  <div class="flex flex-col gap-2 fit-content py-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 w-full mb-10">
      <Input
        id="payment-card-name"
        icon="id_card"
        v-model="state.newOrder.payment.cardName"
        :placeholder="t('cart.paymentForm.cardName')"
        class="md:col-span-2"
        mask="M.repeat(40)"
        :error="errors?.cardName"
      />
      <Input
        id="payment-card-number"
        icon="credit_card"
        v-model="state.newOrder.payment.cardNumber"
        :placeholder="t('cart.paymentForm.cardNumber')"
        class="md:col-span-2"
        mask="#### #### #### ####"
        :error="errors?.cardNumber"
      />
      <Input
        id="payment-card-ccv"
        icon="credit_score"
        v-model="state.newOrder.payment.cardCCV"
        :placeholder="t('cart.paymentForm.cardCCV')"
        mask="###"
        :error="errors?.cardCCV"
      />
      <Input
        id="payment-card-validity"
        icon="credit_card_clock"
        v-model="state.newOrder.payment.cardValidity"
        :placeholder="t('cart.paymentForm.cardValidity')"
        mask="##/##"
        :error="errors?.cardValidity"
      />
    </div>
    <div class="w-full">
      <div class="flex justify-end mb-4">
        <button class="text-md font-bold py-4 flex items-center gap-2" @click="showItems">
          <i class="material-symbols-outlined"> shopping_cart </i>
          {{ t("cart.button.showItems") }}
        </button>
      </div>
      <div class="flex justify-between mb-4">
        <span>{{ t("cartAside.total") }}:</span>
        <span class="text-xl font-bold">
          {{ formatCurrency(state.newOrder.totalValue) }}
        </span>
      </div>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
        <Button id="payment-button-back" @click="goToHome" variant="outline">
          {{ t("cart.button.backList") }}
        </Button>
        <Button
          id="payment-button-checkout"
          @click="checkout"
          :disabled="!isValid"
          :loading="state.cartState.checkoutResult.loading"
          variant="default"
          class="cursor-pointer"
        >
          <span class="material-symbols-outlined">shopping_cart</span>
          <span>{{ t("cart.button.finishOrder") }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/utils";
import Router from "@/router";
import { useI18n } from "vue-i18n";
import { watch, ref, reactive } from "vue";
import { validatePayment } from "@/schemas/payment-schema";

const { t } = useI18n();
const { state, checkout } = useCartStore();
const isValid = ref(false);

const errors = reactive({
  cardName: "",
  cardNumber: "",
  cardCCV: "",
  cardValidity: "",
});

function goToHome() {
  state.cartState.showAside = false;
  Router.push({ name: "Books" });
}

function showItems() {
  state.cartState.showAside = true;
}

watch(
  () => [state.newOrder.payment],
  async () => {
    const validate = await validatePayment(state.newOrder.payment);

    errors.cardCCV = validate.errors.cardCCV || "";
    errors.cardName = validate.errors.cardName || "";
    errors.cardNumber = validate.errors.cardNumber || "";
    errors.cardValidity = validate.errors.cardValidity || "";

    isValid.value = validate.isValid;
  },
  { immediate: true, deep: true }
);
</script>
