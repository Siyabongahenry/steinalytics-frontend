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
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          className={`toast align-items-center text-bg-${type} border-0 show shadow`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{msg}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setMsg(null)}
            ></button>
          </div>
        </div>
      </div>
    ) : null;

  return { show, Alert };
}