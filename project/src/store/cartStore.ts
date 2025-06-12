import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ShippingAddress } from '../types';

interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string;
  
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  saveShippingAddress: (data: ShippingAddress) => void;
  savePaymentMethod: (method: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      shippingAddress: null,
      paymentMethod: '',
      
      addToCart: (item) => set((state) => {
        const existItem = state.cartItems.find((x) => x._id === item._id);
        
        if (existItem) {
          return {
            cartItems: state.cartItems.map((x) => 
              x._id === existItem._id ? item : x
            ),
          };
        } else {
          return {
            cartItems: [...state.cartItems, item],
          };
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((x) => x._id !== id),
      })),
      
      updateCartQuantity: (id, qty) => set((state) => ({
        cartItems: state.cartItems.map((item) => 
          item._id === id ? { ...item, qty } : item
        ),
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      saveShippingAddress: (data) => set({ shippingAddress: data }),
      
      savePaymentMethod: (method) => set({ paymentMethod: method }),
    }),
    {
      name: 'cart-storage',
    }
  )
);