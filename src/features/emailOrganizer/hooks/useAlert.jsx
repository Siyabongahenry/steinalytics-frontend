import { useState } from "react";

export function useAlert() {
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("success");

  const show = (message, t = "success") => {
    setMsg(message);
    setType(t);
    setTimeout(() => setMsg(null), 3000);
  };

  const Alert = () =>
    msg ? (
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className={`flex items-center justify-between px-4 py-3 rounded shadow-lg text-sm font-medium
            ${
              type === "success"
                ? "bg-green-600 text-white"
                : type === "error"
                ? "bg-red-600 text-white"
                : type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-blue-600 text-white"
            }`}
          role="alert"
        >
          <span>{msg}</span>
          <button
            type="button"
            className="ml-3 text-white hover:text-gray-200 focus:outline-none"
            onClick={() => setMsg(null)}
          >
            ✕
          </button>
        </div>
      </div>
    ) : null;

  return { show, Alert };
}
