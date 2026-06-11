import React, { useState, useEffect } from "react";
import { encrypt, decrypt, hash } from "../../utils/encryption.js";
import { StorageService } from "../../services/storage.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function EncryptedStorage() {
  const [formData, setFormData] = useState({ name: "", secret: "" });
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState(null);
  const [storedItems, setStoredItems] = useState([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadStoredItems();
  }, []);

  const loadStoredItems = () => {
    const items = StorageService.getEncrypted();
    setStoredItems(items || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEncrypt = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.secret) {
      alert("⚠️ Complete todos los campos");
      return;
    }

    // Encriptar datos (Actividad 3 - Criterio 3.1.3)
    const cipher = encrypt(formData.secret);
    const hashed = hash(formData.secret);

    setEncrypted(cipher);

    // Guardar en localStorage encriptado
    StorageService.addEncrypted({
      name: formData.name,
      secret: formData.secret,
      cipher: cipher,
      hash: hashed,
    });

    loadStoredItems();
    setFormData({ name: "", secret: "" });

    // Mostrar notificación
    alert("✅ Datos encriptados y guardados correctamente");
  };

  const handleDecrypt = (item) => {
    try {
      const decryptedValue = StorageService.decryptItem(item.cipher);
      if (decryptedValue === null || decryptedValue === undefined) {
        alert("❌ No se pudo desencriptar. Datos corruptos o clave inválida.");
        return;
      }
      setDecrypted({
        name: item.name,
        original: decryptedValue,
        hash: item.hash,
      });
    } catch (err) {
      console.error("Error al desencriptar:", err);
      alert("❌ Error al desencriptar. Datos corruptos o clave inválida.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este registro encriptado?")) {
      // ✅ AHORA USA StorageService (no manipula localStorage directamente)
      StorageService.removeEncrypted(id);
      loadStoredItems();
      setDecrypted(null);
      alert("🗑️ Registro eliminado");
    }
  };

  return (
    <div className="row g-4 fade-in">
      <div className="col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-warning d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🔐 Encriptar y Guardar</h5>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "🔽" : "🔼"}
            </Button>
          </div>

          {showForm && (
            <div className="card-body">
              <form onSubmit={handleEncrypt}>
                <div className="mb-3">
                  <Input
                    label="Nombre de Referencia"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Contraseña Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Dato Secreto</label>
                  <input
                    type="password"
                    name="secret"
                    className="form-control"
                    value={formData.secret}
                    onChange={handleChange}
                    placeholder="Contraseña, PIN, etc."
                    required
                  />
                  <div className="form-text">
                    Este dato será encriptado con AES-256
                  </div>
                </div>
                <Button type="submit" variant="warning" className="w-100">
                  🔒 Encriptar y Guardar
                </Button>
              </form>

              {encrypted && (
                <div className="mt-4">
                  <label className="form-label fw-bold">
                    Texto Cifrado (AES):
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    readOnly
                    value={encrypted}
                    style={{ fontSize: "10px" }}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigator.clipboard.writeText(encrypted)}
                  >
                    📋 Copiar al Portapapeles
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">📦 Datos Encriptados en LocalStorage</h5>
          </div>
          <div className="card-body">
            {storedItems.length === 0 ? (
              <p className="text-muted text-center py-4">
                No hay datos encriptados guardados.
              </p>
            ) : (
              <div className="list-group">
                {storedItems.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{item.name}</h6>
                      <small>
                        {new Date(item.createdAt).toLocaleDateString("es-CL")}
                      </small>
                    </div>
                    <small className="text-muted d-block mb-2">
                      Hash:{" "}
                      {item.hash ? item.hash.substring(0, 32) + "..." : "N/A"}
                    </small>
                    <div className="btn-group btn-group-sm">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleDecrypt(item)}
                      >
                        🔓 Ver
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {decrypted && (
          <div className="card shadow-sm mt-3 border-success fade-in">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">✅ Contenido Desencriptado</h6>
            </div>
            <div className="card-body">
              <p>
                <strong>Nombre:</strong> {decrypted.name}
              </p>
              <p>
                <strong>Dato Original (Contraseña Real):</strong>
                <span className="d-inline-block bg-light px-3 py-2 rounded border border-success ms-2 fw-bold text-danger">
                  {decrypted.original}
                </span>
              </p>
              <p className="mt-3">
                <strong>Hash SHA-256:</strong>
                <small className="d-block text-muted font-monospace" style={{ fontSize: '11px', wordBreak: 'break-all' }}>
                  {decrypted.hash}
                </small>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}