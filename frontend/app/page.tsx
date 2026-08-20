"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error: no se pudo conectar al backend");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("Error: no se pudo conectar al backend"));
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">Tienda</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-lg bg-white p-4 shadow"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-zinc-600">${product.price}</p>
          </article>
        ))}
      </div>
      {!error && products.length === 0 && (
        <p className="text-zinc-500">Cargando productos...</p>
      )}
    </main>
  );
}
