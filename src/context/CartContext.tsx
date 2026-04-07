import React, { createContext, useContext, useState, useCallback } from "react";
import type { Cookie } from "@/data/cookies";

export interface CartItem {
  cookie: Cookie;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (cookie: Cookie) => void;
  removeFromCart: (cookieId: string) => void;
  updateQuantity: (cookieId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((cookie: Cookie) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.cookie.id === cookie.id);
      if (existing) {
        return prev.map((item) =>
          item.cookie.id === cookie.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { cookie, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((cookieId: string) => {
    setItems((prev) => prev.filter((item) => item.cookie.id !== cookieId));
  }, []);

  const updateQuantity = useCallback((cookieId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cookie.id !== cookieId));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.cookie.id === cookieId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.cookie.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
