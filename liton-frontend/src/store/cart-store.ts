import { defineStore } from "pinia";
import { reactive} from "vue";
import { createOrder } from "@/modules/cart/services/cart-service";
import type { Order } from "@/types/order-type";
import type { BookOrder } from "@/types/books-type";
import locale from "@/locales";

const { t } = locale.global;
export const useCartStore = defineStore("cart", () => {
  const state = reactive({
    cartState: {
      showButton: false,
      showAside: false,
      currentStep: 1,
      checkoutResult: {
        title: "",
        message: "",
        success: false,
        finsihed: false,
        loading: false,
      }
    },
    newOrder: {
      shippingValue: 0,
      totalValue: 0,
      payment: {
        paymentType: "credit",
        cardName: "",
        cardNumber: "",
        cardCCV: "",
        cardValidity: "",
        ticketNumber: null,
      },
      bookOrders: [] as BookOrder[],
    }
  });

  function removeBookOrders(productId: number) {
    const findIndex = state.newOrder.bookOrders.findIndex((bookOrder) => bookOrder.productId === productId);
    state.newOrder.bookOrders.splice(findIndex, 1);
    
    const totalValue = state.newOrder.bookOrders.reduce((acc, bookOrder) => acc + bookOrder.rentalValue, 0);
    state.newOrder.totalValue = totalValue;

    if (state.newOrder.bookOrders.length === 0) {
      state.cartState.showButton = false;
    }
  }

  function addBookOrders(bookOrder: BookOrder) {
    const bookIncluded = state.newOrder.bookOrders.findIndex((orders) => orders.productId === bookOrder.productId);
    
    if (bookIncluded !== -1) {
      state.newOrder.bookOrders[bookIncluded] = bookOrder;
    } else {
      state.newOrder.bookOrders.push(bookOrder);
    }
    const totalValue = state.newOrder.bookOrders.reduce((acc, bookOrder) => acc + bookOrder.rentalValue, 0);
    
    state.newOrder.totalValue = totalValue;
  }

  function handlerShowButton(value: boolean) {
    state.cartState.showButton = value;
  }

  const handleStepChange = (step: number | undefined) => {
    if (step !== undefined) {
      state.cartState.currentStep = step;
    }
  }

  async function checkout() {
    const orderData: Order = {
      shippingValue: state.newOrder.shippingValue,
      totalValue: state.newOrder.totalValue,
      payment: {
        paymentType: state.newOrder.payment.paymentType as "credit" | "ticket",
        cardName: state.newOrder.payment.cardName,
        cardNumber: state.newOrder.payment.cardNumber,
        cardCCV: state.newOrder.payment.cardCCV,
        cardValidity: state.newOrder.payment.cardValidity,
        ticketNumber: state.newOrder.payment.ticketNumber || undefined,
      },
      orderBooks: state.newOrder.bookOrders.map((bo) => ({
        productId: bo.productId,
        startRental: new Date(bo.startRental),
        endRental: new Date(bo.endRental),
        unitValue: bo.unitValue,
      })),
    };
    state.cartState.showAside = false;
    state.cartState.checkoutResult.loading = true;
    try {
      await createOrder(orderData);

      state.cartState.checkoutResult.success = true;
    } catch (_) {
      state.cartState.checkoutResult.success = false;
    } finally {
      clearFields();
      state.cartState.checkoutResult.finsihed = true;
      state.cartState.checkoutResult.loading = false;
      state.cartState.currentStep = 2;
    }
  }

  function clearFields() {
    state.newOrder = {
      shippingValue: 0,
      totalValue: 0,
      payment: {
        paymentType: "credit",
        cardName: "",
        cardNumber: "",
        cardCCV: "",
        cardValidity: "",
        ticketNumber: null,
      },
      bookOrders: [] as BookOrder[],
    };
  }

  function clearCheckoutResult() {
    state.cartState.checkoutResult = {
      title: "",
      message: "",
      success: false,
      finsihed: false,
      loading: false,
    };
  }

  return {
    state,
    removeBookOrders,
    addBookOrders,
    handleStepChange,
    handlerShowButton,
    clearFields,
    checkout,
    clearCheckoutResult
  };
},
  { persist: { pick: ["state.newOrder.bookOrders", 'state.newOrder.totalValue', 'state.newOrder.shippingValue'] } }
);
