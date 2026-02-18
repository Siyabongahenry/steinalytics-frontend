import { useState, useEffect } from "react";

function TypingEffect({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // reset when text changes
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="text-gray-300 whitespace-pre-line">
      {displayedText}
      <span className="animate-pulse">▌</span> {/* blinking cursor */}
    </p>
  );
}

export default TypingEffect;
