<template>
  <Header />
  <main class="flex flex-col items-center justify-center h-[calc(100vh-208px)]">
    <section class="w-full max-w-[600px] p-4">
      <Logo @click="goHome" />
      <h1 class="text-xl">{{ t(`auth.${state.formType}.tittle`) }}</h1>
      <h3 class="mb-6">{{ t(`auth.${state.formType}.description`) }}</h3>
      <LoginForm v-if="state.formType === 'login'" />
      <SignupForm v-if="state.formType === 'signup'" />
    </section>
  </main>
</template>

<script setup lang="ts">
import Header from "@/layouts/Header";
import Logo from "@/layouts/Logo";
import LoginForm from "@/layouts/LoginForm";
import SignupForm from "@/layouts/SignupForm";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/auth-store";
import router from "@/router";

const { t } = useI18n();
const { state } = useAuthStore();

function goHome() {
  router.push({ name: "Books" });
}
</script>

<style scoped></style>
s