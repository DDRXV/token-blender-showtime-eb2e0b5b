
import React from 'react';
import { BlenderIcon } from './BlenderIcon';
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
        <BlenderIcon isActive={isProcessing} />
        <p className="text-center text-xs text-dyyota-blue animate-pulse mt-3 font-medium">
          Tokenizing with {getModelDisplayName(model)} model...
        </p>
      </div>
    </div>
  );
};
