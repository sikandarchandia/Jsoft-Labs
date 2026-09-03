import { useState } from "react";
import { FiSend, FiSearch, FiRefreshCcw } from "react-icons/fi";

const API = "http://localhost:4003/chat";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const quickPrompts = [
    "Show me apartments under $1200 in New York",
    "Find 2 bedrooms in San Francisco under $1800",
    "Apartments in Austin under $1000",
  ];

  const send = async (text) => {
    const q = typeof text === "string" ? text : message;
    if (!q.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setReply(data.reply || "No reply");
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (e) {
      setError("Chat API not reachable. Start chat-server.js first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-100 dark:border-secondary-700 p-6 mb-6 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Chatbot</h1>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-1">
                Ask for property listings using simple filters (city, price, bedrooms).
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMessage(quickPrompts[0]);
                  setReply("");
                  setResults([]);
                }}
                className="btn-secondary"
              >
                <FiRefreshCcw size={14} className="mr-2" />
                Sample
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setMessage(p);
                  setReply("");
                  setResults([]);
                }}
                className="text-left px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white text-sm hover:border-primary-300 dark:hover:border-primary-400 transition-colors"
              >
                <FiSearch className="inline mr-2" size={14} />
                {p}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='e.g. "Show me apartments under $1200 in New York"'
                className="flex-grow border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className={`btn flex items-center gap-2 ${loading ? "opacity-60 cursor-wait" : ""}`}
              >
                <FiSend size={16} />
                {loading ? "Sending..." : "Send"}
              </button>
            </div>

            {error && (
              <div className="mt-3 text-sm text-red-500">{error}</div>
            )}
          </div>
        </div>

        {reply && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-100 dark:border-secondary-700 p-5 mb-6 transition-colors duration-300">
            <h2 className="text-lg font-semibold dark:text-white mb-2">Reply</h2>
            <p className="text-secondary-700 dark:text-secondary-200 text-sm leading-relaxed">
              {reply}
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-100 dark:border-secondary-700 p-5 transition-colors duration-300">
          <h2 className="text-lg font-semibold dark:text-white mb-3">Results</h2>
          {results.length === 0 ? (
            <p className="text-secondary-500 dark:text-secondary-400 text-sm">
              No results yet. Try one of the sample prompts above.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-lg border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold dark:text-white">
                        Property #{r.id}
                      </div>
                      <div className="text-sm text-secondary-600 dark:text-secondary-300 mt-1">
                        {r.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-secondary-500 dark:text-secondary-400">
                        Price
                      </div>
                      <div className="font-semibold dark:text-white">
                        ${r.price}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-secondary-600 dark:text-secondary-300">
                    Bedrooms: {r.bedrooms}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;

