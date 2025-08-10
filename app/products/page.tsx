// app/products/page.tsx
import { api } from "@/lib/api";

export default async function ProductsPage() {
  const products = await api.listProducts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Sản phẩm tại cửa hàng</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="rounded-2xl p-5 border border-white/10 bg-white/5">
            <div className="h-36 rounded-xl bg-white/10 mb-4" />
            <div className="font-semibold">{p.name}</div>
            <div className="text-white/70 text-sm">{p.price.toLocaleString()} đ</div>
          </div>
        ))}
      </div>
    </div>
  );
}