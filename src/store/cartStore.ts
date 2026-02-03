import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  
  // Cart actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Cart state
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Cart calculations
  getCartCount: () => number;
  getCartTotal: () => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((i) => i.product.id === product.id);

        if (existingItem) {
          // Update quantity
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          // Add new item
          set({ items: [...items, { product, quantity }] });
        }
        
        // Open cart when item is added
        set({ isCartOpen: true });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isCartOpen: !get().isCartOpen });
      },

      openCart: () => {
        set({ isCartOpen: true });
      },

      closeCart: () => {
        set({ isCartOpen: false });
      },

      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => {
            return total + item.product.price * item.quantity;
          },
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => {
            return total + item.product.price * item.quantity;
          },
          0
        );
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ items: state.items }), // Only persist items, not isCartOpen
    }
  )
);
