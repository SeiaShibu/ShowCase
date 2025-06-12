import { create } from 'zustand';
import axios from 'axios';
import { Order, CartItem, ShippingAddress } from '../types';
import { useAuthStore } from './authStore';

interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  
  // Actions
  createOrder: (order: {
    orderItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }) => Promise<string>;
  getOrderDetails: (id: string) => Promise<void>;
  payOrder: (orderId: string, paymentResult: any) => Promise<void>;
  listMyOrders: () => Promise<void>;
  resetOrder: () => void;
}

const API_URL = 'http://localhost:5000/api';

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  order: null,
  loading: false,
  success: false,
  error: null,
  
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().userInfo?.token}`,
        },
      };
      
      const { data } = await axios.post(`${API_URL}/orders`, orderData, config);
      set({ loading: false, success: true });
      return data._id;
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false,
        success: false
      });
      throw new Error(error.response?.data?.message || 'Order creation failed');
    }
  },
  
  getOrderDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userInfo?.token}`,
        },
      };
      
      const { data } = await axios.get(`${API_URL}/orders/${id}`, config);
      set({ order: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
  
  payOrder: async (orderId, paymentResult) => {
    set({ loading: true, error: null });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().userInfo?.token}`,
        },
      };
      
      const { data } = await axios.put(
        `${API_URL}/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      
      set({ order: data, loading: false, success: true });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
  
  listMyOrders: async () => {
    set({ loading: true, error: null });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userInfo?.token}`,
        },
      };
      
      const { data } = await axios.get(`${API_URL}/orders/myorders`, config);
      set({ orders: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
  
  resetOrder: () => {
    set({ order: null, success: false, error: null });
  },
}));