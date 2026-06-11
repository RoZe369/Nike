import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Componente Modal reutilizable con portal de React
 * @param {Object} props - Propiedades del modal
 * @param {boolean} props.isOpen - Estado de visibilidad
 * @param {function} props.onClose - Handler para cerrar
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {boolean} props.closeOnEscape - Cerrar con tecla Escape
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnEscape = true,
  size = 'md'
}) {
  // Efecto para manejar tecla Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Efecto para bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl'
  }[size] || '';

  return createPortal(
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      role="dialog"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`modal-dialog modal-dialog-centered ${sizeClass}`} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Cerrar"
            />
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}