/**
 * Formatea un número a pesos chilenos (CLP)
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Monto formateado con símbolo $
 */
export const formatCLP = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formatea una fecha ISO a formato legible en español
 * @param {string} isoString - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Genera un ID único basado en timestamp
 * @returns {number} - ID único
 */
export const generateId = () => Date.now();

/**
 * Sanitiza un string para prevenir XSS
 * @param {string} str - String a sanitizar
 * @returns {string} - String sanitizado
 */
export const sanitize = (str) => {
  if (!str) return '';
  return str.replace(/[<>"'&]/g, '').trim();
};

/**
 * Calcula el total con envío
 * @param {number} subtotal - Subtotal de la compra
 * @returns {object} - Objeto con shipping y total
 */
export const calculateTotal = (subtotal) => {
  const shipping = subtotal >= 50000 ? 0 : 4990;
  return {
    shipping,
    total: subtotal + shipping,
    freeShipping: subtotal >= 50000
  };
};