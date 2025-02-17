<template>
    <Header showLogo />
  
    <main>
      <section class="container mx-auto px-4 py-8">
        <h1 class="text-2xl py-6">{{ $t("orders.title") }}</h1>
        <OrdersTable />
      </section>
      <section class="container mx-auto px-4 py-8">
        <div class="w-full flex justify-end">
          <Button id="orders-button-back" variant="outline" @click="$router.go(-1)">
            {{ $t("orders.goBack") }}
          </Button>
        </div>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import Header from "@/layouts/Header/Header.vue";
  import OrdersTable from "@/modules/orders/components/OrdersTable.vue";
  import { onMounted } from "vue";
  import { useOrders } from "@/modules/orders/store/order-composible";
  import Button from "@/components/Button";
  
  const { getOrders } = useOrders();
  
  onMounted(() => {
    getOrders();
  });
  
  </script>
  