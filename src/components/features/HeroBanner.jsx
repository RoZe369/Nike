import React from 'react';

export default function HeroBanner() {
  return (
    <section className="hero-section mb-5 fade-in">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1920&auto=format&fit=crop"
        alt="Nike Banner"
        className="w-100 h-100 object-fit-cover"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content text-white">
        <h1 className="display-2 fw-bold mb-3">JUST DO IT</h1>
        <p className="fs-4 mb-4">
          Nueva Colección 2026 | Rendimiento y Estilo<br />
          Envío gratis en compras sobre $50.000
        </p>
        <a href="#sales-form" className="btn btn-warning btn-lg fw-bold px-5 py-3">
          Ver Catálogo
        </a>
      </div>
    </section>
  );
}