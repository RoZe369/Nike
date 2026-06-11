import React, { useState } from 'react';
import { useIndicators } from '../../hooks/useIndicators.js';
import { formatCLP } from '../../utils/helpers.js';
import Button from '../ui/Button.jsx';

export default function CurrencyConverter() {
  const { indicators, loading, error, refetch, convertCLP } = useIndicators();
  const [basePrice, setBasePrice] = useState(100000);

  const currencies = [
    { key: 'uf', name: 'UF', symbol: 'UF' },
    { key: 'euro', name: 'Euro', symbol: '€' },
    { key: 'utm', name: 'UTM', symbol: 'UTM' },
    { key: 'dolar', name: 'Dólar', symbol: 'USD' }
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando indicadores económicos...</p>
      </div>
    );
  }

  if (error || !indicators) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">⚠️ Error de Conexión</h5>
        <p>No se pudo conectar con mindicador.cl. Intente nuevamente.</p>
        <hr />
        <Button variant="outline-danger" onClick={refetch}>
          🔄 Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm fade-in">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">💱 Conversor de Divisas</h5>
        <small className="text-white-50">Fuente: mindicador.cl - {indicators.fecha}</small>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label htmlFor="basePrice" className="form-label fw-bold">
            Precio Base en Pesos Chilenos (CLP)
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              id="basePrice"
              className="form-control form-control-lg"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              min="0"
              step="1000"
            />
          </div>
          <div className="form-text">
            Ingrese el monto en CLP para convertir a diferentes divisas
          </div>
        </div>

        <div className="row g-3">
          {currencies.map(({ key, name, symbol }) => {
            const value = indicators[key];
            const converted = convertCLP(basePrice, key);
            
            return (
              <div key={key} className="col-md-6 col-lg-3">
                <div className="card h-100 text-center border-primary">
                  <div className="card-body">
                    <h6 className="card-title text-muted">{name}</h6>
                    <p className="display-6 fw-bold text-primary my-3">
                      {symbol} {converted}
                    </p>
                    <small className="text-muted d-block">
                      1 {name} = {formatCLP(value)}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="alert alert-info mt-4 mb-0">
          <h6 className="alert-heading">📊 Lógica de Conversión</h6>
          <p className="mb-0">
            <strong>Fórmula:</strong> Valor en divisa = Precio CLP ÷ Valor del indicador<br />
            <small>
              Ejemplo: {formatCLP(basePrice)} ÷ {formatCLP(indicators.uf)} = {convertCLP(basePrice, 'uf')} UF
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}