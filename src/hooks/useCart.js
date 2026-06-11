/**
 * src/hooks/useCart.js
 * Custom Hook para la gestión del carrito de compras (Criterio 3.1.3)
 */

import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage.js';
import { calculateTotal } from '../utils/helpers.js';

export const useCart = () => {
  // Estado local del carrito
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar carrito desde LocalStorage al montar
  useEffect(() => {
    try {
      const cart = StorageService.getCart();
      setItems(cart || []);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar en LocalStorage cada vez que el carrito cambie
  useEffect(() => {
    if (!loading) {
      StorageService.updateCart(items);
    }
  }, [items, loading]);

  /**
   * Agrega un producto al carrito
   */
  const addToCart = (newItem) => {
    setItems((prevItems) => {
      // Verificar si el producto ya existe (misma ID)
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, qty: item.qty + newItem.qty } : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  /**
   * Elimina un producto del carrito
   */
  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * Actualiza la cantidad de un producto
   */
  const updateQty = (id, newQty) => {
    if (newQty < 1) return removeFromCart(id);
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: parseInt(newQty, 10) } : item
      )
    );
  };

  /**
   * Vacía el carrito
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Confirma la compra (Mueve items a historial)
   */
  const checkout = () => {
    if (items.length === 0) return false;
    
    try {
      // Registrar venta en historial
      StorageService.checkout(items);
      // Limpiar carrito
      setItems([]);
      return true;
    } catch (error) {
      console.error("Error en checkout:", error);
      return false;
    }
  };

  // Cálculos derivados (useMemo implícito)
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const { total, shipping } = calculateTotal(subtotal);
  const count = items.reduce((acc, item) => acc + item.qty, 0);

  return {
    items,
    loading,
    subtotal,
    total,
    shipping,
    count,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    checkout
  };
};