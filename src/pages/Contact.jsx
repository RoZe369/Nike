import React from 'react';
import ContactForm from '../components/features/ContactForm.jsx';

export default function Contact() {
  return (
    <div className="section-container fade-in">
      <div className="mb-4">
        <h2 className="fw-bold">📬 Contacto</h2>
        <p className="text-muted">
          Envíanos tu consulta. Todos los campos son obligatorios y validados estrictamente.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}