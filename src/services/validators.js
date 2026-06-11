/**
 * src/services/validators.js
 * Validaciones centralizadas para el proyecto (Criterio 3.1.2)
 */

import { VALIDATION_PATTERNS } from '../config/constants.js';

/**
 * Valida un RUT chileno utilizando el algoritmo Módulo 11
 * @param {string} rut - El RUT a validar (ej: 12.345.678-9)
 * @returns {object} { valid: boolean, error: string }
 */
export const validateRUT = (rut) => {
  if (!rut) return { valid: false, error: 'El RUT es requerido' };
  
  // Normalizar RUT
  const cleanRut = rut.replace(/[.-]/g, '').toUpperCase();
  
  // Verificar formato básico (solo números y un dígito verificador al final)
  if (!/^[0-9]+[0-9K]$/.test(cleanRut)) {
    return { valid: false, error: 'Formato inválido' };
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // Algoritmo Módulo 11
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const expectedDv = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();

  return dv === expectedDv
    ? { valid: true, error: null }
    : { valid: false, error: 'Dígito verificador incorrecto' };
};

/**
 * Valida un correo electrónico con dominio obligatorio
 * @param {string} email - El correo a validar
 * @returns {object} { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'El correo es requerido' };
  
  return VALIDATION_PATTERNS.EMAIL.test(email.trim())
    ? { valid: true, error: null }
    : { valid: false, error: 'Debe incluir dominio (ej: usuario@empresa.cl)' };
};

/**
 * Validación genérica de campos con opciones
 * @param {string} value - Valor del campo
 * @param {RegExp} pattern - Regex opcional
 * @param {object} options - { minLength, maxLength, required }
 * @returns {object} { valid: boolean, error: string }
 */
export const validateField = (value, pattern = null, options = {}) => {
  const { minLength = 0, maxLength = Infinity, required = false } = options;
  const val = value?.trim();

  if (required && !val) return { valid: false, error: 'Este campo es obligatorio' };
  if (val && val.length < minLength) return { valid: false, error: `Mínimo ${minLength} caracteres` };
  if (val && val.length > maxLength) return { valid: false, error: `Máximo ${maxLength} caracteres` };
  if (pattern && !pattern.test(val)) return { valid: false, error: 'Formato inválido' };

  return { valid: true, error: null };
};