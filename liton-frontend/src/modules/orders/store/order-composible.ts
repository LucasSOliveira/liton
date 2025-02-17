import { reactive } from "vue";
import { fetchOrders } from "@/modules/orders/services/orders-service";
import type { Order } from "@/types/order-type";

const state = reactive({
    orders: [] as Order[],
    loading: false,
    error: null,
    total: 0,
    limit: 10,
    page: 1,
});

async function getOrders() {
    state.loading = true;
    try {
        const data = await fetchOrders(state.page, state.limit);
        state.orders = data.data;
        state.total = data.total;
    } catch (error: any) {
        state.error = error;
        state.orders = [];
        state.total = 0;

    } finally {
        state.loading = false;
    }
}

export const useOrders = () => ({
  state,
  getOrders
});
