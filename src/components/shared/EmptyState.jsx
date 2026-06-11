import React from 'react';

/**
 * Componente para mostrar estados vacíos de forma consistente
 * @param {Object} props - Propiedades
 * @param {string} props.icon - Emoji o ícono a mostrar
 * @param {string} props.title - Título principal
 * @param {string} props.description - Descripción secundaria
 * @param {React.ReactNode} props.action - Botón o acción opcional
 */
export default function EmptyState({
  icon = '📭',
  title = 'Sin datos',
  description = 'No hay elementos para mostrar en este momento.',
  action = null
}) {
  return (
    <div className="text-center py-5 text-muted fade-in">
      <div className="display-1 mb-3">{icon}</div>
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}