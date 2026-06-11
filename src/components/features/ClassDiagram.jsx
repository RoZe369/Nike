import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

// Inicializar Mermaid una sola vez
mermaid.initialize({
  startOnLoad: false, // Importante: false para control manual
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Segoe UI, sans-serif',
  classDiagram: {
    useMaxWidth: true,
    diagramMarginX: 50,
    diagramMarginY: 10,
    boxMargin: 10
  }
});

export default function ClassDiagram() {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Definición del diagrama de clases en sintaxis Mermaid
  const diagramDefinition = `
classDiagram
  direction TB

  class App {
    +state: activeSection
    +render()
    +handleNavigation()
  }

  class CartContext {
    +items: Array
    +subtotal: Number
    +shipping: Number
    +total: Number
    +addToCart(item)
    +updateQty(id, qty)
    +removeFromCart(id)
    +checkout()
  }

  class ProductService {
    +PRODUCTS: Map
    +getProduct(id)
    +calculatePrice(qty, product)
    +validateStock(id, qty)
  }

  class StorageService {
    +getCart()
    +addToCart(item)
    +updateCartItem(id, data)
    +removeFromCart(id)
    +checkout(cartItems)
    +getSales()
    +encrypt(data)
    +decrypt(cipher)
  }

  class Validator {
    +validateRUT(rut)
    +validateEmail(email)
    +validateField(value, pattern, options)
  }

  class MindicadorAPI {
    +getAll()
    +getIndicator(name)
    +convertCLP(amount, indicator)
  }

  class User {
    +id: String
    +name: String
    +email: String
    +rut: String
    +birthdate: Date
  }

  class Product {
    +id: String
    +name: String
    +price: Number
    +stock: Number
    +category: String
  }

  class CartItem {
    +id: String
    +product: Product
    +quantity: Number
    +paymentMethod: String
    +clientName: String
    +clientEmail: String
  }

  class Sale {
    +checkoutId: String
    +items: Array~CartItem~
    +subtotal: Number
    +shipping: Number
    +total: Number
    +checkoutDate: Date
  }

  App --> CartContext : manages state
  App --> ProductService : uses business logic
  CartContext --> StorageService : persists data
  ProductService --> Validator : validates input
  ProductService --> MindicadorAPI : converts prices
  StorageService ..> User : stores user data
  StorageService ..> Product : manages catalog
  CartContext "1" --> "*" CartItem : contains
  CartItem "*" --> "1" Product : references
  StorageService "1" --> "*" Sale : records

  note for StorageService "CRUD con encriptación AES\nLocalStorage como backend persistente"
  note for MindicadorAPI "API externa: mindicador.cl\nUF, Euro, UTM, Dólar en tiempo real"
  note for Validator "Validación RUT chileno\nEmail con dominio obligatorio"
  `;

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Generar ID único
        const id = `mermaid-${Date.now()}`;
        
        // Renderizar el diagrama
        const { svg: svgCode } = await mermaid.render(id, diagramDefinition);
        
        setSvg(svgCode);
        setLoading(false);
      } catch (err) {
        console.error('Error renderizando diagrama:', err);
        setError('Error al renderizar el diagrama. Verifica la sintaxis de Mermaid.');
        setLoading(false);
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="card shadow-sm fade-in">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">📐 Diagrama de Clases - Arquitectura Nike Store</h5>
      </div>
      <div className="card-body">
        <div className="mermaid-container bg-white p-4 rounded shadow-sm" style={{ overflow: 'auto', minHeight: '400px' }}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2 text-muted">Generando diagrama de clases...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <h6 className="alert-heading">❌ Error</h6>
              <p>{error}</p>
              <pre className="small bg-light p-2 rounded mt-2">{error.toString()}</pre>
            </div>
          ) : (
            <div 
              className="text-center"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          )}
        </div>
        
        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="fw-bold">🔑 Relaciones Clave del Sistema:</h6>
          <ul className="mb-0 small">
            <li><strong>App → CartContext:</strong> Orquesta el estado global de la aplicación</li>
            <li><strong>CartContext → StorageService:</strong> Persistencia encriptada de datos</li>
            <li><strong>ProductService → Validator:</strong> Validación de datos de entrada (RUT, email)</li>
            <li><strong>ProductService → MindicadorAPI:</strong> Conversión de precios con indicadores externos</li>
            <li><strong>CartItem ↔ Product:</strong> Composición para gestión del carrito de compras</li>
            <li><strong>StorageService → Sale:</strong> Registro histórico de transacciones</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}