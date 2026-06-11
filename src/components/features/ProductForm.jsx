import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useValidation } from '../../hooks/useValidation.js';
import { PRODUCTS, PAYMENT_METHODS, VALIDATION_PATTERNS } from '../../config/constants.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Toast from '../ui/Toast.jsx';

export default function ProductForm() {
  const { addToCart } = useCart();
  const { validateRUT, validateEmail, validateField } = useValidation();
  const [showForm, setShowForm] = useState(true);
  const [form, setForm] = useState({
    name: '', email: '', rut: '', product: 'airmax', qty: 1, payment: 'Tarjeta'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    
    const nameVal = validateField(form.name, VALIDATION_PATTERNS.NAME, { minLength: 3, required: true });
    if (!nameVal.valid) err.name = nameVal.error;
    
    const emailVal = validateEmail(form.email);
    if (!emailVal.valid) err.email = emailVal.error;
    
    const rutVal = validateRUT(form.rut);
    if (!rutVal.valid) err.rut = rutVal.error;
    
    if (form.qty < 1 || form.qty > 10) err.qty = 'Cantidad debe ser entre 1 y 10';
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevenir recarga de página
    
    if (!validate()) {
      setToast({ message: '❌ Complete correctamente todos los campos', type: 'danger' });
      return;
    }
    
    const product = PRODUCTS[form.product];
    addToCart({
      productName: product.name,
      price: product.price,
      qty: form.qty,
      payment: form.payment,
      clientName: form.name,
      clientEmail: form.email,
      clientRut: form.rut
    });
    
    // Limpiar formulario
    setForm({ name: '', email: '', rut: '', product: 'airmax', qty: 1, payment: 'Tarjeta' });
    setErrors({});
    setToast({ message: '✅ Producto agregado al carrito', type: 'success' });
    
    // Ocultar toast después de 3 segundos
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="card shadow-sm mb-4 fade-in" id="sales-form">
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h5 className="mb-0">🛒 Formulario de Ventas</h5>
        <Button variant="light" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? '🔽 Ocultar' : '🔼 Mostrar'}
        </Button>
      </div>
      
      {showForm && (
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <Input 
                label="Nombre" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                error={errors.name}
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div className="col-md-4">
              <Input 
                label="Email" 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                error={errors.email}
                placeholder="usuario@dominio.cl"
                required
              />
            </div>
            <div className="col-md-4">
              <Input 
                label="RUT" 
                name="rut" 
                value={form.rut} 
                onChange={handleChange} 
                error={errors.rut}
                placeholder="12.345.678-9"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Producto</label>
              <select 
                className="form-select" 
                name="product" 
                value={form.product} 
                onChange={handleChange}
              >
                {Object.values(PRODUCTS).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <Input 
                label="Cant." 
                name="qty" 
                type="number" 
                min="1" 
                max="10" 
                value={form.qty} 
                onChange={handleChange} 
                error={errors.qty}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Pago</label>
              <select 
                className="form-select" 
                name="payment" 
                value={form.payment} 
                onChange={handleChange}
              >
                {PAYMENT_METHODS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <Button type="submit" variant="success" className="w-100">
                🛒 Agregar
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}