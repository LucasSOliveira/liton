import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { availableLocales } from '@/locales'
import Locales from '@/locales';
import type { WritableComputedRef } from 'vue';

export const useLocaleStore = defineStore('locale', () => {
    const state = reactive({
        currentLocale: Locales.global.locale as WritableComputedRef<string>,
        availableLocales: availableLocales,
    });

    function setLocale(locale: "pt-BR" | "en" | "es") {
        state.currentLocale = locale;
        Locales.global.locale.value = locale;
    };

    return {
        state,
        setLocale
    };
},
    {
        persist: true
    }
);