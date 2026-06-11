import React from 'react';
import ClassDiagram from '../components/features/ClassDiagram.jsx';

export default function Diagrams() {
  return (
    <div className="section-container fade-in">
      <div className="mb-4">
        <h2 className="fw-bold">📐 Diagramas del Sistema</h2>
        <p className="text-muted">
          Visualiza la arquitectura de clases y relaciones del proyecto Nike Store
        </p>
      </div>
      <ClassDiagram />
    </div>
  );
}