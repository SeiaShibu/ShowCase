import { create } from 'zustand';
import axios from 'axios';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: (filters?: { category?: string, brand?: string, search?: string }) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchProductDetails: (id: string) => Promise<void>;
}

const API_URL = 'http://localhost:5000/api';

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  featuredProducts: [],
  product: null,
  loading: false,
  error: null,
  
  fetchProducts: async (filters) => {
    set({ loading: true, error: null });
    try {
      let url = `${API_URL}/products`;
      
      // Add query parameters if filters are provided
      if (filters) {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.search) params.append('search', filters.search);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const { data } = await axios.get(url);
      set({ products: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
  
  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/products/featured`);
      set({ featuredProducts: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
  
  fetchProductDetails: async (id) => {
    set({ loading: true, error: null, product: null });
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      set({ product: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message,
        loading: false 
      });
    }
  },
}));