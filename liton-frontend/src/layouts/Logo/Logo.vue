<template>
  <div class="liton-logo">
    <h1 class="liton-logo__pre">{{ pre }}</h1>
    <h1 class="liton-logo__post">{{ post }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const fullPre = t("logo.pre");
const fullPost = t("logo.suf");
const pre = ref(fullPre);
const post = ref(fullPost);
const finalPre = fullPre.slice(0, 3);
const finalPost = fullPost.slice(0, 2);

function animateBackspace() {
  let currentPre = fullPre;
  let currentPost = fullPost;
  const interval = setInterval(() => {
    if (currentPre.length > finalPre.length) {
      currentPre = currentPre.slice(0, -1);
      pre.value = currentPre;
    }
    if (currentPost.length > finalPost.length) {
      currentPost = currentPost.slice(0, -1);
      post.value = currentPost;
    }
    if (
      currentPre.length <= finalPre.length &&
      currentPost.length <= finalPost.length
    ) {
      clearInterval(interval);
      pre.value = finalPre;
      post.value = finalPost;
    }
  }, 400);
}

setTimeout(() => {
  animateBackspace();
}, 4000);
</script>

<style scoped lang="scss">
.liton-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-family: var(--font-display);
  line-height: 1;
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 4rem;
  }
  &__post {
    font-style: italic;
    font-weight: bold;
  }
}
</style>
