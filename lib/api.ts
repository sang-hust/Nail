// lib/api.ts (fixed headers typing)
export type Staff = { id: string; name: string; role: string; avatar_url?: string };
export type Product = { id: string; name: string; price: number; image_url?: string };
export type Me = { id: string; name: string; phone_verified: boolean } | null;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
function setToken(t: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", t);
}

// ✅ Always return Record<string,string> (no union / no undefined)
function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const t = getToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  return headers;
}

async function getJSON<T>(path: string) {
  const r = await fetch(`${API_BASE}${path}`, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  if (!r.ok) throw await asError(r);
  return (await r.json()) as T;
}

async function postJSON<T>(path: string, body: any) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw await asError(r);
  return (await r.json()) as T;
}

async function asError(r: Response) {
  let msg = `Request failed (${r.status})`;
  try {
    const data = await r.json();
    if (data?.detail) msg = Array.isArray(data.detail) ? data.detail[0].msg ?? msg : data.detail;
  } catch {}
  return new Error(msg);
}

// ---- Fallback mocks (giữ nguyên) ----
const FALLBACK_STAFF: Staff[] = [
  { id: "s1", name: "Linh Phan", role: "Senior Stylist" },
  { id: "s2", name: "Minh Anh", role: "Color Specialist" },
  { id: "s3", name: "Hà My", role: "Nail Artist" },
];
const FALLBACK_PRODUCTS: Product[] = [
  { id: "p1", name: "Shampoo Repair", price: 199000 },
  { id: "p2", name: "Hair Oil Glow", price: 249000 },
  { id: "p3", name: "Nail Care Kit", price: 99000 },
];
const FALLBACK_SLOTS = ["09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00"];

// ---- Public API (giữ chữ ký hàm như bạn đang dùng) ----
export const api = {
  base: API_BASE,

  async me(): Promise<Me> {
    if (!API_BASE || !getToken()) return null;
    try {
      const me = await getJSON<{ id: number; username: string; email: string }>(`/auth/me`);
      return { id: String(me.id), name: me.username, phone_verified: true };
    } catch {
      return null;
    }
  },

  async listStaff(): Promise<Staff[]> {
    if (!API_BASE) {
      await delay(150);
      return FALLBACK_STAFF;
    }
    try {
      return await getJSON<Staff[]>(`/staff`);
    } catch {
      await delay(150);
      return FALLBACK_STAFF;
    }
  },

  async availability(staffId: string, date: string): Promise<string[]> {
    if (!API_BASE) {
      await delay(120);
      return FALLBACK_SLOTS;
    }
    try {
      const qs = new URLSearchParams({ staff_id: staffId, date });
      return await getJSON<string[]>(`/slots?${qs.toString()}`);
    } catch {
      await delay(120);
      return FALLBACK_SLOTS;
    }
  },

  async listProducts(): Promise<Product[]> {
    if (!API_BASE) {
      await delay(150);
      return FALLBACK_PRODUCTS;
    }
    try {
      return await getJSON<Product[]>(`/products`);
    } catch {
      await delay(150);
      return FALLBACK_PRODUCTS;
    }
  },

  // Tạm mock OTP để giữ nguyên UI hiện tại
  async requestOtp(_phone: string) {
    await delay(200);
    return { ok: true };
  },

  async verifyOtp(_phone: string, code: string) {
    await delay(200);
    if (code !== "123456") throw new Error("Mã OTP không đúng (mã mock: 123456)");
    return { ok: true };
  },

  // Map phone -> email để khớp backend hiện tại (email/password)
  async register(phone: string, password: string) {
    const payload = { username: phone, email: `${phone}@local.test`, password };
    const data = await postJSON<{ access_token: string }>(`/auth/register`, payload);
    setToken(data.access_token);
    return { ok: true };
  },

  async login(phone: string, password: string) {
    const payload = { email: `${phone}@local.test`, password };
    const data = await postJSON<{ access_token: string }>(`/auth/login`, payload);
    setToken(data.access_token);
    return { ok: true };
  },
};
