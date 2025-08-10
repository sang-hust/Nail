// lib/api.ts
export type Staff = { id: string; name: string; role: string; avatar_url?: string };
export type Product = { id: string; name: string; price: number; image_url?: string };
export type Me = { id: string; name: string; phone_verified: boolean } | null;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
let MOCK_USERS: Record<string, { password: string; verified: boolean }> = {
  // Local (VN)
  "0901234567": { password: "12345678", verified: true },
  "0987654321": { password: "P@ssw0rd!", verified: true },
  // E.164 (để login khi chọn +84)
  "+84901234567": { password: "12345678", verified: true },
  "+84987654321": { password: "P@ssw0rd!", verified: true },
  // Dùng để test luồng đăng ký
  "0911111111": { password: "", verified: false },
};

export const api = {
  // Replace base URL when backend is ready
  base: process.env.NEXT_PUBLIC_API_BASE || "",

  async me(): Promise<Me> {
    // mock logged-out by default; change to a mock user to test booking
    return null;
  },

  async listStaff(): Promise<Staff[]> {
    await delay(200);
    return [
      { id: "s1", name: "Linh Phan", role: "Senior Stylist" },
      { id: "s2", name: "Minh Anh", role: "Color Specialist" },
      { id: "s3", name: "Hà My", role: "Nail Artist" },
    ];
  },

  async availability(staffId: string, date: string): Promise<string[]> {
    await delay(200);
    // mock 30-min slots
    return ["09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00"];
  },

  async listProducts(): Promise<Product[]> {
    await delay(200);
    return [
      { id: "p1", name: "Shampoo Repair", price: 199000 },
      { id: "p2", name: "Hair Oil Glow", price: 249000 },
      { id: "p3", name: "Nail Care Kit", price: 99000 },
    ];
  },

  // Phone-only auth (mock)
  async requestOtp(phone: string) {
    await delay(300);
    if (!MOCK_USERS[phone]) MOCK_USERS[phone] = { password: "", verified: false };
    return { ok: true };
  },

  async verifyOtp(phone: string, code: string) {
    await delay(300);
    if (code !== "123456") throw new Error("Mã OTP không đúng (mã mock: 123456)");
    if (!MOCK_USERS[phone]) {
      MOCK_USERS[phone] = { password: "", verified: true };
    } else {
      MOCK_USERS[phone].verified = true;
    }
    return { ok: true };
  },

  async register(phone: string, password: string) {
    await delay(300);
    const u = MOCK_USERS[phone];
    if (!u?.verified) throw new Error("Chưa xác thực OTP");
    MOCK_USERS[phone].password = password;
    return { ok: true };
  },

  async login(phone: string, password: string) {
    await delay(300);
    const u = MOCK_USERS[phone];
    if (!u || u.password !== password) throw new Error("Sai số điện thoại hoặc mật khẩu");
    return { ok: true };
  },
};