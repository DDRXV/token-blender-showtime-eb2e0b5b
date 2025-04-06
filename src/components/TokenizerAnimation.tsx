
import React, { useEffect, useState } from 'react';
import { TokenizationModel } from '../utils/types';

interface TokenizerAnimationProps {
  isProcessing: boolean;
  model: TokenizationModel;
}

export const TokenizerAnimation: React.FC<TokenizerAnimationProps> = ({ isProcessing, model }) => {
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  
  useEffect(() => {
    // Set up blinking animation when processing
    if (isProcessing) {
      const blinkInterval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 2500); // Blink every 2.5 seconds
      
      return () => clearInterval(blinkInterval);
    }
  }, [isProcessing]);
  
  const getModelDisplayName = (model: TokenizationModel) => {
    switch (model) {
      case 'chatgpt': return 'ChatGPT';
      case 'llama': return 'Llama';
      default: return model;
    }
  };

  return (
    <div className={`transition-all duration-500 flex flex-col items-center justify-center ${isProcessing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="relative">
        <div className={`${isProcessing ? 'animate-bounce-gentle' : ''} w-48 h-48 relative`}>
          {/* Main blender image */}
          <img 
            src="/lovable-uploads/c1912f96-dfdc-4160-9616-f3eb4a924bfa.png"
            alt="Blender" 
            className="w-full h-full object-contain"
          />
          
          {/* Animated eyes for blinking effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Left eye - visible when NOT blinking */}
            <div 
              className={`absolute left-[31%] top-[32%] w-[12%] h-[12%] rounded-full bg-[#222437] transition-opacity duration-100 ${isBlinking ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="absolute left-[15%] top-[15%] w-[25%] h-[25%] rounded-full bg-white"></div>
            </div>
            
            {/* Right eye - visible when NOT blinking */}
            <div 
              className={`absolute right-[31%] top-[32%] w-[12%] h-[12%] rounded-full bg-[#222437] transition-opacity duration-100 ${isBlinking ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="absolute left-[15%] top-[15%] w-[25%] h-[25%] rounded-full bg-white"></div>
            </div>
            
            {/* Left eye - closed/blinking state */}
            <div 
              className={`absolute left-[31%] top-[38%] w-[12%] h-[1%] rounded-full bg-[#222437] transition-opacity duration-100 ${isBlinking ? 'opacity-100' : 'opacity-0'}`}
            ></div>
            
            {/* Right eye - closed/blinking state */}
            <div 
              className={`absolute right-[31%] top-[38%] w-[12%] h-[1%] rounded-full bg-[#222437] transition-opacity duration-100 ${isBlinking ? 'opacity-100' : 'opacity-0'}`}
            ></div>
          </div>
          
          {/* Add animated particles when processing */}
          {isProcessing && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Flying text particles */}
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 animate-bounce opacity-80"></div>
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 animate-ping opacity-80"></div>
              <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-pink-400 animate-ping opacity-80"></div>
              <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-yellow-300 animate-bounce opacity-80"></div>
              
              {/* Text fragments */}
              <div className="absolute top-1/3 right-1/4 text-[8px] text-blue-500 font-bold animate-pulse">T</div>
              <div className="absolute top-2/3 left-1/3 text-[8px] text-purple-500 font-bold animate-pulse">k</div>
              <div className="absolute top-1/2 right-1/3 text-[8px] text-pink-500 font-bold animate-pulse">n</div>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-dyyota-blue animate-pulse mt-3 font-medium">
          Tokenizing with {getModelDisplayName(model)} model...
        </p>
      </div>
    </div>
  );
};
