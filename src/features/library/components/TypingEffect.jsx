import { useState, useEffect } from "react";

function TypingEffect({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // reset when text changes

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++; // increment AFTER appending
      } else {
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
