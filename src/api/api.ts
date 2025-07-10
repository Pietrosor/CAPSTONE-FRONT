export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: Record<string,string> = {
    "Content-Type": "application/json",
    ...options.headers as any
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(path, { ...options, headers });
  if (!response.ok) {
    throw new Error(`Errore ${response.status}`);
  }
  return response.json();
}