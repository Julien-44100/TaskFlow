// src/lib/api.ts
type Opts = { method?: string; body?: any };

export async function api<T = any>(path: string, options: Opts = {}) {
  // Chemin relatif, pas d'API_URL
  const url = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });
  let data: any = null; try { data = await res.json(); } catch {}
  return { ok: res.ok, status: res.status, data: data as T };
}
