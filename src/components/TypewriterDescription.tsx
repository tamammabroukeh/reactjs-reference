import { useEffect, useState } from "react";

export default function TypewriterDescription({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Adjust speed here (milliseconds per character)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <p className="w-[70%] text-center">
      {displayedText}
      <span className="animate-pulse">|</span> {/* Cursor effect */}
    </p>
  );
}
