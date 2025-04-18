
import React, { useEffect, useState } from 'react';
import { TokenizationModel } from '../utils/types';

interface TokenizerAnimationProps {
  isProcessing: boolean;
  model: TokenizationModel;
}

export const TokenizerAnimation: React.FC<TokenizerAnimationProps> = ({ isProcessing, model }) => {
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
        <div className={`w-36 sm:w-48 h-36 sm:h-48 relative`}>
          {/* Container with fixed position */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Rotating blender image */}
            <img 
              src="/lovable-uploads/2e16f214-436e-41e3-8694-1cecd499fe1a.png"
              alt="Blender" 
              className={`w-full h-full object-contain ${isProcessing ? 'animate-rotate-shake' : ''}`}
            />
          </div>
          
          {/* Animated particles when processing */}
          {isProcessing && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Flying text particles */}
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 animate-bounce opacity-80"></div>
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 animate-ping opacity-80"></div>
              <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-pink-400 animate-ping opacity-80"></div>
              <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-yellow-300 animate-bounce opacity-80"></div>
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

export default TokenizerAnimation;
