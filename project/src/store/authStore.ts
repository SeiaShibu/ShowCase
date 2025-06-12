import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { UserInfo } from '../types';

interface AuthState {
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: { name?: string; email?: string; password?: string }) => Promise<void>;
}

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
          set({ userInfo: data, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message,
            isLoading: false 
          });
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(`${API_URL}/users`, { name, email, password });
          set({ userInfo: data, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message,
            isLoading: false 
          });
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      },
      
      logout: () => {
        set({ userInfo: null });
      },
      
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${useAuthStore.getState().userInfo?.token}`,
            },
          };
          
          const { data } = await axios.put(`${API_URL}/users/profile`, userData, config);
          set({ userInfo: data, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message,
            isLoading: false 
          });
          throw new Error(error.response?.data?.message || 'Profile update failed');
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);