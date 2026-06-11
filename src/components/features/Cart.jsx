import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { formatCLP } from '../../utils/helpers.js';
import Button from '../ui/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart, checkout, subtotal, shipping, total } = useCart();
  const [showCart, setShowCart] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('⚠️ Agrega productos antes de confirmar la compra');
      return;
    }

    if (!window.confirm('¿Confirmar compra? Esta acción no se puede deshacer.')) {
      return;
    }

    // Guardar datos de la compra antes de vaciar el carrito
    const purchaseInfo = {
      items: [...items],
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date().toLocaleString('es-CL'),
      itemCount: items.reduce((acc, item) => acc + item.qty, 0)
    };

    // Realizar checkout (mueve items a historial y limpia carrito)
    checkout();

    // Mostrar comprobante
    setPurchaseData(purchaseInfo);
    setShowReceipt(true);
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowReceipt(false);
    setShowCart(true);
    setPurchaseData(null);
  };

  const handleGoHome = () => {
    setShowReceipt(false);
    setShowCart(false);
    setPurchaseData(null);
    navigate('/');
  };

  // Vista del Comprobante de Compra
  if (showReceipt && purchaseData) {
    return (
      <div className="card shadow-lg border-success fade-in">
        <div className="card-header bg-success text-white text-center py-3">
          <h3 className="mb-0">🧾 Comprobante de Compra</h3>
          <small className="text-white-50">Nike Store - Evaluación 3</small>
        </div>
        
        <div className="card-body p-4">
          {/* Información General */}
          <div className="row mb-4">
            <div className="col-md-6">
              <p className="mb-1"><strong>📅 Fecha:</strong> {purchaseData.date}</p>
              <p className="mb-0"><strong> Total Items:</strong> {purchaseData.itemCount}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0"><strong> N° Compra:</strong> {Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <hr className="my-4" />

          {/* Tabla de Productos */}
          <h5 className="mb-3">📋 Detalle de Productos</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio Unit.</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {purchaseData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.productName}</strong>
                      <br />
                      <small className="text-muted">Pago: {item.payment}</small>
                      {item.clientName && (
                        <><br /><small className="text-muted">Cliente: {item.clientName}</small></>
                      )}
                    </td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-end">{formatCLP(item.price)}</td>
                    <td className="text-end"><strong>{formatCLP(item.price * item.qty)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr className="my-4" />

          {/* Totales */}
          <div className="row justify-content-end">
            <div className="col-md-5">
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCLP(purchaseData.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className={purchaseData.shipping === 0 ? 'text-success fw-bold' : ''}>
                    {purchaseData.shipping === 0 ? '🎁 GRATIS' : formatCLP(purchaseData.shipping)}
                  </span>
                </div>
                {purchaseData.subtotal < 50000 && (
                  <div className="alert alert-info py-2 mb-2 small">
                    💡 Te faltan {formatCLP(50000 - purchaseData.subtotal)} para envío gratis
                  </div>
                )}
                <hr className="my-2" />
                <div className="d-flex justify-content-between fs-5 fw-bold text-success">
                  <span>TOTAL PAGADO:</span>
                  <span>{formatCLP(purchaseData.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de Agradecimiento */}
          <div className="alert alert-success text-center mt-4 mb-0">
            <h5 className="mb-1">✅ ¡Compra Realizada con Éxito!</h5>
            <p className="mb-0">Gracias por preferirnos. Su compra ha sido registrada en nuestro sistema.</p>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="card-footer bg-white border-top-0 pb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <Button 
                variant="outline-primary" 
                className="w-100 py-3"
                onClick={handleContinueShopping}
              >
                🛒 Seguir Comprando
              </Button>
            </div>
            <div className="col-md-6">
              <Button 
                variant="secondary" 
                className="w-100 py-3"
                onClick={handleGoHome}
              >
                🏠 Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista Normal del Carrito
  return (
    <div className="card shadow-sm fade-in">
      <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
        <h5 className="mb-0">🛒 Tu Carrito ({items.length})</h5>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={() => setShowCart(!showCart)}
          >
            {showCart ? '🔽' : '🔼'}
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={clearCart} 
            disabled={!items.length}
          >
            🗑️
          </Button>
        </div>
      </div>
      
      {showCart && (
        <div className="card-body">
          {!items.length ? (
            <div className="text-center py-5 text-muted">
              <div className="display-1 mb-3">🛍️</div>
              <h5 className="mb-2">Tu carrito está vacío</h5>
              <p className="mb-0">Agrega productos desde el formulario de ventas</p>
            </div>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-3">
                {items.map(item => (
                  <li key={item.id} className="list-group-item d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
                    <div className="flex-grow-1 mb-2 mb-md-0">
                      <h6 className="mb-1">{item.productName}</h6>
                      <small className="text-muted d-block">
                        💳 {item.payment}
                      </small>
                      {item.clientName && (
                        <small className="text-muted d-block">
                          👤 {item.clientName}
                        </small>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="input-group input-group-sm" style={{width:'110px'}}>
                        <Button 
                          size="sm" 
                          variant="outline-secondary" 
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          −
                        </Button>
                        <input 
                          type="text" 
                          className="form-control text-center" 
                          value={item.qty} 
                          readOnly 
                        />
                        <Button 
                          size="sm" 
                          variant="outline-secondary" 
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-end" style={{minWidth:'100px'}}>
                        <small className="d-block text-muted">
                          {formatCLP(item.price)} c/u
                        </small>
                        <strong className="text-primary">
                          {formatCLP(item.price * item.qty)}
                        </strong>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline-danger" 
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        ✕
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="bg-light p-3 rounded mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCLP(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className={shipping === 0 ? 'text-success fw-bold' : ''}>
                    {shipping === 0 ? '🎁 GRATIS' : formatCLP(shipping)}
                  </span>
                </div>
                {subtotal < 50000 && (
                  <div className="alert alert-info py-2 mb-2 small">
                    💡 Te faltan {formatCLP(50000 - subtotal)} para envío gratis
                  </div>
                )}
                <hr className="my-2" />
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total:</span>
                  <span className="text-success">{formatCLP(total)}</span>
                </div>
              </div>

              <Button 
                variant="success" 
                className="w-100 py-3 fs-6"
                onClick={handleCheckout}
              >
                ✅ Confirmar Compra
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}