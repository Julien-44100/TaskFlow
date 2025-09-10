export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3310";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function api<TResponse = any>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    headers?: Record<string, string>;
    // Laisse credentials pour les cookies de session si ton backend en pose
    credentials?: RequestCredentials;
  } = {}
): Promise<{ ok: boolean; status: number; data: TResponse | any }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: options.credentials ?? "include",
    cache: "no-store",
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // pas de JSON
  }

  return { ok: res.ok, status: res.status, data };
}
