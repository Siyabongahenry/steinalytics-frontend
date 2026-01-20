// src/components/Spinner.jsx
export default function Spinner({ showLogo = true, logoText = "S", size = 100 }) {
  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: size, height: size }}
    >
      {/* Outer half ring rotating clockwise */}
      <svg
        className="absolute inset-0 animate-spin-clockwise"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 30a20 20 0 0 1 40 0"  // top half arc
          stroke="#3b82f6"             // constant blue
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Inner half ring rotating counter-clockwise */}
      <svg
        className="absolute inset-0 animate-spin-counter"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 30a20 20 0 0 1 -40 0" // bottom half arc
          stroke="#8b5cf6"             // constant purple
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Logo inside */}
      {showLogo && (
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white font-extrabold text-lg">{logoText}</span>
        </div>
      )}

      <style jsx>{`
        .animate-spin-clockwise {
          animation: spinCW 2s linear infinite;
        }
        .animate-spin-counter {
          animation: spinCCW 2s linear infinite;
        }
        @keyframes spinCW {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spinCCW {
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
