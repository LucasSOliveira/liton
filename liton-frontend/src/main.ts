import { createApp, type Directive } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import locale from '@/locales'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import vMask from "@/directives/vmask-directive"
import '@/assets/styles/theme.css'
import '@/components/Toast/toast.scss'

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

createApp(App)
    .directive('mask', vMask as Directive)
    .use(pinia)
    .use(router)
    .use(locale)
    .mount('#app')
