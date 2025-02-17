<template>
  <div v-if="state.orders.length > 0">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">{{
            t("orders.tableColumns.id")
          }}</TableHead>
          <TableHead class="w-[150px]">{{
            t("orders.tableColumns.data")
          }}</TableHead>
          <TableHead class="w-[150px]">{{
            t("orders.tableColumns.paymentType")
          }}</TableHead>
          <TableHead class="text-right">
            {{ t("orders.tableColumns.total") }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(order, index) in state.orders"
          :key="`order-${index}`"
        >
          <TableCell class="font-medium">
            {{ order.id }}
          </TableCell>
          <TableCell>{{ formatDate(order?.dateCreated as string) }}</TableCell>
          <TableCell>{{
            formatPaymentType(order.payment?.paymentType)
          }}</TableCell>
          <TableCell class="text-right">
            {{ formatCurrency(order.totalValue) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Pagination
      v-slot="{ page }"
      :total="state.total"
      :sibling-count="1"
      show-edges
      :default-page="1"
      v-model:page="state.page"
      @update:page="getOrders"
      class="flex justify-end mt-4"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="`pagination-item-${index}`"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
  <p v-else>
    {{ t("orders.listEmpty") }}
  </p>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { useOrders } from "@/modules/orders/store/order-composible";
import { useI18n } from "vue-i18n";
import { formatDate, formatCurrency, formatPaymentType } from "@/utils";

const { t } = useI18n();
const { state, getOrders } = useOrders();
</script>
