import api from "@/config/api-config";
import Toast from "@/components/Toast";
import type { SignUpClientParams, loginClientParams } from "@/types/auth-type";


export async function signupClient({
    email,
    password,
    name,
}: SignUpClientParams): Promise<any> {
    try {
        const url = `auth/create`;
        const params = {
            email,
            password,
            name,
        };
        const response = await api.post(url, params);

        return response.data;
    } catch (error: any) {
        Toast({ message: error, type: "error" });
        throw error;
    }
}

export async function loginClient({
    email,
    password,
}: loginClientParams): Promise<any> {
    try {
        const url = `/auth/login`;
        const params = {
            email,
            password,
        };
        await api.post(url, params);

        const me = await getMe();
        return me;
    } catch (error: any) {
        Toast({ message: error, type: "error" });
        throw error;
    }
}

export async function getMe(): Promise<any> {
    try {
        const url = `/auth/me`;
        const response = await api.get(url);

        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export async function logoutClient(): Promise<any> {
    try {
        const url = `/auth/logout`;
        await api.post(url);

        return;
    } catch (error: any) {
        throw error;
    }
}
