import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes.js';

const navLinks = [
  { path: ROUTES.HOME, label: '🏠 Inicio', exact: true },
  { path: ROUTES.CURRENCIES, label: '💱 Divisas', exact: false },
  { path: ROUTES.AGE, label: '🎂 Edad', exact: false },
  { path: ROUTES.ENCRYPT, label: '🔐 Encriptar', exact: false },
  { path: ROUTES.DIAGRAMS, label: '📐 Diagramas', exact: false },
  { path: ROUTES.CONTACT, label: '📬 Contacto', exact: false }
];

export default function Navbar() {
  const location = useLocation();

  const isActive = (path, exact) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to={ROUTES.HOME}>
          NIKE STORE
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map(link => (
              <li key={link.path} className="nav-item">
                <Link
                  className={`nav-link ${isActive(link.path, link.exact) ? 'active text-warning fw-bold' : ''}`}
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}