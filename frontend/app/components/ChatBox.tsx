"use client";

import { useState } from "react";

type Message = {
  text: string;
  from: "user" | "bot";
};

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hola, ¿en qué puedo ayudarte?", from: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { text, from: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { text: data.reply, from: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Error al conectar con el servidor", from: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700"
        aria-label="Abrir chat"
      >
        💬
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="rounded-t-xl bg-blue-600 px-4 py-3 text-white">
            <p className="font-semibold">Asistente Tienda</p>
            <p className="text-xs opacity-80">En línea</p>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <p className="text-xs text-zinc-400">Escribiendo...</p>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}