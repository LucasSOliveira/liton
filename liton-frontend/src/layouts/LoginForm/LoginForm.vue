<template>
  <form @submit.prevent="makeLogin" class="flex flex-col gap-8 h-full">
    <div class="flex flex-col gap-6">
      <Input
        id="login-email"
        icon="email"
        v-model="state.loginFields.email"
        mask="E.repeat(50)"
        :placeholder="t('auth.login.email')"
        :error="erros.email"
      />
      <Input
        id="login-password"
        type="password"
        mask="P.repeat(20)"
        v-model="state.loginFields.password"
        :placeholder="t('auth.login.password')"
        :error="erros.password"
      />
    </div>
    <div class="w-full">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
        <Button
          id="login-button-back"
          type="button"
          @click="setFormType('signup')"
          class="cursor-pointer"
          :disabled="state.loading"
          variant="outline"
        >
          {{ t("auth.login.toSignup") }}
        </Button>
        <Button
          id="login-button-submit"
          type="submit"
          class="cursor-pointer"
          variant="default"
          :disabled="!isValidLogin || state.loading"
        >
          <span>{{ t("auth.login.action") }}</span>
        </Button>
      </div>
    </div>
    <div v-if="erros.apiError" class="flex flex-col text-[var(--error)]">
      <span>{{ t("auth.erros.erroLogin") }}</span>
      <p>{{ erros.apiError }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from "vue";
import { validateLogin } from "@/schemas/login-schema";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/auth-store";
import Router from "@/router";

const { t } = useI18n();
const { state, setFormType, login, clearFields } = useAuthStore();
const isValidLogin = ref(false);
const erros = reactive({
  email: "",
  password: "",
  apiError: "",
});

async function makeLogin() {
  try {
    await login();
    erros.apiError = "";
    clearFields();
    Router.push({ name: "Books" });
  } catch (error: any) {
    erros.apiError = error.message;
  }
}

watch(
  () => [state.loginFields],
  async () => {
    const validate = await validateLogin(state.loginFields);

    isValidLogin.value = validate.isValid;
    erros.email = validate.errors.email || "";
    erros.password = validate.errors.password || "";
  },
  { deep: true, immediate: true }
);
</script>