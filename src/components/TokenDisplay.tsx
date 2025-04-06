
import React from 'react';

interface TokenDisplayProps {
  token: string;
  color: string;
  index: number;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ token, color, index }) => {
  // Replace spaces with visible space character and handle special tokens
  const displayToken = token.replace(/ /g, '␣');
  
  return (
    <div 
      className={`${color} text-white px-2 py-1 rounded text-sm font-mono animate-token-fall`} 
      style={{ 
        animationDelay: `${index * 0.1}s`,
        opacity: 0 // Start invisible, animation will make it visible
      }}
    >
      {displayToken}
    </div>
  );
};
