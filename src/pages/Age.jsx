import React from 'react';
import AgeCalculator from '../components/features/AgeCalculator.jsx';

export default function Age() {
  return (
    <div className="section-container fade-in">
      <div className="mb-4">
        <h2 className="fw-bold">🎂 Calculadora de Edad</h2>
        <p className="text-muted">
          Calcula tu edad exacta en años, meses y días ingresando tu fecha de nacimiento
        </p>
      </div>
      <AgeCalculator />
    </div>
  );
}