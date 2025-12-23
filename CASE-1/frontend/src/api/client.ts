const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

const authHeaders = (token?: string) =>
  token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string; fullName: string };

export type Game = {
  id: number;
  title: string;
  description?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  isFree: boolean;
};

export type AuthResponse = { token: string };
export type AccessResponse = { hasAccess: boolean };
export type PurchaseResponse = { status: string; orderId?: string | null; gameId: number };

async function handleResponse<T>(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Something went wrong');
  }
  return (await res.json()) as T;
}

export const api = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse<AuthResponse>(res);
  },
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse<AuthResponse>(res);
  },
  async fetchGames(): Promise<Game[]> {
    const res = await fetch(`${API_URL}/games`);
    return handleResponse<Game[]>(res);
  },
  async fetchGame(id: string, token: string): Promise<Game> {
    const res = await fetch(`${API_URL}/games/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(token)
      }
    });
    return handleResponse<Game>(res);
  },
  async fetchAccess(id: string, token: string): Promise<AccessResponse> {
    const res = await fetch(`${API_URL}/games/${id}/access`, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(token)
      }
    });
    return handleResponse<AccessResponse>(res);
  },
  async purchase(gameId: number, token: string): Promise<PurchaseResponse> {
    const res = await fetch(`${API_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(token)
      },
      body: JSON.stringify({ gameId })
    });
    return handleResponse<PurchaseResponse>(res);
  }
};

