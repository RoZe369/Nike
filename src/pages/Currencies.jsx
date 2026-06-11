import React from 'react';
import CurrencyConverter from '../components/features/CurrencyConverter.jsx';

export default function Currencies() {
  return (
    <div className="section-container fade-in">
      <div className="mb-4">
        <h2 className="fw-bold">💱 Conversor de Divisas</h2>
        <p className="text-muted">
          Convierte precios en pesos chilenos a UF, Euro, UTM y Dólar usando datos en tiempo real de mindicador.cl
        </p>
      </div>
      <CurrencyConverter />
    </div>
  );
}