// Configuración de API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Si estamos en el servidor (Node.js), usar localhost
// Si estamos en el cliente (navegador), usar la URL pública
export function getApiUrl() {
  if (typeof window === 'undefined') {
    // Servidor
    return 'http://localhost:3000';
  }
  // Cliente
  return API_URL || window.location.origin;
}
