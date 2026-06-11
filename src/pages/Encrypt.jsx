import React from 'react';
import EncryptedStorage from '../components/features/EncryptedStorage.jsx';

export default function Encrypt() {
  return (
    <div className="section-container fade-in">
      <div className="mb-4">
        <h2 className="fw-bold">🔐 Almacenamiento Encriptado</h2>
        <p className="text-muted">
          Encripta datos sensibles con AES-256 y guárdalos de forma segura en LocalStorage
        </p>
      </div>
      <EncryptedStorage />
    </div>
  );
}