export const PRODUCTS = {
  airmax: { id: 'airmax', name: 'Nike Air Max 90', price: 129990, stock: 50 },
  jordan: { id: 'jordan', name: 'Air Jordan 1 Mid', price: 189990, stock: 20 },
  pegasus: { id: 'pegasus', name: 'Pegasus 40', price: 109990, stock: 100 }
};

export const PAYMENT_METHODS = ['Tarjeta', 'Transferencia', 'Webpay'];

export const ACCESSORIES = ['Calcetines', 'Mochila', 'Gorra'];

export const STORAGE_KEYS = {
  CART: 'nike_cart_v3',
  SALES: 'nike_sales_v3',
  ENCRYPTED: 'nike_encrypted_v3'
};

export const VALIDATION_PATTERNS = {
  RUT: /^[0-9]+[-]?[0-9K]$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  PHONE: /^[0-9]{9}$/,
  NAME: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{3,50}$/
};