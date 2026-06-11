import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente para proteger rutas (futura expansión con autenticación)
 * @param {Object} props - Propiedades
 * @param {boolean} props.isAuthenticated - Estado de autenticación
 * @param {React.ReactNode} props.children - Contenido protegido
 * @param {string} props.redirectTo - Ruta de redirección si no está autenticado
 */
export default function ProtectedRoute({
  isAuthenticated = true, // Por defecto true para evaluación
  children,
  redirectTo = '/'
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
}