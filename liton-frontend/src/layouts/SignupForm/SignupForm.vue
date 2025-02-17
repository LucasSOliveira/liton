<template>
  <div class="flex flex-col gap-8 h-full">
    <div class="flex flex-col gap-6">
      <Input
        id="signup-name"
        icon="person"
        mask="M.repeat(20)"
        v-model="state.signupFields.name"
        :placeholder="t('auth.signup.name')"
        :error="erros.name"
      />
      <Input
        id="signup-email"
        icon="email"
        v-model="state.signupFields.email"
        :placeholder="t('auth.signup.email')"
        :error="erros.email"
      />
      <Input
        id="signup-password"
        type="password"
        mask="P.repeat(20)"
        v-model="state.signupFields.password"
        :placeholder="t('auth.signup.password')"
        :error="erros.password"
      />
      <Input
        id="signup-ref-password"
        type="password"
        mask="P.repeat(20)"
        v-model="state.signupFields.refPassword"
        :placeholder="t('auth.signup.refPassword')"
        :error="erros.refPassword"
      />
    </div>
    <div class="w-full">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
        <Button
          id="signup-button-back"
          @click="setFormType('login')" variant="outline">
          {{ t("auth.signup.toLogin") }}
        </Button>
        <Button
          id="signup-button-submit"
          @click="makeSingup"
          class="cursor-pointer"
          :disabled="!isValidSignup"
        >
          <span>{{ t("auth.signup.action") }}</span>
        </Button>
      </div>
    </div>
    <div v-if="erros.apiError" class="flex flex-col text-[var(--error)]">
      <span>{{ t("auth.erros.erroLogin") }}</span>
      <p>{{ erros.apiError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from "vue";
import { validateSignup } from "@/schemas/login-schema";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import Button from "@/components/Button";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/auth-store";

const { t } = useI18n();
const { state, setFormType, signup } = useAuthStore();
const isValidSignup = ref(false);
const erros = reactive({
  name: "",
  email: "",
  password: "",
  refPassword: "",
  apiError: "",
});

async function makeSingup() {
  try {
    await signup();

    state.formType = "login";
    state.loginFields.email = state.signupFields.email;
    Toast({
      message: t("auth.messages.register"),
      type: "success",
    });
  } catch (error: any) {
    erros.apiError = error.message;
    Toast({
      message: t("auth.erros.erroRegister"),
      type: "error",
    });
  }
}

watch(
  () => [state.signupFields],
  async () => {
    const validate = await validateSignup(state.signupFields);

    isValidSignup.value = validate.isValid;
    erros.name = validate.errors.name || "";
    erros.email = validate.errors.email || "";
    erros.password = validate.errors.password || "";
    erros.refPassword = validate.errors.refPassword || "";
  },
  { deep: true, immediate: true }
);
</script>
