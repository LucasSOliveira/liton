<template>
  <Header showCart />
  <main class="pb-50">
    <section class="container mx-auto px-4 py-9">
      <div class="flex flex-col items-center justify-center gap-2 mb-6">
        <Logo />
        <p class="max-w-[490px] text-center">{{ t("books.description") }}</p>
      </div>

      <div class="flex flex-col items-center justify-center gap-2 mb-6">
        <Input
          id="search"
          class="max-w-[512px] w-full"
          :placeholder="t('books.seacrchPlaceholder')"
          icon="search"
          v-model="state.search"
        />
      </div>
    </section>
    <section class="container mx-auto px-4 w-full">
      <BooksCards />
    </section>
    <BookModal />
    <button
      v-if="showScrollButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-primary text-secondary font p-4 rounded-full shadow-lg transition-colors cursor-pointer"
      aria-label="Back to top"
    >
      <i class="material-symbols-outlined"> arrow_warm_up </i>
    </button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import Header from "@/layouts/Header";
import Input from "@/components/Input";
import BooksCards from "../components/BooksCards.vue";
import BookModal from "../components/BookModal.vue";
import Logo from "@/layouts/Logo";
import { useI18n } from "vue-i18n";
import { useBooks } from "@/modules/books/store/books-composable";
import { useCartStore } from "@/store/cart-store";

const { state, getBooks, loadMoreBooks } = useBooks();
const cartStore = useCartStore();
const { t } = useI18n();
const showScrollButton = ref(false);

function handleScroll() {
  const scrollPos = window.innerHeight + window.scrollY;
  const threshold = document.documentElement.offsetHeight - 300;
  if (scrollPos >= threshold) {
    loadMoreBooks();
  }

  showScrollButton.value = window.scrollY > 100;
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


onMounted(() => {
  getBooks();
  cartStore.state.cartState.showButton = true;
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
