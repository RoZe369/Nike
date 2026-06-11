import { useState, useEffect, useCallback } from 'react';
import { MindicadorAPI } from '../services/api.js';

export const useIndicators = () => {
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIndicators = useCallback(async () => {
    try {
      setLoading(true);
      const data = await MindicadorAPI.getAll();
      if (data) {
        setIndicators(data);
        setError(null);
      } else {
        setError('No se pudo cargar los indicadores');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndicators();
  }, [fetchIndicators]);

  const convertCLP = useCallback((amount, indicator) => {
    if (!indicators?.[indicator] || !amount) return null;
    return (amount / indicators[indicator]).toFixed(2);
  }, [indicators]);

  return { indicators, loading, error, refetch: fetchIndicators, convertCLP };
};