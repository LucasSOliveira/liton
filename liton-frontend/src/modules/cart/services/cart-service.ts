import api from "@/config/api-config";
import Toast from "@/components/Toast";
import type { Order } from "@/types/order-type";

export async function createOrder(orderData: Order): Promise<Order> {
  try {
    const url = `/orders`;
    const response = await api.post(url, orderData);
    return response.data;
  } catch (error: any) {
    Toast({ message: error, type: "error" });
    throw error;
  }
}