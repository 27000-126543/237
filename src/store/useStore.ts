import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/api';
import type { User, Product, Designer } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (data: any) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
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

type AppState = AuthState & CartState & SelectionState;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (phone: string, password: string) => {
        const res = await authAPI.login({ phone, password });
        set({
          user: res.user,
          token: res.token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', res.token);
      },

      register: async (data: any) => {
        const res = await authAPI.register(data);
        set({
          user: res.user,
          token: res.token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', res.token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          items: [],
          selectedDesigner: null,
          selectedProduct: null,
        });
        localStorage.removeItem('token');
      },

      updateUser: async (data: any) => {
        const res = await authAPI.updateProfile(data);
        set({ user: res.user });
      },

      fetchCurrentUser: async () => {
        try {
          const res = await authAPI.getCurrentUser();
          set({ user: res.user, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false, token: null });
          localStorage.removeItem('token');
        }
      },

      items: [],

      addItem: (product: Product, quantity: number = 1) => {
        const items = [...get().items];
        const productId = product._id || product.id;
        const existingIndex = items.findIndex(
          (item) => (item.product._id || item.product.id) === productId
        );

        if (existingIndex >= 0) {
          items[existingIndex].quantity += quantity;
        } else {
          items.push({ product, quantity, selected: true });
        }

        set({ items });
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => (item.product._id || item.product.id) !== productId),
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            (item.product._id || item.product.id) === productId ? { ...item, quantity } : item
          ),
        });
      },

      toggleSelect: (productId: string) => {
        set({
          items: get().items.map((item) =>
            (item.product._id || item.product.id) === productId
              ? { ...item, selected: !item.selected }
              : item
          ),
        });
      },

      selectAll: (selected: boolean) => {
        set({
          items: get().items.map((item) => ({ ...item, selected })),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSelectedItems: () => {
        return get().items.filter((item) => item.selected);
      },

      getSelectedTotalPrice: () => {
        return get()
          .getSelectedItems()
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
      },

      selectedDesigner: null,
      selectedProduct: null,

      setSelectedDesigner: (designer: Designer | null) => {
        set({ selectedDesigner: designer });
      },

      setSelectedProduct: (product: Product | null) => {
        set({ selectedProduct: product });
      },
    }),
    {
      name: 'zhujia-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        items: state.items,
      }),
    }
  )
);
