type Opts = { method?: string; body?: any };

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;              // URL absolue → on n'ajoute rien
  if (!BASE) return path.startsWith("/") ? path : `/${path}`; // même origine
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function api<T = any>(path: string, options: Opts = {}) {
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });
  let data: any = null; try { data = await res.json(); } catch {}
  return { ok: res.ok, status: res.status, data: data as T };
}
