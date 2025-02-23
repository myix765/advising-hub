'use client';

import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

export default function TypingAnimation({ text, onComplete, className = '' }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 15 + 10); // Random delay between 10-25ms for faster typing

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      const completeTimeout = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className={`${className} relative`}>
      {displayText}
      <span className="ml-0.5 inline-block w-0.5 h-4 bg-blue-500 animate-blink"></span>
    </div>
  );
}
