"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Conectando con el backend...");
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Error: no se pudo conectar al backend"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8">
      <h1 className="mb-4 text-3xl font-bold text-zinc-900">Tienda</h1>
      <p className="rounded-lg bg-white px-6 py-4 text-lg shadow">
        Backend dice: <strong>{message}</strong>
      </p>
    </main>
  );
}
