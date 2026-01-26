import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <div className={`fixed top-6 right-6 z-50 p-4 rounded-md shadow-lg ${bgColor} text-white`}>
      {message}
    </div>
  );
}
