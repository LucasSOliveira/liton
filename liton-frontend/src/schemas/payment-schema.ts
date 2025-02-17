import * as yup from 'yup';
import { isValidCardExpiration } from '@/utils/card-validate'
import locale from "@/locales";
import type { PaymentData } from '@/types/payment-type';

const { t } = locale.global;

export const paymentSchema = yup.object({
    cardName: yup
        .string()
        .max(40, t("cart.errors.cardNameMax"))
        .required(t("cart.errors.cardName")),
    cardNumber: yup
        .string()
        .required(t("cart.errors.cardNumber"))
        .matches(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, t("cart.errors.cardNumberInvalid")),
    cardCCV: yup
        .string()
        .required(t("cart.errors.cardCCV"))
        .matches(/^\d{3}$/, (t("cart.errors.cardCCVInvalid"))),
    cardValidity: yup
        .string()
        .required(t("cart.errors.cardValidity"))
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, t("cart.errors.cardValidityInvalid"))
        .test('expiration', 'Cartão expirado', (value: string) => (value ? isValidCardExpiration(value) : false)),
});


export async function validatePayment(
    data: PaymentData
): Promise<{ isValid: boolean; errors: PaymentData }> {
    try {
        await paymentSchema.validate(data, { abortEarly: false });
        return { isValid: true, errors: {
            cardName: '',
            cardNumber: '',
            cardCCV: '',
            cardValidity: ''
        } };
    } catch (error: any) {
        const errors = (error.inner as Array<{ path: string | number; message: any; }>).reduce<PaymentData>((acc: PaymentData, err: { path: string | number; message: any; }) => {
            acc[err.path as keyof PaymentData] = err.message;
            return acc;
        }, {
            cardName: '',
            cardNumber: '',
            cardCCV: '',
            cardValidity: ''
        });
        return { isValid: false, errors };
    }
}