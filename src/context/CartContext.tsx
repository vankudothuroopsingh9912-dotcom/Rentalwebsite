import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  duration: number; // in months: 1, 3, 6, 12, 24
  startDate?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, duration?: number) => void;
  removeFromCart: (productId: string) => void;
  updateDuration: (productId: string, duration: number) => void;
  clearCart: () => void;
  itemCount: number;
  calculateMonthlyRate: (product: Product, duration: number) => number;
  subtotalMonthly: number;
  totalDeposit: number;
  estimatedGrandTotal: number;
  isItemInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rentease_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rentease_cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const calculateMonthlyRate = (product: Product, duration: number) => {
    let discount = 1;
    if (duration >= 12) discount = 0.8;
    else if (duration >= 6) discount = 0.9;
    return Math.round(product.pricePerMonth * discount);
  };

  const addToCart = (product: Product, duration: number = 3) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id ? { ...i, duration } : i
        );
      }
      return [...prev, { product, duration }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product._id !== productId));
  };

  const updateDuration = (productId: string, duration: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product._id === productId ? { ...i, duration } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isItemInCart = (productId: string) => {
    return items.some((i) => i.product._id === productId);
  };

  const subtotalMonthly = items.reduce((sum, item) => {
    return sum + calculateMonthlyRate(item.product, item.duration);
  }, 0);

  const totalDeposit = items.reduce((sum, item) => {
    return sum + (item.product.securityDeposit || 0);
  }, 0);

  const estimatedGrandTotal = items.reduce((sum, item) => {
    const monthlyRate = calculateMonthlyRate(item.product, item.duration);
    return sum + monthlyRate * item.duration + (item.product.securityDeposit || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateDuration,
        clearCart,
        itemCount: items.length,
        calculateMonthlyRate,
        subtotalMonthly,
        totalDeposit,
        estimatedGrandTotal,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
