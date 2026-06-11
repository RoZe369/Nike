import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes.js';

export default function Footer() {
  return (
    <footer className="mt-auto bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* Columna 1: Información Académica */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold mb-3 text-white">NIKE STORE</h4>
            <p className="mb-2">Evaluación Sumativa 3</p>
            <p className="mb-2">Programación Front End</p>
            <p className="mb-0">Ingenieria Informática</p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3 text-white">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to={ROUTES.CURRENCIES} className="text-white text-decoration-none opacity-75 hover-opacity-100">
                  💱 Conversor de Divisas
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.AGE} className="text-white text-decoration-none opacity-75 hover-opacity-100">
                  🎂 Calculadora de Edad
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.ENCRYPT} className="text-white text-decoration-none opacity-75 hover-opacity-100">
                  🔐 Encriptación
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.DIAGRAMS} className="text-white text-decoration-none opacity-75 hover-opacity-100">
                  📐 Diagramas
                </Link>
              </li>
              <li className="mb-2">
                <Link to={ROUTES.CONTACT} className="text-white text-decoration-none opacity-75 hover-opacity-100">
                  📬 Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="col-lg-4 col-md-12">
            <h6 className="fw-bold mb-3 text-white">Información de Contacto</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-3 opacity-75">
                <strong className="text-white">🏢 Dirección</strong><br />
                Sede Punta Arenas<br />
                Avenida España 1234
              </li>
              <li className="mb-3 opacity-75">
                <strong className="text-white">📧 Email</strong><br />
                contacto@nikestore.cl<br />
                soporte@nikestore.cl
              </li>
              <li className="mb-0 opacity-75">
                <strong className="text-white">📞 Teléfono</strong><br />
                +56 61 234 5678<br />
                <small>Lun-Vie 9:00-18:00</small>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Línea divisoria y Copyright */}
        <hr className="border-secondary my-4 opacity-25" />
        <div className="text-center text-white-50 small">
          <p className="mb-0">
            &copy; 2026 Nike Store Simulation. Proyecto Académico - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}