import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { signupClient, loginClient, getMe, logoutClient } from '@/services/auth-service';
import Router from '@/router';
import locale from "@/locales";

const { t } = locale.global;

export const useAuthStore = defineStore('auth', () => {
    const state = reactive({
        formType: 'login' as 'login' | 'signup',
        currentUser: {} as any,
        loading: false,
        loginFields: {
            email: '',
            password: '',
        },
        signupFields: {
            email: '',
            password: '',
            name: '',
            refPassword: '',
        }
    });

    function setFormType(type: 'login' | 'signup') {
        state.formType = type;
    }

    function signup() {
        const params = {
            email: state.signupFields.email,
            password: state.signupFields.password,
            name: state.signupFields.name,
        }

        return signupClient(params);
    }

    async function login() {
        const params = {
            email: state.loginFields.email,
            password: state.loginFields.password,
        }
        try {
            const response: any = await loginClient(params);

            if (response.email !== state.loginFields.email) {
                throw new Error(t('auth.erros.invalidData'));
            }

            state.currentUser = response;
        } catch (error: any) {
            throw error;
        }
    }

    async function setMe() {
        return await getMe()
            .then(response => {
                state.currentUser = response;
            })
            .catch(() => {
                state.currentUser = {};
                throw new Error(t('auth.errors.invalidData'));
            });
    }

    async function logout() {
        return await logoutClient()
            .then(() => {
                state.currentUser = {};
                Router.push({ name: 'Books' });
            });
    }

    function clearFields() {
        state.signupFields = {
            email: '',
            password: '',
            name: '',
            refPassword: '',
        }
        state.loginFields = {
            email: '',
            password: '',
        }
    }

    return {
        state,
        setFormType,
        signup,
        login,
        clearFields,
        setMe,
        logout
    };
});