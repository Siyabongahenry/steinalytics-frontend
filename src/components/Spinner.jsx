// src/components/Spinner.jsx
export default function Spinner({ showLogo = true }) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Neon halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 blur-xl opacity-70 animate-pulse"></div>

      {/* Gradient spinner ring */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"></div>

      {/* Logo centered inside spinner */}
      {showLogo && (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow">
          <span className="text-white font-extrabold text-xl">S</span>
        </div>
      )}

      <style jsx>{`
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.6),
                        0 0 30px rgba(139, 92, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.9),
                        0 0 45px rgba(139, 92, 246, 0.8);
          }
        }
        .animate-spin {
          border-top: 4px solid transparent;
          border-image: linear-gradient(to right, #3b82f6, #8b5cf6) 1;
        }
      `}</style>
    </div>
  );
}
