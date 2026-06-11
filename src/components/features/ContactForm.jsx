import React, { useState } from 'react';
import { useValidation } from '../../hooks/useValidation.js';
import { VALIDATION_PATTERNS } from '../../config/constants.js';  // ✅ Import estático
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Toast from '../ui/Toast.jsx';

export default function ContactForm() {
  const { validateRUT, validateEmail, validateField } = useValidation();
  
  const [form, setForm] = useState({
    name: '', email: '', rut: '', phone: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const err = {};
    
    const nameVal = validateField(form.name, VALIDATION_PATTERNS.NAME, { minLength: 3, maxLength: 50 });
    if (!nameVal.valid) err.name = nameVal.error;
    
    const emailVal = validateEmail(form.email);
    if (!emailVal.valid) err.email = emailVal.error;
    
    const rutVal = validateRUT(form.rut);
    if (!rutVal.valid) err.rut = rutVal.error;
    
    const phoneVal = validateField(form.phone, VALIDATION_PATTERNS.PHONE, { minLength: 9, maxLength: 9 });
    if (!phoneVal.valid) err.phone = 'Teléfono: exactamente 9 dígitos numéricos';
    
    const msgVal = validateField(form.message, null, { minLength: 10 });
    if (!msgVal.valid) err.message = 'Mensaje: mínimo 10 caracteres';
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setToast({ message: '❌ Corrija los errores del formulario', type: 'danger' });
      return;
    }
    
    // Simular envío (en producción: API call)
    console.log('✅ Formulario enviado:', form);
    setSubmitted(true);
    setToast({ message: '✅ Mensaje enviado correctamente. Te contactaremos pronto.', type: 'success' });
    
    // Reset form
    setForm({ name: '', email: '', rut: '', phone: '', message: '' });
    setErrors({});
    
    // Ocultar toast después de 5 segundos
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="card shadow-sm fade-in">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">📬 Contacto</h5>
      </div>
      <div className="card-body">
        {submitted && (
          <div className="alert alert-success fade-in" role="alert">
            <h6 className="alert-heading">✅ ¡Gracias por contactarnos!</h6>
            <p className="mb-0">Hemos recibido tu mensaje. Te responderemos a la brevedad.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="row g-3" noValidate>
          <div className="col-md-6">
            <Input
              label="Nombre Completo"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Ana María López"
              error={errors.name}
              required
            />
          </div>
          <div className="col-md-6">
            <Input
              label="RUT"
              name="rut"
              value={form.rut}
              onChange={handleChange}
              placeholder="12.345.678-9"
              error={errors.rut}
              required
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@empresa.cl"
              error={errors.email}
              required
            />
            <div className="form-text text-danger fw-bold small">
              ⚠️ Debe incluir dominio con extensión válida (.cl, .com, .org, etc.)
            </div>
          </div>
          <div className="col-md-6">
            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="987654321"
              error={errors.phone}
              required
            />
            <div className="form-text small">Exactamente 9 dígitos numéricos</div>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold">Mensaje</label>
            <textarea
              name="message"
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Escriba su consulta o comentario..."
              required
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            <div className="form-text small">Mínimo 10 caracteres</div>
          </div>
          <div className="col-12">
            <Button type="submit" variant="primary" className="w-100 py-2">
              📩 Enviar Mensaje
            </Button>
          </div>
        </form>
      </div>
      
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}