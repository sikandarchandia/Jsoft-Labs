import { useState, useRef, useEffect } from "react";
import { FiSend, FiMessageCircle, FiHome, FiMapPin, FiDollarSign } from "react-icons/fi";

const API = "http://localhost:4003/chat";

const WELCOME = {
  role: "bot",
  reply:
    "Hi! I'm your property assistant. Ask about apartments by city, budget, or bedrooms — I'll find matching listings instantly.",
  results: [],
  suggestions: [
    "Show me apartments under $1200 in New York",
    "What cities do you have?",
    "Cheapest apartments available",
    "Find 2 bedrooms in Austin under $1000",
  ],
};

function PropertyCard({ item }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-600">
      <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
        <FiHome className="text-primary-600 dark:text-primary-400" size={18} />
      </div>
      <div className="flex-grow min-w-0">
        <div className="font-medium text-sm dark:text-white truncate">
          {item.city} · {item.bedrooms} bed
        </div>
        <div className="text-xs text-secondary-500 dark:text-secondary-400 flex items-center gap-1 mt-0.5">
          <FiMapPin size={12} />
          Listing #{item.id}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm font-bold text-primary-600 dark:text-primary-400">
          ${item.price}
          <span className="text-xs font-normal text-secondary-400">/mo</span>
        </div>
      </div>
    </div>
  );
}

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (typeof text === "string" ? text : input).trim();
    if (!q || loading) return;

    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          reply: data.reply || "I couldn't process that request.",
          results: Array.isArray(data.results) ? data.results : [],
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
          intent: data.intent,
          entities: data.entities,
        },
      ]);
    } catch {
      setError("Chat API not reachable. Run: node chat-server.js in ai-task folder.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col bg-secondary-100 dark:bg-secondary-900">
      <div className="max-w-3xl mx-auto w-full h-full min-h-0 flex flex-col px-4 py-3 sm:px-6 sm:py-4">

        <div className="flex items-center gap-3 pb-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-md">
            <FiMessageCircle className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold dark:text-white leading-tight">Property Assistant</h1>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              Search listings by city, price & bedrooms
            </p>
          </div>
        </div>

        <div
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-sm p-4 space-y-4"
        >
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-primary-600 text-white text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-[92%] space-y-3">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100 text-sm leading-relaxed">
                      {msg.reply}
                    </div>

                    {msg.results && msg.results.length > 0 && (
                      <div className="space-y-2 pl-1">
                        {msg.results.map((r) => (
                          <PropertyCard key={r.id} item={r} />
                        ))}
                      </div>
                    )}

                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => send(s)}
                            className="text-xs px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-secondary-100 dark:bg-secondary-700">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-secondary-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2 shrink-0">{error}</p>
        )}

        <div className="shrink-0 mt-3 flex gap-2 bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 p-2 shadow-sm">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about apartments..."
            disabled={loading}
            className="flex-grow bg-transparent dark:text-white px-3 py-2 text-sm focus:outline-none placeholder:text-secondary-400"
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="btn px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={16} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
