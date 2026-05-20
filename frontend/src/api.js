const BASE = '/api';

export function getToken() {
  return localStorage.getItem('atoure_token') || '';
}

export function setToken(token) {
  if (token) localStorage.setItem('atoure_token', token);
  else localStorage.removeItem('atoure_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(BASE + path, { ...options, headers });

  if (res.status === 401) {
    setToken(null);
    window.dispatchEvent(new Event('atoure:unauthorized'));
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export function login(code) {
  return fetch(`${BASE}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  }).then(async res => {
    if (!res.ok) throw new Error('Invalid access code');
    return res.json();
  });
}

export function getContacts(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') q.set(k, v); });
  return request(`/contacts?${q}`);
}

export function getContact(id) { return request(`/contacts/${id}`); }

export function createContact(data) {
  return request('/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

export function updateContact(id, data) {
  return request(`/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

export function deleteContact(id) { return request(`/contacts/${id}`, { method: 'DELETE' }); }

export function getActivity(contactId) { return request(`/contacts/${contactId}/activity`); }

export function addActivity(contactId, action, detail = '') {
  return request(`/contacts/${contactId}/activity`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, detail }) });
}

export function bulkStatus(ids, status) {
  return request('/contacts/bulk-status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) });
}

export function getStats() { return request('/stats'); }

export function importContacts(contacts) {
  return request('/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contacts) });
}

export function exportCSVUrl(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') q.set(k, v); });
  const token = getToken();
  if (token) q.set('_token', token);
  return `${BASE}/export?${q}`;
}
