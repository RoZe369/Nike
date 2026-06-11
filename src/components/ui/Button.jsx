import React from 'react';

/**
 * Componente Button reutilizable con variantes de Bootstrap
 * @param {Object} props - Propiedades del botón
 * @param {string} props.variant - Variante de color (primary, secondary, success, etc.)
 * @param {string} props.size - Tamaño (sm, lg)
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {function} props.onClick - Handler de click
 * @param {string} props.type - Tipo de botón (button, submit, reset)
 * @param {string} props.className - Clases CSS adicionales
 * @param {React.ReactNode} props.children - Contenido del botón
 */
export default function Button({
  variant = 'primary',
  size = '',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = variant ? `btn-${variant}` : '';
  const sizeClass = size ? `btn-${size}` : '';
  const disabledClass = disabled ? 'disabled' : '';
  
  const classes = [baseClass, variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}