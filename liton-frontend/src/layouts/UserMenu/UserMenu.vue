<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="flex gap-1 items-center">
        <div
          class="p-2 flex justify-center items-center rounded-full shadow-md cursor-pointer"
        >
          <i class="material-symbols-outlined size-6">person</i>
        </div>
        <div
          v-if="state.currentUser?.name"
          class="flex flex-col justify-start items-start text-sm mt-1 ml-1"
        >
          <span>
            {{ `${t("auth.userMenu.saudation")},` }}
          </span>
          <span>
            {{ state.currentUser.name }}
          </span>
        </div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="state.currentUser?.email">
      <DropdownMenuLabel>{{ t("auth.userMenu.myAccount") }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="goToOrders()">
        {{ t("auth.userMenu.orders") }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="logout">
        {{ t("auth.userMenu.logout") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
    <DropdownMenuContent v-else>
      <DropdownMenuItem @click="goToLogin()">{{
        t("auth.userMenu.goLogin")
      }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { useI18n } from "vue-i18n";
import Router from "@/router";

const { state, logout } = useAuthStore();
const { t } = useI18n();

function goToLogin() {
  Router.push({ name: "Login" });
}

function goToOrders() {
  Router.push({ name: "Orders" });
}
</script>
