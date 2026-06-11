import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { StorageService } from '../services/storage.js';

const CartContext = createContext();

const initialState = {
  items: [],
  isLoading: true
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return { items: action.payload, isLoading: false };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'CHECKOUT':
      StorageService.checkout(state.items);
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const cart = StorageService.getCart();
    dispatch({ type: 'LOAD_CART', payload: cart });
  }, []);

  const addToCart = (item) => {
    const newItem = { ...item, id: Date.now(), createdAt: new Date().toISOString() };
    StorageService.addToCart(newItem);
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const updateQty = (id, qty) => {
    StorageService.updateCartItem(id, { qty });
    dispatch({ type: 'UPDATE_ITEM', payload: { id, qty } });
  };

  const removeFromCart = (id) => {
    StorageService.removeFromCart(id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    StorageService.clearCart();
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkout = () => {
    dispatch({ type: 'CHECKOUT' });
  };

  const value = {
    ...state,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    checkout,
    subtotal: state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    shipping: state.items.reduce((sum, i) => sum + i.price * i.qty, 0) >= 50000 ? 0 : 4990,
    total: state.items.reduce((sum, i) => sum + i.price * i.qty, 0) + 
           (state.items.reduce((sum, i) => sum + i.price * i.qty, 0) >= 50000 ? 0 : 4990)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};