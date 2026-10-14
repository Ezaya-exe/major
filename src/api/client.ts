import type * as T from "./types";

const BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public requestId: string | null,
  ) {
    super(message);
  }
}

async function request<Res>(path: string, init?: RequestInit): Promise<Res> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, init);
  } catch {
    throw new ApiError("network_error", "Could not reach the server.", 0, null);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = (data as T.ApiErrorBody | null)?.error;
    throw new ApiError(
      e?.code ?? "http_error",
      e?.message ?? "Request failed.",
      res.status,
      e?.request_id ?? null,
    );
  }
  return data as Res;
}

const post = <Res>(path: string, body: unknown) =>
  request<Res>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const api = {
  topics: (lang?: T.Language) =>
    request<T.TopicsResponse>(`/api/v1/topics${lang ? `?lang=${lang}` : ""}`),
  ask: (b: T.AskRequest) => post<T.AskResponse>("/api/v1/ask", b),
  analyze: (b: T.AnalyzeRequest) => post<T.AnalyzeResponse>("/api/v1/complaints/analyze", b),
  draft: (b: T.DraftRequest) => post<T.DraftResponse>("/api/v1/complaints/draft", b),
  feedback: (b: { rating: "up" | "down"; request_id?: string; comment?: string }) =>
    post<{ ok: boolean }>("/api/v1/feedback", b),
};