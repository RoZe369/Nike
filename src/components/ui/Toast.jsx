import React, { useEffect, useState } from 'react';

/**
 * Componente Toast para notificaciones no intrusivas
 * @param {Object} props - Propiedades del toast
 * @param {string} props.message - Mensaje a mostrar
 * @param {string} props.type - Tipo de alerta (success, danger, warning, info)
 * @param {number} props.duration - Duración en ms antes de auto-ocultar
 * @param {function} props.onClose - Handler cuando se cierra
 */
export default function Toast({
  message,
  type = 'info',
  duration = 3500,
  onClose
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const alertClass = `alert alert-${type} alert-dismissible fade show shadow-sm`;
  
  return (
    <div className={alertClass} role="alert" style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: 9999,
      minWidth: '280px',
      maxWidth: '400px'
    }}>
      {message}
      <button 
        type="button" 
        className="btn-close" 
        onClick={() => { setVisible(false); onClose?.(); }}
        aria-label="Cerrar notificación"
      />
    </div>
  );
}