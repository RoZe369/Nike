import React from 'react';

/**
 * Componente Input reutilizable con validación visual
 * @param {Object} props - Propiedades del input
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.name - Nombre del campo (para forms)
 * @param {string} props.type - Tipo de input (text, email, password, etc.)
 * @param {string} props.value - Valor actual del input
 * @param {function} props.onChange - Handler de cambio
 * @param {string} props.placeholder - Texto de ayuda
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Campo obligatorio
 * @param {string} props.className - Clases CSS adicionales
 */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = null,
  required = false,
  className = '',
  ...props
}) {
  const inputId = `input-${name}`;
  const hasError = !!error;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="form-label fw-bold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        {...props}
      />
      {hasError && (
        <div id={`${inputId}-error`} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}