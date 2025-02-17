<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
    <template v-if="state.loading">
      <div
        v-for="index in 18"
        :key="index"
        class="flex flex-col items-center gap-2 bg-card shadow-md rounded-md p-2 h-[300px]"
      >
        <Skeleton class="w-full rounded-md" style="height: 300px" />
        <Skeleton class="w-2/3 h-4" />
      </div>
    </template>
    <template v-else-if="state.books.length > 0">
      <div
        v-for="book in state.books"
        :key="book.id"
        @click="openBookModal(book)"
        class="flex flex-col items-center gap-2 bg-card shadow-md rounded-md p-2 cursor-pointer w-full h-full:"
      >
        <div class="w-full h-full">

          <div
            v-if="!loadedImages[book.id]"
            class="flex w-full h-full items-center min-h-[300px] justify-center bg-gray-200 rounded-md animate-pulse"
          ></div>
          <img
            v-show="loadedImages[book.id]"
            :src="book?.coverUrl || BookEmpty"
            :alt="book.title"
            @load="handleImageLoad(book.id)"
            class="w-full h-full min-h-[300px] object-contain rounded-md p-1"
          />
        </div>
        <p class="font-semibold text-[0.8rem] text-[var(--dark)] max-h-[50px] line-clamp-2">
          {{ book.title }}
        </p>
      </div>
    </template>
  </div>
  <div
    v-if="state.books.length === 0"
    class="flex flex-col items-center justify-center gap-2 text-2xl w-full h-[300px]"
  >
    <p v-show="state.search">{{ `${t("books.notFound")}: "${state.search}"` }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BookEmpty from "@/assets/images/book-empty.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useBooks } from "@/modules/books/store/books-composable";
import { useI18n } from "vue-i18n";
import type { Book } from "@/types/books-type";

const { t } = useI18n();
const { state, handlerBookModal } = useBooks();
const loadedImages = reactive<Record<string, boolean>>({});

function openBookModal(book: Book) {
  handlerBookModal(book);
}

function handleImageLoad(id: string | number) {
  loadedImages[id] = true;
}
</script>