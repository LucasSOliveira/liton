import { createI18n } from 'vue-i18n';
import messages from '@/locales/messages';

export const availableLocales = [
    {
        label: 'Português',
        value: 'pt-BR'
    },
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'Español',
        value: 'es',
    }
]

const locale = createI18n({
    legacy: false,
    locale: 'pt-BR',
    fallbackLocale: 'en',
    messages
});

export default locale;