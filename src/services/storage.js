import { encrypt, decrypt } from '../utils/encryption.js';
import { STORAGE_KEYS } from '../config/constants.js';

const loadDB = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENCRYPTED);
    return raw ? decrypt(raw) : { cart: [], sales: [], encrypted: [] };
  } catch {
    return { cart: [], sales: [], encrypted: [] };
  }
};

const saveDB = (db) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ENCRYPTED, encrypt(db));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
};

export const StorageService = {
  // 🛒 Cart Operations
  getCart: () => loadDB().cart,
  addToCart: (item) => {
    const db = loadDB();
    const existing = db.cart.find(i => i.product === item.product && i.payment === item.payment);
    if (existing) {
      existing.qty += item.qty;
    } else {
      db.cart.push({ ...item, id: Date.now() });
    }
    saveDB(db);
  },
  updateCartItem: (id, updates) => {
    const db = loadDB();
    const index = db.cart.findIndex(i => i.id !== id);
    if (index !== -1) {
      db.cart[index] = { ...db.cart[index], ...updates };
      saveDB(db);
    }
  },
  removeFromCart: (id) => {
    const db = loadDB();
    db.cart = db.cart.filter(i => i.id !== id);
    saveDB(db);
  },
  clearCart: () => {
    const db = loadDB();
    db.cart = [];
    saveDB(db);
  },

  // 🧾 Sales Operations
  getSales: () => loadDB().sales,
  checkout: (cartItems) => {
    const db = loadDB();
    const sales = cartItems.map(item => ({
      ...item,
      checkoutId: Date.now(),
      checkoutDate: new Date().toISOString()
    }));
    db.sales.push(...sales);
    db.cart = [];
    saveDB(db);
    return sales;
  },
  removeSale: (id) => {
    const db = loadDB();
    db.sales = db.sales.filter(i => i.checkoutId !== id);
    saveDB(db);
  },

  // 🔐 Encrypted Storage
  getEncrypted: () => loadDB().encrypted,
  addEncrypted: (data) => {
    const db = loadDB();
    const encryptedItem = {
      id: Date.now(),
      name: data.name,
      cipher: encrypt(data.secret),
      hash: data.hash,  // ✅ AGREGAR HASH
      createdAt: new Date().toISOString()
    };
    db.encrypted.push(encryptedItem);
    saveDB(db);
    return encryptedItem;
  },
  removeEncrypted: (id) => {  // ✅ AGREGAR MÉTODO
    const db = loadDB();
    db.encrypted = db.encrypted.filter(i => i.id !== id);
    saveDB(db);
  },
  decryptItem: (cipher) => {
    try {
      return decrypt(cipher);
    } catch {
      return null;
    }
  }
};