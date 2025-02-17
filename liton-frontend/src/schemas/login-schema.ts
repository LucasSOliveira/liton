import * as yup from "yup";
import locale from "@/locales";

const { t } = locale.global;

export const signupSchema = yup.object({
    name: yup
      .string()
      .min(3, t("auth.erros.nameMinValue"))
      .required(t("auth.erros.requiredField")),
    email: yup
      .string()
      .email(t("auth.erros.invalidEmail"))
      .required(t("auth.erros.requiredField")),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required(t("auth.erros.requiredField")),
    refPassword: yup
      .string()
      .oneOf([yup.ref('password')], t("auth.erros.invalidRefPassword"))
      .required(t("auth.erros.requiredField")),
  });

export const loginSchema = yup.object({
    email: yup
      .string()
      .email(t("auth.erros.invalidEmail"))
      .required(t("auth.erros.requiredField")),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required(t("auth.erros.requiredField")),
  });


export async function validateLogin(data: {
    email: string;
    password: string;
}): Promise<{
    isValid: boolean;
    errors: { email?: string; password?: string };
}> {
    try {
        await loginSchema.validate(data, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error: any) {
        const errors = error.inner.reduce((acc: any, err: any) => {
            acc[err.path] = err.message;
            return acc;
        }, {});

        return { isValid: false, errors };
    }
}

export async function validateSignup(data: {
  name: string;
  email: string;
  password: string;
  refPassword: string;
}): Promise<{
  isValid: boolean;
  errors: { name?: string; email?: string; password?: string; refPassword?: string };
}> {
  try {
    await signupSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error: any) {
    const errors = error.inner.reduce((acc: Record<string, string>, err: any) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
    return { isValid: false, errors };
  }
}