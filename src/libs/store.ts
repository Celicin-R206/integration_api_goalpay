import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  label: string;
  unit_price: number;
  quantity: number;
  tag: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  increaseQuantity: (label: string) => void;
  decreaseQuantity: (label: string) => void;
  removeItem: (label: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.label === item.label);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.label === item.label
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      increaseQuantity: (label) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.label === label
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),
      decreaseQuantity: (label) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.label === label
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (label) =>
        set((state) => ({
          items: state.items.filter((item) => item.label !== label),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
