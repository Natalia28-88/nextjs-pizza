import React from 'react';
import { useCartStore } from '../store';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const [
    totalAmount,
    items,
    addCartItem,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    loading,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.addCartItem,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
    state.loading,
  ]);

  // const cartState = useCartStore((state) => state);
  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    totalAmount,
    items,
    loading,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  };
};
