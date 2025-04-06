
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className={`${color} text-white px-3 py-1.5 rounded-md text-sm font-mono animate-token-fall cursor-pointer transition-all duration-200 hover:shadow-md hover:brightness-110`} 
          style={{ 
            animationDelay: `${index * 0.1}s`,
            opacity: 0 // Start invisible, animation will make it visible
          }}
        >
          <span className="font-medium">{displayToken}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${color}`}></div>
            <span className="font-bold">Token #{index + 1}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            <span className="text-muted-foreground">Display:</span>
            <span className="font-mono font-medium">{displayToken}</span>
            
            <span className="text-muted-foreground">Raw:</span>
            <span className="font-mono font-medium">{token === " " ? "space" : token}</span>
            
            <span className="text-muted-foreground">Token ID:</span>
            <span className="font-mono font-medium">{tokenId}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
