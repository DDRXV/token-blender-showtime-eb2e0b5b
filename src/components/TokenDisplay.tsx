
import React from 'react';

interface TokenDisplayProps {
  token: string;
  tokenId: number;
  color: string;
  index: number;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ token, tokenId, color, index }) => {
  // Replace spaces with visible space character and handle special tokens
  const displayToken = token.replace(/ /g, '␣');
  
  return (
    <div 
      className={`${color} text-white px-2 py-1 rounded text-sm font-mono animate-token-fall relative group`} 
      style={{ 
        animationDelay: `${index * 0.1}s`,
        opacity: 0 // Start invisible, animation will make it visible
      }}
    >
      <span className="font-medium">{displayToken}</span>
      <span className="text-xs opacity-75 ml-1">#{tokenId}</span>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
        Token ID: {tokenId}
      </div>
    </div>
  );
};
