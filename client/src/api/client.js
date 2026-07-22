const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // no body
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  getProperties: () => request('/properties'),
  getProperty: (id) => request(`/properties/${id}`),
  createProperty: (payload) =>
    request('/properties', { method: 'POST', body: JSON.stringify(payload) }),
  bookProperty: (id) => request(`/properties/${id}/book`, { method: 'PATCH' }),
};

export default api;
