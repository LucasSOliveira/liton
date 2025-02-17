import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { authGuard } from '@/router/auth-guard'

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.meta.title) {
        document.title = to.meta.title ? `LitOn | ${to.meta.title}` : 'LitOn'
    }
    authGuard(to, _, next)
})


export default router;