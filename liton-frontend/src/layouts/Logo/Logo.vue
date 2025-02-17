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

const fullPre = ref(t("logo.pre"));
const fullPost = ref(t("logo.suf"));

const pre = ref(fullPre.value);
const post = ref(fullPost.value);

const finalPre = fullPre.value.slice(0, 3);
const finalPost = fullPost.value.slice(0, 2);

function animateBackspace() {
  const interval = setInterval(() => {
    let updated = false;
    if (pre.value.length > finalPre.length) {
      pre.value = pre.value.slice(0, -1);
      updated = true;
    }
    if (post.value.length > finalPost.length) {
      post.value = post.value.slice(0, -1);
      updated = true;
    }
    if (!updated) {
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