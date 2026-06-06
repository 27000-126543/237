import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Product, Designer, CartItem } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, specs?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSelectedItems: () => CartItem[];
  getSelectedTotalPrice: () => number;
}

interface SelectionState {
  selectedDesigner: Designer | null;
  selectedProduct: Product | null;
  setSelectedDesigner: (designer: Designer | null) => void;
  setSelectedProduct: (product: Product | null) => void;
}

type StoreState = AuthState & CartState & SelectionState;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      items: [],
      selectedDesigner: null,
      selectedProduct: null,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false, items: [] }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      addItem: (product, quantity = 1, specs) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0] || '',
            specs,
            selected: true,
          };

          return {
            items: [...state.items, newItem],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      toggleSelect: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, selected: !item.selected }
              : item
          ),
        })),

      selectAll: (selected) =>
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected })),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getSelectedItems: () => {
        const state = get();
        return state.items.filter((item) => item.selected);
      },

      getSelectedTotalPrice: () => {
        const state = get();
        return state.items
          .filter((item) => item.selected)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },

      setSelectedDesigner: (designer) => set({ selectedDesigner: designer }),

      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: 'zhujia-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        items: state.items,
      }),
    }
  )
);
