<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
    <h1 class="text-9xl font-[var(--font-display)]">404</h1>
    <p class="mt-4 text-2xl text-gray-700">Page not found</p>
    <button 
      @click="goHome" 
      class="mt-8 px-6 py-3 text-2xl cursor-pointer bg-[var(--color-primary)] text-white rounded-lg"
    >
      Go to Home
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function goHome() {
  router.push("/");
}
</script>

<style scoped></style>