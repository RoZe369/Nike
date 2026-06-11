import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import Currencies from './pages/Currencies.jsx';
import Age from './pages/Age.jsx';
import Encrypt from './pages/Encrypt.jsx';
import Diagrams from './pages/Diagrams.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/divisas" element={<Currencies />} />
              <Route path="/edad" element={<Age />} />
              <Route path="/encriptar" element={<Encrypt />} />
              <Route path="/diagramas" element={<Diagrams />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
}

export default App;