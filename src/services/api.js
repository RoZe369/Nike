import axios from 'axios';

const API_BASE = import.meta.env.VITE_MINDICADOR_API || 'https://www.mindicador.cl/api';

export const MindicadorAPI = {
  getAll: async () => {
    try {
      const { data } = await axios.get(API_BASE, { timeout: 10000 });
      return {
        uf: data.uf?.valor || 0,
        dolar: data.dolar?.valor || 0,
        euro: data.euro?.valor || 0,
        utm: data.utm?.valor || 0,
        fecha: data.uf?.fecha?.split('T')[0] || new Date().toISOString().split('T')[0]
      };
    } catch (error) {
      console.error('❌ Error API mindicador:', error);
      return null;
    }
  },
  getIndicator: async (name) => {
    try {
      const { data } = await axios.get(`${API_BASE}/${name}`, { timeout: 10000 });
      return data;
    } catch {
      return null;
    }
  }
};