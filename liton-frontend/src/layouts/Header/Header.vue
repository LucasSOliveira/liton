<template>
  <header>
    <div
      class="container mx-auto flex justify-between items-center py-4 px-2 md:px-4 flex-wrap"
    >
      <div>
        <Logo class="" v-show="showLogo" @click="goToHome" />
      </div>
      <nav class="py-4">
        <ul class="flex items-center space-x-4">
          <li><LocaleButton /></li>
          <li><ThemeMenu /></li>
          <li v-show="showCart">
            <CartMenu />
          </li>
          <li v-show="showUserMenu">
            <UserMenu />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import Router from "@/router";
import Logo from "@/layouts/Logo";
import CartMenu from "@/layouts/CartMenu";
import ThemeMenu from "@/layouts/ThemeMenu";
import LocaleButton from "@/layouts/LocaleMenu";
import UserMenu from "@/layouts/UserMenu";

const props = defineProps<{
  showLogo?: boolean;
  showCart?: boolean;
  showUserMenu?: boolean;
}>();

const showLogo = props.showLogo ?? false;
const showCart = props.showCart ?? false;
const showUserMenu = props.showCart ?? false;

function goToHome() {
  Router.push({ name: "Books" });
}
</script>

<style lang="scss"></style>
