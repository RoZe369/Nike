import React, { useState } from 'react';
import Button from '../ui/Button.jsx';

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  /**
   * Algoritmo para calcular edad exacta (Actividad 3)
   * Calcula años, meses y días exactos
   */
  const calculateAge = (birthDateStr) => {
    const birth = new Date(birthDateStr);
    const today = new Date();

    // Validaciones
    if (isNaN(birth.getTime())) {
      setError('❌ Fecha inválida. Verifique el formato.');
      return null;
    }

    if (birth > today) {
      setError('❌ La fecha de nacimiento no puede ser futura.');
      return null;
    }

    if (birth.getFullYear() < 1900) {
      setError('❌ Año inválido. Use un año posterior a 1900.');
      return null;
    }

    // Cálculo de edad
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Ajuste si el día es negativo
    if (days < 0) {
      months--;
      // Obtener días del mes anterior
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Ajuste si el mes es negativo
    if (months < 0) {
      years--;
      months += 12;
    }

    setError('');
    return { years, months, days };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateAge(birthdate);
    setAge(result);
  };

  const getAgeCategory = (years) => {
    if (years < 13) return 'Niño/a';
    if (years < 18) return 'Adolescente';
    if (years < 60) return 'Adulto/a';
    return 'Adulto Mayor';
  };

  return (
    <div className="card shadow-sm fade-in">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">🎂 Calculadora de Edad Exacta</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-8">
            <label htmlFor="birthdate" className="form-label fw-bold">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthdate"
              className="form-control form-control-lg"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
            <div className="form-text">
              Seleccione su fecha de nacimiento completa
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <Button type="submit" variant="success" className="w-100 py-3">
              Calcular Edad
            </Button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {age && (
          <div className="alert alert-success mt-4 fade-in">
            <div className="text-center">
              <h3 className="mb-3">
                {age.years} años, {age.months} meses y {age.days} días
              </h3>
              <p className="mb-0">
                <strong>Categoría:</strong> {getAgeCategory(age.years)}
              </p>
              <hr />
              <div className="row text-center">
                <div className="col-4">
                  <h2 className="text-success mb-0">{age.years}</h2>
                  <small>Años</small>
                </div>
                <div className="col-4">
                  <h2 className="text-success mb-0">{age.months}</h2>
                  <small>Meses</small>
                </div>
                <div className="col-4">
                  <h2 className="text-success mb-0">{age.days}</h2>
                  <small>Días</small>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="fw-bold">📐 Algoritmo Implementado:</h6>
          <ol className="mb-0 small">
            <li>Obtener fecha actual y fecha de nacimiento</li>
            <li>Calcular diferencia inicial de años, meses y días</li>
            <li>Si días &lt; 0: restar 1 mes y sumar días del mes anterior</li>
            <li>Si meses &lt; 0: restar 1 año y sumar 12 meses</li>
            <li>Retornar edad exacta en años, meses y días</li>
          </ol>
        </div>
      </div>
    </div>
  );
}