import { VALIDATION_PATTERNS } from '../config/constants.js';

export const useValidation = () => {
  
  const validateRUT = (rut) => {
    if (!rut) return { valid: false, error: 'RUT requerido' };
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (!VALIDATION_PATTERNS.RUT.test(cleanRut)) {
      return { valid: false, error: 'Formato RUT inválido' };
    }
    const dv = cleanRut.slice(-1);
    const body = cleanRut.slice(0, -1);
    if (!/^\d+$/.test(body)) return { valid: false, error: 'RUT inválido' };
    
    let sum = 0, mul = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * mul;
      mul = mul === 7 ? 2 : mul + 1;
    }
    const expectedDV = 11 - (sum % 11);
    const calcDV = expectedDV === 10 ? 'K' : expectedDV === 11 ? '0' : expectedDV.toString();
    
    return dv === calcDV 
      ? { valid: true, error: null }
      : { valid: false, error: 'Dígito verificador incorrecto' };
  };

  const validateEmail = (email) => {
    if (!email) return { valid: false, error: 'Email requerido' };
    return VALIDATION_PATTERNS.EMAIL.test(email.trim())
      ? { valid: true, error: null }
      : { valid: false, error: 'Email con dominio inválido (ej: usuario@empresa.cl)' };
  };

  const validateField = (value, pattern, options = {}) => {
    const { minLength = 0, maxLength = Infinity, required = true } = options;
    if (required && !value?.trim()) return { valid: false, error: 'Campo requerido' };
    if (value && (value.length < minLength || value.length > maxLength)) {
      return { valid: false, error: `Debe tener entre ${minLength} y ${maxLength} caracteres` };
    }
    if (pattern && !pattern.test(value)) {
      return { valid: false, error: 'Formato inválido' };
    }
    return { valid: true, error: null };
  };

  return { validateRUT, validateEmail, validateField };
};