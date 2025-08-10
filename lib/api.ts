// lib/api.ts
export type Staff = { id: string; name: string; role: string; avatar_url?: string };
export type Product = { id: string; name: string; price: number; image_url?: string };
export type Me = { id: string; name: string; phone_verified: boolean } | null;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
};