import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartItemWithPricing } from '../components/interfaces/pricing.interface';
import { AutoPurchaseFormValues } from '../lib/validators';

export interface CartState {
  items: CartItemWithPricing[];
  totalItemsInCart: number;
  subtotal: number;
  discountCode: string | null;
  discount: number;
  totalAmount: number;
  autoDeliveryData: AutoPurchaseFormValues | null;

  addItem: (item: CartItemWithPricing) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  setAutoDeliveryData: (data: AutoPurchaseFormValues | null) => void;
  cleanCart: () => void;
  applyDiscount: (code: string, amount: number) => void;
  clearDiscount: () => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItemsInCart: 0,
  subtotal: 0,
  discountCode: null,
  discount: 0,
  totalAmount: 0,
  autoDeliveryData: null,

  addItem: (item) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.variantId === item.variantId
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, item];
      }

      const subtotal = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemsInCart: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        subtotal,
        totalAmount: subtotal - state.discount,
      };
    });
  },

  removeItem: (variantId) => {
    set((state) => {
      const updatedItems = state.items.filter((i) => i.variantId !== variantId);

      const subtotal = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemsInCart: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        subtotal,
        totalAmount: subtotal - state.discount,
      };
    });
  },

  updateQuantity: (variantId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      );

      const subtotal = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemsInCart: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        subtotal,
        totalAmount: subtotal - state.discount,
      };
    });
  },

  setAutoDeliveryData: (data) => {
    set({ autoDeliveryData: data });
  },

  cleanCart: () => {
    set({
      items: [],
      totalItemsInCart: 0,
      subtotal: 0,
      discountCode: null,
      discount: 0,
      totalAmount: 0,
      autoDeliveryData: null,
    });
  },

  applyDiscount: (code, amount) => {
    set((state) => {
      const subtotal = state.items.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        discountCode: code,
        discount: amount,
        subtotal,
        totalAmount: subtotal - amount,
      };
    });
  },

  clearDiscount: () => {
    set((state) => {
      const subtotal = state.items.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        discountCode: null,
        discount: 0,
        subtotal,
        totalAmount: subtotal,
      };
    });
  },
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(storeApi, {
      name: 'cart-store',
      partialize: (state) => ({
        items: state.items,
        totalItemsInCart: state.totalItemsInCart,
        subtotal: state.subtotal,
        discountCode: state.discountCode,
        discount: state.discount,
        totalAmount: state.totalAmount,
      }),
    })
  )
);
