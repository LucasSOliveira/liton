import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/store/auth-store';

export async function authGuard(
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const authStore = useAuthStore();

    if (!authStore.state.currentUser?.email) {
        await authStore.setMe()
            .catch(() => {
                if (!authStore.state.currentUser?.email && to.meta.auth) {
                    next({ name: 'Login' });
                    return;
                }
            })

    }

    if (to.name === 'Login' && authStore.state.currentUser?.email) {
        next({ name: 'Books' });
    }

    if (to.meta.auth && authStore.state.currentUser?.email) {
        next();
    } else if (!to.meta.auth) {
        next();
    } else {
        next({ name: 'Login' });
    }
}
