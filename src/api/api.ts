const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');  

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...(options.headers || {}),
    }
  });

  if (!res.ok) {
    let errorMessage: string;
    try {
      const errJson = await res.json();
      errorMessage = errJson.error || JSON.stringify(errJson);
    } catch {
      errorMessage = await res.text();
    }
    throw new Error(errorMessage || `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return res.json();
}