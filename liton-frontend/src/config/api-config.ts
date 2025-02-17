import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const API_BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const pathIgnore = ['/auth/login', '/auth/signup', '/auth/logout', '/auth/me', 'auth/create', '/books'];
const isIgnore = (url: any) => pathIgnore.some((path) => url.includes(path));

api.interceptors.response.use(
  async (response) => {
    console.log('response.status', response.status);
    const authStore = useAuthStore();
    const currentUser = authStore.state.currentUser;
    const pathIgnore = isIgnore(response.config?.url);
    
    if (pathIgnore) {
      return response;
    }
    if (currentUser && !currentUser?.email) {
      try {
        await authStore.setMe();
      } catch (error) {
        authStore.logout();
      }
    }
    return response;
  },
  (error) => {
    console.log('error.response.status', error.response?.status);
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.state.currentUser = {};
    }
    return Promise.reject(error);
  }
);

export default api;
